import Dexie from "dexie";
import slugify from "slugify";
import initialNote from "./initialNote";

export interface userNoteFields {
  title: string;
  tags: string[];
  md: string;
}

export interface AutoNoteFields {
  modified: number;
  slug: string;
  id?: number;
}

const LIMIT_SIZE = 100;

export interface Note extends userNoteFields, AutoNoteFields {}

export interface unSaveNoteField
  extends userNoteFields,
    Partial<AutoNoteFields> {}

export class NoteDB extends Dexie {
  notes: Dexie.Table<Note, Number>;
  constructor() {
    super("NoteDB");
    this.version(1).stores({
      notes: "++id, &title, *tags, modified, &slug",
    });

    this.notes = this.table("notes");
    this.on("populate", () => {
      return this.notes.bulkAdd(initialNote);
    });
  }

  async get(slug: string) {
    return this.notes.get({ slug });
  }

  async create(note: userNoteFields) {
    const id = await this.notes.add({
      ...(await this.validate(note)),
      slug: slugify(note.title, { lower: true }),
      modified: Date.now(),
      tags: note.tags.filter((t) => Boolean(t)),
    });

    return (await this.notes.get(id)) as Note;
  }

  async list(start: number = 0) {
    return this.notes
      .orderBy("modified")
      .reverse()
      .offset(start)
      .limit(LIMIT_SIZE)
      .toArray();
  }

  async listWithFilter(filter: string, start: number = 0) {
    return this.notes
      .where("title")
      .startsWithAnyOfIgnoreCase(filter)
      .or("tags")
      .startsWithAnyOfIgnoreCase(filter)
      .offset(start)
      .limit(LIMIT_SIZE)
      .toArray();
  }

  async update(noteId: number, note: userNoteFields) {
    if (!noteId) {
      throw new Error("Invalid note Id");
    }
    await this.notes.update(noteId, {
      ...(await this.validate(note)),
      slug: slugify(note.title, { lower: true }),
      modified: Date.now(),
      tags: note.tags.filter((t) => Boolean(t)),
    });

    return (await this.notes.get(noteId)) as Note;
  }

  async remove(noteId: number) {
    return this.notes.delete(noteId);
  }

  async validate(note: userNoteFields) {
    if (!note.title) {
      throw new Error("note title is required");
    }

    return note;
  }
}

export const db = new NoteDB();

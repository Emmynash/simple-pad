import React, {
  useEffect,
  useCallback,
  useContext,
  createContext,
  useState,
} from "react";
import { useHistory } from "react-router";
import { db, userNoteFields, Note } from "db";

export interface NoteContextType {
  notes: Note[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  onFilterChange: React.ChangeEventHandler<HTMLInputElement>;
  getNote(slug: string): Promise<Note | undefined>;
  createNote(values: userNoteFields): Promise<Note>;
  updateNote(noteId: number, values: userNoteFields): Promise<Note>;
  deleteNote(noteId: number): Promise<void>;
}

export const NoteContext = createContext<NoteContextType | undefined>(
  undefined
);

export const ProvideNoteContext: React.FC = ({ children }) => {
  const history = useHistory();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState("");

  const getNote = useCallback(async (slug: string) => {
    return await db.get(slug);
  }, []);

  const createNote = useCallback(async (values) => {
    const res = await db.create(values);
    setNotes((prev) => [...prev, res]);
    return res;
  }, []);

  const updateNote = useCallback(async (noteId, values) => {
    const res = await db.update(noteId, values);
    setNotes((prev) => prev.map((note) => (note.id === res.id ? res : note)));
    return res;
  }, []);

  const deleteNote = useCallback(
    async (noteId) => {
      await db.remove(noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
      history.push("/");
    },
    [history]
  );

  const onFilterChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(async (e) => {
      setFilter(e.currentTarget.value);
    }, []);

  useEffect(() => {
    const refreshNotes = async () => {
      if (filter) {
        const notes = await db.listWithFilter(filter);
        setNotes(notes);
      } else {
        const notes = await db.list();
        setNotes(notes);
      }
    };
    refreshNotes();
  }, [filter]);

  const ctx = {
    notes,
    filter,
    setFilter,
    getNote,
    updateNote,
    deleteNote,
    createNote,
    onFilterChange,
  };

  return <NoteContext.Provider value={ctx}>{children}</NoteContext.Provider>
};

export const useNoteContext = () => {
  const ctx = useContext(NoteContext);
  if (ctx === undefined) {
    throw new Error("Note context must be use within ProvideNoteContext");
  }
  return ctx;
};

import { useEffect, useCallback, useState } from "react";
import { Note } from "db";
import { useNoteContext } from "hooks";

interface NoteState {
  note: Note | null,
  loading: boolean
}
 
export const UseNote = (slug: string | undefined) => {
  const { getNote } = useNoteContext();
  const [setNote, setNoteState] = useState<NoteState>({
    note: null,
    loading: true
  })

  const refreshNotes = useCallback(async (slug: string | undefined) => {
    setNoteState({
      note: null,
      loading: Boolean(slug)
    })
    if (!slug) {
      return;
    }
    const note = await getNote(slug)
    setNoteState({
      note: note ?? null,
      loading: false
    })
  }, [getNote])

  useEffect(() => {
    refreshNotes(slug)
  }, [refreshNotes, slug])

  const { note, loading } = setNote;

  return {
    noteId: note?.id,
    note,
    loading
  }
}

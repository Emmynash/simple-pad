import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNoteContext, UseNote } from "hooks";
import { unSaveNoteField, userNoteFields } from "db";

type Errors = {
  [K in keyof userNoteFields]?: string;
};

type withTimeStamp<T extends {}> = T & {
  modified: number;
}

const newNote: userNoteFields = {
  title: '',
  md: '',
  tags: []
}

export const useNoteForm = (slug: string | undefined) => {
  const { deleteNote, createNote, updateNote } = useNoteContext()
  const { note } = UseNote(slug)
  const [values, setValues] = useState<withTimeStamp<userNoteFields>>({
    ...newNote,
    modified: 0
  })
  const [savedValue, setSavedValue] = useState<withTimeStamp<unSaveNoteField>>({
    ...newNote,
    modified: 0
  })
  const [error, setError] = useState<Errors>({})
  const shouldUpdate = useRef(false)
  const noteId = savedValue?.id;

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    e.persist();
    setValues((prev) => ({
      ...prev,
      modified: Date.now(),
      [e.target.name]:
        e.target.value === 'tags'
          ? e.target.value.split(' ') : e.target.value
    }))
  }, [])

  const onBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      if (e.target.value === 'title' && !noteId) {
        setError({});
        try {
          const res = await createNote(values);
          setSavedValue({ ...res, modified: Date.now() })
        } catch (e) {
          setError({
            title: e.title === 'ConstraintError'
              ? "Title must be unique"
              : e.message || 'Something went wrong while creating this note'
          })
        }
      }
    },
    [createNote, noteId, values]
  )

  const onDelete = useCallback(() => {
    deleteNote(noteId!)
  }, [deleteNote, noteId])

  useEffect(() => {
    if (!noteId) {
      return
    }
    if (!shouldUpdate.current) {
      shouldUpdate.current = true
      return
    }

    const handleUpdate = async () => {
      setError({});
      try {
        const res = await updateNote(noteId, values);
        setSavedValue({ ...res, modified: Date.now() });
      } catch (e) {
        const isConstraint = e.failure?.some(
          (f: any) => f.name === 'ConstraintError'
        )
        setError({
          title: isConstraint ? "Title must be unique"
            : e.message || 'Something went wrong while creating this note'
        })
      }
    }

    const timeOut = setTimeout(handleUpdate, 200);
    return () => clearTimeout(timeOut);
  }, [noteId, updateNote, values])

  useEffect(() => {
    setValues({
      title: note?.title ?? '',
      md: note?.md ?? '',
      tags: note?.tags ?? [],
      modified: 0
    })
    setError({});
    setSavedValue({ ...(note ?? newNote), modified: 0 })
  }, [note]
  )
  let saved;
  const { modified: changedMode } = values;
  const { modified: savedMode } = savedValue;
  if (savedValue.id || changedMode !== 0)
    saved = Boolean(changedMode === 0 || savedMode >= changedMode)

  return {
    onChange,
    onBlur,
    onDelete,
    saved,
    savedValue,
    values,
    error
  }
}
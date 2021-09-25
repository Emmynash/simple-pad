import React from 'react';
import { render, mocked, fakeNote } from "test.utils";
import { Home } from "pages";
import { UseNote } from "hooks";

jest.mock('hooks/UseNote');
const mockUseNote = mocked(UseNote);

describe("Home page", () => {
  it("should render welcome note if it exist", () => {
    mockUseNote.mockReturnValue({
      loading: false,
      note: fakeNote,
      noteId: fakeNote.id
    })

    const { queryByText, getByText } = render(<Home />)
    expect(getByText(fakeNote.title)).toBeInTheDocument();
    expect(mockUseNote).toHaveBeenCalled();
    expect(mockUseNote.mock.calls[0][0]).toEqual('welcome')
    expect(queryByText(/select a note/)).not.toBeInTheDocument();
  })

  it("should render select note if welcome note does not exist", () => {
    mockUseNote.mockReturnValue({ note: null, loading: false, noteId: undefined })
    const { queryByText } = render(<Home />)

    expect(queryByText(/select a note/)).toBeInTheDocument();
  })

})
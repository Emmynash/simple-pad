import React from 'react';
import { NoteForm } from "components";
import { render, fireEvent, waitFor } from "test.utils";

describe("NoteForm component", () => {
  const onChangeMock = jest.fn()
  const onBlurMock = jest.fn();
  const onDeleteMock = jest.fn();

  const defaultProps = {
    values: {
      title: "",
      md: "",
      tags: []
    },
    onChange: onChangeMock,
    onDelete: onDeleteMock,
    onBlur: onBlurMock,
    errors: ""

  }

  afterEach(() => {
    onChangeMock.mockReset();
    onBlurMock.mockReset();
    onDeleteMock.mockReset();
  })

  it("should include delete button if specified", () => {
    const props = {
      ...defaultProps,
      showDelete: true
    }
    const { queryByText } = render(<NoteForm {...props} />)
    expect(queryByText("Delete")).toBeInTheDocument();
  })

  it("should not include delete button if not specified", () => {
    const props = {
      ...defaultProps,
      showDelete: false
    }
    const { queryByText } = render(<NoteForm {...props} />)
    expect(queryByText("Delete")).not.toBeInTheDocument();
  })
  it("should call onchange handler every field", async () => {
    const props = {
      ...defaultProps,
      values: {
        title: "test title",
        md: "testTitle",
        tags: ['blue', 'black']
      }
    }

    const { getByLabelText } = render(<NoteForm {...props} />)
    expect(getByLabelText('Title')).toHaveValue('test title');
    expect(getByLabelText("Note")).toHaveValue('testTitle');
    expect(getByLabelText("Tags")).toHaveValue('blue black');

    ['Title', 'Note', 'Tags'].forEach((label) => {
      const inp = getByLabelText(label)
      fireEvent.change(inp, {
        target: { value: "testValues" }
      })
    });

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
    })
  })

  it("should call blur on every filed", async () => {
    const { getByLabelText } = render(<NoteForm {...defaultProps} />);

    ['Title', 'Note', 'Tags'].forEach((label) => {
      const inp = getByLabelText(label)
      fireEvent.blur(inp)
    });

    await waitFor(() => {
      expect(onBlurMock).toHaveBeenCalledTimes(3);
    })
  })
})
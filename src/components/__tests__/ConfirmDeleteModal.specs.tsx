import React from 'react';
import { render, waitFor, fireEvent } from "test.utils";
import { ConfirmDeleteModal } from "components";

describe("confirm delete modal", () => {
  const confirmMock = jest.fn();
  const closeMock = jest.fn();

  const defaultProps = {
    title: "test confirm delete",
    open: true,
    onClose: closeMock,
    onConfirm: confirmMock,
  };

  afterEach(() => {
    closeMock.mockReset();
    confirmMock.mockReset();
  })

  it("should calls onClose on cancel click", async () => {
    const { getByText } = render(<ConfirmDeleteModal {...defaultProps} />);
    fireEvent.click(getByText('Cancel'));
    await waitFor(() => {
      expect(closeMock).toHaveBeenCalled();
    })
  });

  it("should calls onConfirm on delete click", async () => {
    const { getByText } = render(<ConfirmDeleteModal {...defaultProps} />);
    fireEvent.click(getByText('Delete'));
    await waitFor(() => {
      expect(confirmMock).toHaveBeenCalled();
    })
  });

  it("should include title if passed", () => {
    const props = {
      ...defaultProps,
      title: "test title"
    }
    const { getByText } = render(<ConfirmDeleteModal {...props} />);
    expect(getByText("test title")).toBeInTheDocument();
  });

  it("should include body if passed", () => {
    const props = {
      ...defaultProps,
      body: "test body"
    }
    const { getByText } = render(<ConfirmDeleteModal {...props} />);
    expect(getByText("test body")).toBeInTheDocument();
  });
})
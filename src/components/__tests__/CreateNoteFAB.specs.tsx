import React from 'react';
import { useMediaQuery } from "@material-ui/core";
import { CreateNoteFAB } from "components";
import { mocked, render } from 'test.utils';

jest.mock('@material-ui/core/useMediaQuery');
const mockedMediaQuery = mocked(useMediaQuery);

afterAll(() => {
  jest.resetAllMocks();
})

describe.only("CreateNoteFAB Component", () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<CreateNoteFAB />);
    expect(asFragment()).toMatchSnapshot();
  })
  it('should collapse on small screen', () => {
    mockedMediaQuery.mockReturnValue(true);
    const { queryByText } = render(<CreateNoteFAB />);
    expect(mockedMediaQuery).toHaveBeenCalled();
    expect(queryByText("New Note")).not.toBeInTheDocument()
  })
  it('should expand on large screen', () => {
    mockedMediaQuery.mockReturnValue(false);
    const { queryByText } = render(<CreateNoteFAB />)
    expect(mockedMediaQuery).toHaveBeenCalled();
    expect(queryByText("New Note")).toBeInTheDocument()
  })
})
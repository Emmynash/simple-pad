import React from 'react';
import { render, } from "test.utils";
import { MainPanel } from "components";

describe("MainPanel Component", () => {
  it("should include custom class names", () => {
    const { getByText } = render(
      <MainPanel className="test className">test</MainPanel>
    )
    expect(getByText('test')).toHaveClass('test className');
  })
})
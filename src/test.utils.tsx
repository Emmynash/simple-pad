import 'fake-indexeddb/auto';
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import {
  NoteContext,
  ProvideNoteContext,
  ProvideSideBarContext,
  SideBarContext,
  ThemeContext,
  ProvideThemeContext,
  NoteContextType,
  IThemeContext,
  ISideBarContext
} from "hooks";
import { Note } from "db";
import { MemoryRouter } from "react-router-dom";
import { RenderOptions, render } from "@testing-library/react";
import moment from 'moment';


moment.now = () => {
  return 10000000000;
}
const emptyNoteCtx: NoteContextType = {
  deleteNote: jest.fn(),
  updateNote: jest.fn(),
  createNote: jest.fn(),
  getNote: jest.fn(),
  onFilterChange: jest.fn(),
  setFilter: jest.fn(),
  notes: [],
  filter: ""
}

interface CustomRenderOptions extends RenderOptions {
  sideCtx?: Partial<ISideBarContext>,
  themeCtx?: Partial<IThemeContext>,
  noteCtx?: Partial<NoteContextType>
}

const emptySideBarCtx: ISideBarContext = {
  expanded: true,
  setExpanded: jest.fn(),
  toggleExpanded: jest.fn()
}

export const emptyThemeCtx: IThemeContext = {
  paletteType: 'light',
  togglePalette: jest.fn()
}

const RenderFakeContext = (ui: any, options: CustomRenderOptions = {}) => {
  const { sideCtx, themeCtx, noteCtx, ...rest } = options;

  const Wrapper: React.FC = ({ children }) => (
    <MemoryRouter>
      <NoteContext.Provider
        value={{
          ...noteCtx,
          ...emptyNoteCtx
        }}
      >
        <ThemeContext.Provider
          value={{
            ...themeCtx,
            ...emptyThemeCtx
          }}
        >
          <SideBarContext.Provider
            value={{
              ...sideCtx,
              ...emptySideBarCtx
            }}
          >
            {children}
          </SideBarContext.Provider>
        </ThemeContext.Provider>
      </NoteContext.Provider>
    </MemoryRouter>
  )
  return render(ui, { wrapper: Wrapper, ...rest })
}

export const RenderRealContext = (ui: any, options: RenderOptions = {}) => {
  const Wrapper: React.FC = ({ children }) => (
    <MemoryRouter>
      <ProvideNoteContext>
        <ProvideThemeContext>
          <ProvideSideBarContext>{children}</ProvideSideBarContext>
        </ProvideThemeContext>
      </ProvideNoteContext>
    </MemoryRouter>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from "@testing-library/react";
export { mocked } from "ts-jest/utils";
export { RenderFakeContext as Render };

export const fakeNotes: Note[] = [
  {
    id: 1,
    modified: 1000000000 - 5000,
    md: '# test note 1',
    title: 'test one',
    slug: 'test-one',
    tags: []
  },
  {
    id: 2,
    modified: 1000000000 - 1000 * 60 * 60 * 2,
    md: "# test note 2",
    title: "test two",
    slug: "test-two",
    tags: ["python"],
  },
  {
    id: 3,
    modified: 2000000 - 1000 * 60 * 60 * 24 * 10,
    md: "# test note 3",
    title: "test three",
    slug: "test-three",
    tags: ["test", "three"],
  },
]

export const fakeNote = fakeNotes[1];
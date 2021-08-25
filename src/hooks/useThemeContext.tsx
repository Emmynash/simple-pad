import React, {
  useCallback,
  useMemo,
  useContext,
  useState,
  createContext
} from 'react';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/core/styles";

type PaletteType = 'light' | 'dark';

export interface IThemeContext {
  paletteType: PaletteType,
  togglePalette(): void
}

export const ThemeContext = createContext<IThemeContext | undefined>(
  undefined
);

let palettePreference = localStorage.getItem('paletteType') as PaletteType;
if (!palettePreference || !['light', 'dark'].includes(palettePreference)) {
  palettePreference = 'dark'
}

export const ProvideThemeContext: React.FC = ({ children }) => {
  const [paletteType, setPaletteType] = useState<PaletteType>(palettePreference);
  const togglePalette = useCallback(() => {
    setPaletteType((prevType) => {
      const newType = prevType === 'dark' ? 'light' : 'dark';
      localStorage.setItem('paletteType', newType);
      return newType;
    })
  }, [setPaletteType])

  const theme = useMemo(() =>
    createTheme({
      palette: {
        type: paletteType
      }
    }),
    [paletteType]
  )

  const ctx: IThemeContext = {
    paletteType,
    togglePalette
  }

  return (
    <ThemeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("theme context must be wrapped within ProvideThemeContext");
  }
  return ctx;
}
import React, { useCallback, useEffect, useContext, useState, createContext } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useLocation } from "react-router-dom";

export interface ISideBarContext {
  expanded: Boolean,
  toggleExpanded(): void,
  setExpanded(expanded: Boolean): void
}

export const SideBarContext = createContext<ISideBarContext | undefined>(undefined)

export const ProvideSideBarContext: React.FC = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const expandDefault =
      isLarge &&
      !(
        location.pathname.endsWith('create') ||
        location.pathname.endsWith('edit')
      )
    setExpanded(expandDefault);
  }, [isLarge, location.pathname])

  const toggleExpanded = useCallback(() => {
    setExpanded((expanded) => !expanded)
  }, [setExpanded]);

  const ctx: ISideBarContext = {
    expanded,
    toggleExpanded,
    // @ts-ignore
    setExpanded
  }

  return (
    <SideBarContext.Provider value={ctx}>{children}</SideBarContext.Provider>
  )
}

export const useSideBarContext = () => {
  const ctx = useContext(SideBarContext)
  if (ctx === undefined) {
    throw new Error("SideBarContext must wrapped within ProvideSideBarContext");
  }
  return ctx;
}
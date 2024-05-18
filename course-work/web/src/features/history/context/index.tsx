"use client";

import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

import { HISTORY_LIFE } from "../config";

import { initialState } from "./data";
import { History, InitialState } from "./interfaces";

export const ErrorContext = createContext<InitialState>(initialState);

export const useHistoryContext = () => useContext(ErrorContext);

export const HistoryContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [history, setHistory] = useState<History[]>([]);

  const addHistory = useCallback((history: History) => {
    setHistory((prevState) => [...prevState, history]);
  }, []);

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setHistory((history) => history.slice(0, history.length - 1));
    }, HISTORY_LIFE * 2);

    return () => clearTimeout(cleanup);
  }, [history]);

  return (
    <ErrorContext.Provider
      value={{
        history,
        addHistory,
      }}>
      {children}
    </ErrorContext.Provider>
  );
};

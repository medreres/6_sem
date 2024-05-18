import { ReactNode } from "react";

export interface Action {
  label: string;
  action: () => any;
}

export interface History {
  message: string;
  severity: "error" | "warning" | "success" | "info";
  action?: Action;
}

export interface InitialState {
  history: History[];
  addHistory: (_error: History) => void;
}

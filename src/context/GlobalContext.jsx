import { createContext, useState } from "react";

export const Context = createContext();

export default function GlobalContext({ children }) {
  const [deleteThisState, setDeleteThisState] = useState("blalbal");

  return (
    <Context.Provider value={{ deleteThisState, setDeleteThisState }}>{children}</Context.Provider>
  );
}


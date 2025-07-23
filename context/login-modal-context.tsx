"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LoginModalContextType = {
  loginOpen: boolean;
  setLoginOpen: (open: boolean) => void;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
};


const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginOpen, setLoginOpenState] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/Dashboard"); // default fallback

  useEffect(() => {
    const stored = sessionStorage.getItem("loginOpen");
    if (stored === "true") setLoginOpenState(true);

    const storedRedirect = sessionStorage.getItem("redirectPath");
    if (storedRedirect) setRedirectPath(storedRedirect);
  }, []);

  const setLoginOpen = (open: boolean) => {
    setLoginOpenState(open);
    sessionStorage.setItem("loginOpen", open.toString());
  };

  const setPath = (path: string) => {
    setRedirectPath(path);
    sessionStorage.setItem("redirectPath", path);
  };

  return (
    <LoginModalContext.Provider
      value={{ loginOpen, setLoginOpen, redirectPath, setRedirectPath: setPath }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};


export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) throw new Error("useLoginModal must be used within LoginModalProvider");
  return context;
};

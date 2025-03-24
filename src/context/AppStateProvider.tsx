import { createContext, useContext, useState } from "react";

const AppContext = createContext({});

const AppContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [code, setCode] = useState("");
  const [isShareBtnLoading, setIsShareBtnLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        code,
        isShareBtnLoading,
        setCode,
        setIsShareBtnLoading,
        shareLink,
        setShareLink,
        showModal,
        setShowModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useAppContext(): any {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the AppContextProvider");
  }
  return context;
}

export { AppContextProvider, useAppContext };

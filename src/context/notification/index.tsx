import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ISnackbarState } from "../../common/types";
import SnackBar from "../../common/SnackBar";

const NotificationContext = createContext({
  showMessage: (msg: string, status: "Info" | "Error") => {},
});

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queue, setQueue] = useState<ISnackbarState[]>([]);
  const [current, setCurrent] = useState<ISnackbarState | null>(null);

  const showMessage = useCallback(
    (message: string, status: "Info" | "Error") => {
      setQueue((q) => [...q, { open: true, message, status }]);
    },
    []
  );

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((q) => q.slice(1));
    }
  }, [queue, current]);

  const handleClose = () => {
    setCurrent(null);
  };

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      {current && <SnackBar state={current} onClose={handleClose} />}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { logoutDesigner } from "./Apis/designer/DesignerApi";
import { logoutModel } from "./Apis/model/ModelApi";

interface AppContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
  logout: () => void;
  role: string | null;
  setRole: (role: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // 로그인 상태 복구
  useEffect(() => {
    const initializeAuth = () => {
      const storedUserId = localStorage.getItem("id");
      const storedRole = localStorage.getItem("role");

      if (storedUserId) {
        setUserId(storedUserId);
        setRole(storedRole);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  // 로그인 상태 변경 시 localStorage 업데이트
  useEffect(() => {
    if (isLoggedIn) {
      if (userId) {
        localStorage.setItem("id", userId);
      }
      if (role) {
        localStorage.setItem("role", role);
      }
    } else {
      localStorage.removeItem("id");
      localStorage.removeItem("role");
    }
  }, [isLoggedIn, userId, role]);

  // 세션 만료 및 자동 로그아웃
  useEffect(() => {
    const updateLastActiveTime = () => {
      localStorage.setItem("lastActiveTime", Date.now().toString());
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const lastActiveTime = localStorage.getItem("lastActiveTime");
        if (lastActiveTime) {
          const currentTime = Date.now();
          const timeDifference = currentTime - parseInt(lastActiveTime, 10);

          if (timeDifference > 60000) {
            logout();
          } else {
            updateLastActiveTime();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", updateLastActiveTime);
    window.addEventListener("blur", updateLastActiveTime);

    const intervalId = setInterval(updateLastActiveTime, 5000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", updateLastActiveTime);
      window.removeEventListener("blur", updateLastActiveTime);
      clearInterval(intervalId);
    };
  }, []);

  // 로그아웃 처리
  const logout = async () => {
    try {
      if (role === "DESIGNER") {
        setLoading(true);
        await logoutDesigner();
        setLoading(false);
        alert(`${userId}님 안녕히가세요🥺`);
      } else if (role === "MODEL") {
        setLoading(true);
        await logoutModel();
        setLoading(false);
        alert(`${userId}님 안녕히가세요🥺`);
      }
    } catch (error) {
      console.error("Failed to log out from the server:", error);
    } finally {
      setIsLoggedIn(false);
      setUserId(null);
      setRole(null);
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("lastActiveTime");
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        role,
        setRole,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

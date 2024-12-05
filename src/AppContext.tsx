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
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = sessionStorage.getItem("token");
      const storedUserId = sessionStorage.getItem("id");

      if (storedToken && storedUserId) {
        setAccessToken(storedToken);
        setUserId(storedUserId);
        setIsLoggedIn(true);
      }

      setLoading(false);
    };

    initializeAuth();

    // 세션 스토리지에 마지막 활성 시간 저장
    sessionStorage.setItem("lastActiveTime", Date.now().toString());

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const lastActiveTime = sessionStorage.getItem("lastActiveTime");
        if (lastActiveTime) {
          const currentTime = Date.now();
          const timeDifference = currentTime - parseInt(lastActiveTime, 10);

          // 1분(60000ms) 이상 비활성 상태였다면 로그아웃
          if (timeDifference > 60000) {
            logout();
          } else {
            // 1분 미만이면 lastActiveTime 업데이트
            sessionStorage.setItem("lastActiveTime", currentTime.toString());
          }
        }
      }
    };

    const updateLastActiveTime = () => {
      sessionStorage.setItem("lastActiveTime", Date.now().toString());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", updateLastActiveTime);
    window.addEventListener("blur", updateLastActiveTime);

    // 주기적으로 lastActiveTime 업데이트 (새로고침 시 로그인 유지를 위해)
    const intervalId = setInterval(updateLastActiveTime, 5000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", updateLastActiveTime);
      window.removeEventListener("blur", updateLastActiveTime);
      clearInterval(intervalId);
    };
  }, []);

  const logout = async () => {
    try {
      if (role === "DESIGNER") {
        // 디자이너 로그아웃 요청
        await logoutDesigner();
        console.log("안녕히 가세요🥺");
      } else if (role === "MODEL") {
        // 모델 로그아웃 요청
        await logoutModel();
        console.log("안녕히 가세요🥺");
      } else {
        console.warn("Role is not set or invalid. Skipping server logout.");
      }
    } catch (error) {
      console.error("Failed to log out from the server:", error);
    } finally {
      setIsLoggedIn(false);
      setUserId(null);
      setAccessToken(null);
      setRole(null);

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("grade");
      sessionStorage.removeItem("nationality");
      sessionStorage.removeItem("lastActiveTime");
    }
  };

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 세션 스토리지에 저장
    if (isLoggedIn) {
      if (accessToken) {
        sessionStorage.setItem("token", accessToken);
      }
      if (userId) {
        sessionStorage.setItem("id", userId);
      }
      if (role) {
        sessionStorage.setItem("role", role);
      }
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
    }
  }, [isLoggedIn, accessToken, userId]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        accessToken,
        setAccessToken,
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

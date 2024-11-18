import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 쿠키에서 accessToken 추출 함수
const getAccessTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
  return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
};

// Axios 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromCookies();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 로그인 함수
export const login = async (
  username: string,
  password: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // POST 요청 보내기
    const response: AxiosResponse = await api.post("/api/users/designer/login", {
      username,
      password,
    });

    // 서버에서 받은 쿠키를 처리 (테스트용 출력)
    if (response.headers["set-cookie"]) {
      console.log("Set-Cookie Header:", response.headers["set-cookie"]);
    }

     // 서버로부터 accessToken 추출
     const { accessToken } = response.data;

     if (accessToken) {
       // 인터셉터로 accessToken을 헤더에 추가
       api.interceptors.request.use(
         (config) => {
           config.headers["Authorization"] = `Bearer ${accessToken}`;
           return config;
         },
         (error) => Promise.reject(error)
       );
 
       console.log("Access Token 설정 완료:", accessToken);
     }
     
    console.log("Login Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Login failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};
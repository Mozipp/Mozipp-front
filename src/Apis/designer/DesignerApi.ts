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










// Designer 회원가입
export const signUpDesigner = async (
  name: string,
  gender: "MALE" | "FEMALE",
  username: string,
  password: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response: AxiosResponse = await api.post("/api/users/designer/sign-up", {
      name,
      gender,
      username,
      password,
    });
    console.log("Sign-Up Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Sign-Up failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Designer 기본 프로필 등록
export const registerDesignerProfile = async (
  petShopName: string,
  address: string,
  addressDetail: string,
  career: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response: AxiosResponse = await api.post("/api/users/designer/profile", {
      petShopName,
      address,
      addressDetail,
      career,
    });
    console.log("Profile Registration Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Profile Registration failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Designer 프로필 조회
export const getDesignerProfile = async (): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response: AxiosResponse = await api.get("/api/users/designer/profile");
    console.log("Profile Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Get Profile failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Designer 자격증 사진 등록
export const uploadDesignerLicenseImage = async (
  licenseImage: File
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append("licenseImage", licenseImage);

    const response: AxiosResponse = await api.post("/api/users/designer/profile/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("License Image Upload Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("License Image Upload failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Designer 상품 등록
export const addDesignerProduct = async (
  title: string,
  introduction: string,
  design: string,
  modelPreferDescription: string,
  preferBreed: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response: AxiosResponse = await api.post("/api/products/designer-product", {
      title,
      introduction,
      design,
      modelPreferDescription,
      preferBreed,
    });
    console.log("Product Registration Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Product Registration failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Designer 상품 페이지 목록 조회
export const getDesignerProducts = async (
  status?: "available" | "reserved" | "completed"
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const query = status ? `?status=${status}` : "";
    const response: AxiosResponse = await api.get(`/api/products/designer-product${query}`);
    console.log("Products Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Get Products failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

// Designer 리뷰 등록
export const addDesignerReview = async (
  designerProductId: number,
  reviewContent: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response: AxiosResponse = await api.post("/api/products/designer/review", {
      designerProductId,
      reviewContent,
    });
    console.log("Review Registration Response:", response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Review Registration failed:", error.response || error);
    return { success: false, error: error.response?.data?.message || error.message };
  }
};

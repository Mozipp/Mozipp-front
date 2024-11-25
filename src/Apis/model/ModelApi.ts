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

// 회원가입 API
export const registerModel = async (data: { name: string; gender: string; username: string; password: string }): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/api/users/model/sign-up", data);
      return response.data;
    } catch (error) {
      console.error("Error during model registration:", error);
      throw error;
    }
  };
  
  // 로그인 API
  export const loginModel = async (data: { username: string; password: string }): Promise<void> => {
    try {
      // 로그인 요청
      await api.post("/api/users/model/login", data, { withCredentials: true });
  
    } catch (error: any) {
      console.error("Error during model login:", error);
      throw new Error(error.response?.data?.message || "Failed to log in.");
    }
  };
  
  // 프로필 조회 API
  export const getModelProfile = async (): Promise<AxiosResponse> => {
    try {
      const response = await api.get("/api/users/model/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching model profile:", error);
      throw error;
    }
  };
  
  // 애완동물 프로필 조회 API
  export const getPetProfile = async (): Promise<AxiosResponse> => {
    try {
      const response = await api.get("/api/users/model/pet/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching pet profile:", error);
      throw error;
    }
  };
  
  // 애완동물 프로필 등록 API
  export const createPetProfile = async (data: { petName: string; petAge: number; petGender: string; breed: string }): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/api/users/model/pet/profile", data);
      return response.data;
    } catch (error) {
      console.error("Error creating pet profile:", error);
      throw error;
    }
  };
  
  // 애완동물 사진 등록 API
  export const uploadPetImage = async (file: File): Promise<AxiosResponse> => {
    try {
      const formData = new FormData();
      formData.append("petImage", file);
  
      const response = await api.post("/api/users/model/pet/petImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading pet image:", error);
      throw error;
    }
  };
  
  // 예약 요청 API
  export const createReservationRequest = async (data: { designerProductId: number; modelDescription: string; reservationRequestDate: string }): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/api/products/model/reservation-request", data);
      return response.data;
    } catch (error) {
      console.error("Error creating reservation request:", error);
      throw error;
    }
  };
  
  // 예약 요청 리스트 조회 API
  export const getReservationRequests = async (status?: string): Promise<AxiosResponse> => {
    try {
      const response = await api.get("/api/products/model/reservation-request", {
        params: { status }, // 예: pending, accepted, rejected
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reservation requests:", error);
      throw error;
    }
  };
  
  // 예약 확정 리스트 조회 API
  export const getConfirmedReservations = async (): Promise<AxiosResponse> => {
    try {
      const response = await api.get("/api/products/model/reservation");
      return response.data;
    } catch (error) {
      console.error("Error fetching confirmed reservations:", error);
      throw error;
    }
  };
  
  // 신고 등록 API
  export const createReport = async (data: { designerProductId: number; reportContent: string }): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/api/products/model/report", data);
      return response.data;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  };
  
  // 리뷰 등록 API
  export const createReview = async (data: { designerProductId: number; reviewContent: string }): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/api/products/model/review", data);
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  };
  
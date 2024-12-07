import axios, { AxiosInstance } from "axios";
import type { AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// 로그인 함수
export const loginDesigner = async (data: { username: string; password: string }): Promise<void> => {
  try {
    // 로그인 요청
    await api.post("/api/users/designer/login", data, { withCredentials: true });

  } catch (error: any) {
    console.error("Error during designer login:", error);
    throw new Error(error.response?.data?.message || "Failed to log in.");
  }
};
// 로그아웃 함수
export const logoutDesigner = async (): Promise<void> => {
  try {
    // 로그아웃 요청
    await api.post("/api/users/designer/logout", {}, { withCredentials: true });

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to log out.");


// Designer 회원가입
export const registerDesigner = async (data: { name: string; gender: string; username: string; password: string }): Promise<AxiosResponse> => {
  try {
    const response = await api.post("/api/users/designer/sign-up", data);
    return response.data;
  } catch (error) {
    console.error("Error during model registration:", error);
    throw error;
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
  status?: "AVAILABLE" | "UNAVAILABLE"
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

interface Review {
  reviewId: string;
  reviewContent: string;
  createdAt: string;
}


interface Model {
  modelDescription: string;
  petName: string;
  petAge: number;
  petGender: "MALE" | "FEMALE";
  breed: string;
  petImageUrl: string;
  reviews: Review[];
}

interface ReservationRequest {
  reservationRequestId: string;
  reservationRequestStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";
  model: Model;
  reservationRequestDate: string; // ISO 8601 format
  createdAt: string; // ISO 8601 format
}

// API 호출 함수
export const getReservationRequests = async (
  status?: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED"
): Promise<ReservationRequest[]> => {
  try {
    const url = status
      ? `/api/products/designer/reservation-request?status=${status}`
      : "/api/products/designer/reservation-request";
    const response: AxiosResponse<ReservationRequest[]> = await api.get(
      url
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reservation requests:", error);
    throw error;
  }
};
import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Axios 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export default api;

// 로그인 함수
export const loginDesigner = async (data: { username: string; password: string }): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const response = await api.post("/api/users/designer/login", data);
    return { isSuccess: true, message: "로그인 성공" };
  } catch (error: any) {
    console.error("Error during designer login:", error);
    return { isSuccess: false, message: error.response?.data?.message || "로그인 실패" };
  }
};

// 로그아웃 함수
export const logoutDesigner = async (): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    await api.post("/api/users/designer/logout");
    return { isSuccess: true, message: "로그아웃 성공" };
  } catch (error: any) {
    console.error("Error during logout:", error);
    return { isSuccess: false, message: error.response?.data?.message || "로그아웃 실패" };
  }
};

// 회원가입 함수
export const registerDesigner = async (data: { name: string; gender: string; username: string; password: string }): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    await api.post("/api/users/designer/sign-up", data);
    return { isSuccess: true, message: "회원가입 성공" };
  } catch (error: any) {
    console.error("Error during designer registration:", error);
    return { isSuccess: false, message: error.response?.data?.message || "회원가입 실패" };
  }
};

// 프로필 등록 함수
export const registerDesignerProfile = async (
  petShopName: string,
  address: string,
  addressDetail: string,
  career: string
): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const response = await api.post("/api/users/designer/profile", {
      petShopName,
      address,
      addressDetail,
      career,
    });
    return { isSuccess: true, message: "프로필 등록 성공" };
  } catch (error: any) {
    console.error("Error during profile registration:", error);
    return { isSuccess: false, message: error.response?.data?.message || "프로필 등록 실패" };
  }
};

// 프로필 조회 함수
export const getDesignerProfile = async (): Promise<{ isSuccess: boolean; message: string; result: { username: string; name: string } }> => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: { username: string; name: string };
    }>("/api/users/designer/profile");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching designer profile:", error);
    return { isSuccess: false, message: error.response?.data?.message || "프로필 조회 실패", result: { username: "", name: "" } };
  }
};

// 상품 등록 함수
export const addDesignerProduct = async (
  title: string,
  introduction: string,
  design: string,
  modelPreferDescription: string,
  preferBreed: string
): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const response = await api.post("/api/products/designer-product", {
      title,
      introduction,
      design,
      modelPreferDescription,
      preferBreed,
    });
    return { isSuccess: true, message: "상품 등록 성공" };
  } catch (error: any) {
    console.error("Error during product registration:", error);
    return { isSuccess: false, message: error.response?.data?.message || "상품 등록 실패" };
  }
};

// 상품 조회 함수
export const getDesignerProducts = async (
  status?: "AVAILABLE" | "UNAVAILABLE"
): Promise<{ isSuccess: boolean; message: string; result: any[] }> => {
  try {
    const query = status ? `?status=${status}` : "";
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: any[];
    }>(`/api/products/designer-product${query}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return { isSuccess: false, message: error.response?.data?.message || "상품 조회 실패", result: [] };
  }
};

// 리뷰 등록 함수
export const addDesignerReview = async (
  designerProductId: number,
  reviewContent: string
): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    await api.post("/api/products/designer/review", {
      designerProductId,
      reviewContent,
    });
    return { isSuccess: true, message: "리뷰 등록 성공" };
  } catch (error: any) {
    console.error("Error during review registration:", error);
    return { isSuccess: false, message: error.response?.data?.message || "리뷰 등록 실패" };
  }
};

// 예약 요청 조회 함수
export const getReservationRequests = async (
  status?: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED"
): Promise<{ isSuccess: boolean; message: string; result: ReservationRequest[] }> => {
  try {
    const query = status ? `?status=${status}` : "";
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: ReservationRequest[];
    }>(`/api/products/designer/reservation-request${query}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching reservation requests:", error);
    return { isSuccess: false, message: error.response?.data?.message || "예약 조회 실패", result: [] };
  }
};

// 타입 선언
interface ReservationRequest {
  reservationRequestId: string;
  reservationRequestStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";
  model: Model;
  reservationRequestDate: string;
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

interface Review {
  reviewId: number;
  reviewContent: string;
  createdAt: string;
}

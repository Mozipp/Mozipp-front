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
    console.log("Request:");
    console.log("URL:", config.url);
    console.log("Method:", config.method);
    console.log("Headers:", config.headers);
    console.log("Data:", config.data);
    console.log("Params:", config.params);
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
    console.log("Response:");
    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("Response Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
    return Promise.reject(error);
  }
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

// 로그아웃 함수
export const logoutModel = async (): Promise<void> => {
  try {
    // 로그아웃 요청
    await api.post("/api/users/model/logout", {}, { withCredentials: true });

  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to log out.");

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

// API 응답 데이터 형식 정의
interface PetProfile {
  petName: string;
  petAge: number;
  petGender: string;
  breed: string;
  petImageUrl: string;
}

// 애완동물 프로필 조회 API
export const getPetProfile = async (): Promise<PetProfile> => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: PetProfile;
    }>("/api/users/model/pet/profile");

    console.log("API 응답 데이터:", response.data); // 전체 응답 데이터 확인
    return response.data.result; // result 필드만 반환
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
interface UploadResponse {
  imageUrl: string;
}

export const uploadPetImage = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("petImage", file);

    const response: AxiosResponse<UploadResponse> = await api.post(
      "/api/users/model/pet/petImage",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data; // response.data는 UploadResponse 타입
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

interface ReservationRequest {
  reservationRequestId: number;
  reservationRequestStatus: string; // 예: "PENDING", "ACCEPTED", "REJECTED"
  modelDescription: string;
  reservationRequestDate: string;
  createdAt: string;
}

// 예약 요청 리스트 조회 API
export const getReservationRequests = async (status?: string): Promise<ReservationRequest[]> => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: ReservationRequest[];
    }>("/api/products/model/reservation-request", {
      params: { status }, // 예: pending, accepted, rejected
    });

    console.log("예약 요청 리스트 응답:", response.data); // 전체 응답 데이터 확인
    return response.data.result; // result 필드만 반환
  } catch (error) {
    console.error("Error fetching reservation requests:", error);
    throw error;
  }
};

// 예약 확정 리스트 조회 API
export const getConfirmedReservations = async () => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: {
        reservationId: number;
        petShop: {
          petShopName: string;
          address: string;
          addressDetail: string;
        };
        design: string;
        reservationStatus: string;
        reservationRequestDate: string;
        createdAt: string;
      }[];
    }>("/api/products/model/reservation", {
      params: { status: "CONFIRMED" }, // 추가된 필터
    });

    console.log("확정된 예약 리스트 응답 데이터:", response.data); // 디버그용

    return response.data.result; // result 필드만 반환
  } catch (error) {
    console.error("Error fetching confirmed reservations:", error);
    throw error;
  }
};

export const getCompletedReservations = async () => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: {
        reservationId: number;
        petShop: {
          petShopName: string;
          address: string;
          addressDetail: string;
        };
        design: string;
        reservationStatus: string;
        reservationRequestDate: string;
        createdAt: string;
      }[];
    }>("/api/products/model/reservation", {
      params: { status: "COMPLETED" }, // COMPLETED 상태 요청
    });

    console.log("API 응답 데이터:", response.data);

    return response.data.result; // result 필드만 반환
  } catch (error) {
    console.error("Error fetching completed reservations:", error);
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
export const createReview = async (data: {
  reservationId: number;
  reviewContent: string;
}) => {
  try {
    const response = await api.post("/api/products/model/review", data);
    console.log("리뷰 제출 성공:", response.data);
  } catch (error) {
    console.error("리뷰 제출 실패:", error);
    throw error;
  }
};


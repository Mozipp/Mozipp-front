import axios, { AxiosInstance, AxiosResponse } from "axios"; // AxiosResponse 추가

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",
  withCredentials: true, // 쿠키 전송 허용
  headers: {
    "Content-Type": "application/json",
  },
});

// 쿠키에서 AccessToken을 가져오는 유틸리티 함수
const getAccessTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith("access_token=")
  );
  return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
};

// Axios 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessTokenFromCookies(); // 쿠키에서 AccessToken 가져오기
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Authorization 헤더에 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;





// import axios, { AxiosInstance, AxiosResponse } from "axios";

// // Axios 인스턴스 생성
// const api: AxiosInstance = axios.create({
//   baseURL: "https://api.multi-learn.com/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 쿠키에서 accessToken 추출 함수
// const getAccessTokenFromCookies = (): string | null => {
//   const cookies = document.cookie.split("; ");
//   const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("access_token="));
//   return accessTokenCookie ? accessTokenCookie.split("=")[1] : null;
// };

// // Axios 요청 인터셉터 설정
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = "eyJraWQiOiJyc2Eta2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZGQiLCJpc3MiOiJodHRwczovL2FwaS5tdWx0aS1sZWFybi5jb20iLCJpYXQiOjE3MzI1NDE0MjEsImV4cCI6MTczMzQ0MTQyMX0.Yyo_a-vw2AkY3UadJHt5kB_mnetMTiABNKIcRhRWQ3XxEkBidC0WKcJfK-tmwpJvEVm54o7Pfb3eQgTYa6eNssfbxVqsORFmk09gTKnm9hKxpE8cbxZiogMys2rqnRzoqxVEvxbJNsWfF5T04WHPBPK0je8bHDgWwnejD_wd26ND93ngfWv15J0oAg82FqoKGc8Cb_P7ThsWC465AMf7Z06PCW9V_k0fbwgxT5Zj0fGUFl_SLlKjsMWqSjspPSuvohO8yrvN8xULR_1ixdUcMvO6KvW5_CbDfIR5p1FPC3rwFVDObLI7Gm0pOMnw4vX6YMHxggylaPgt6aLS_cLjJg";
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 로그인 함수
  export const loginDesigner = async (data: { username: string; password: string }): Promise<void> => {
    try {
      // 로그인 요청
      await api.post("/api/users/designer/login", data, { withCredentials: true });
  
    } catch (error: any) {
      console.error("Error during model login:", error);
      throw new Error(error.response?.data?.message || "Failed to log in.");
    }
  };

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
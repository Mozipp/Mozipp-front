import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


// const api = axios.create({
//   baseURL: "https://api.multi-learn.com/",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   httpsAgent: new (require("https").Agent)({
//     rejectUnauthorized: false,
//   }),
// });



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



export const getDesignerProfile1 = async (): Promise<{ isSuccess: boolean; message: string; result: { career: string; petShop: { petShopName: string; address: string; addressDetail: string; } }}> => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: { career: string; petShop: { petShopName: string; address: string; addressDetail: string; }; };
    }>("/api/users/designer/profile");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching designer profile:", error);
    return { isSuccess: false, message: error.response?.data?.message || "프로필 조회 실패", result: { career: "", petShop: {petShopName:"", address:"",addressDetail:""} } };
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

// 포트폴리오 사진추가
// API 호출 함수
export const uploadPetGroomingImage = async (file: File): Promise<{ success: boolean; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append("petGroomingImage", file);

    await api.post("/api/users/designer/profile/petGroomingImage", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, message: "이미지가 성공적으로 업로드되었습니다." };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || "업로드 실패" };
  }
};

// Fetch Uploaded Images
export const getUploadedPetGroomingImages = async (): Promise<
  { imageUrl: string }[]
> => {
  try {
    const response = await api.get("/api/users/designer/profile/petGroomingImage");
    console.log("API 응답 데이터:", response.data); // 응답 데이터 확인

    // 데이터가 예상한 형식인지 확인하고 반환
    if (response.data.isSuccess && Array.isArray(response.data.result)) {
      return response.data.result; // 이미지 URL 리스트 반환
    } else {
      throw new Error("API 응답 데이터 형식이 잘못되었습니다.");
    }
  } catch (error: any) {
    console.error("Error fetching images:", error.response || error);
    throw new Error(
      error.response?.data?.message || "이미지를 불러오는 데 실패했습니다."
    );
  }
};




export const deleteUploadedPetGroomingImage = async (
  imageUrl: string
): Promise<{ isSuccess: boolean; message?: string }> => {
  try {
    const response = await api.delete("/api/users/designer/profile/petGroomingImage", {
      data: { imageUrl },
    });
    return { isSuccess: true, message: response.data.message };
  } catch (error: any) {
    console.error("Error deleting image:", error);
    return { isSuccess: false, message: error.response?.data?.message || "이미지 삭제 실패" };
  }
};






export const updateReservationStatus = async (
  id: string,
  status: "ACCEPT" | "REJECT"
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.post(
      `/api/products/designer/reservation-request/${id}/${status.toLowerCase()}`
    );
    return { success: true, message: response.data.message };
  } catch (error: any) {
    console.error("Error updating reservation status:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};


export interface ReservationRequest {
  reservationRequestId: string;
  reservationRequestStatus: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";
  model: {
    modelDescription: string;
    petName: string;
    petAge: number;
    petGender: "MALE" | "FEMALE";
    breed: string;
    petImageUrl?: string;
    reviews: Array<{
      reviewId: number;
      reviewContent: string;
      createdAt: string;
    }>;
  };
  reservationRequestDate: string;
  createdAt: string;
}





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

// // 타입 선언
// export interface ConfirmedReservationRequest {
//   reservationId: string;
//   reservationStatus: "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
//   design: string;
//   model: {
//     modelDescription: string;
//     petName: string;
//     petAge: number;
//     petGender: "MALE" | "FEMALE";
//     breed: string;
//     petImageUrl?: string;
//     reviews: Array<{
//       reviewId: number;
//       reviewContent: string;
//       createdAt: string;
//     }>;
//   };
//   reservationDate: string;
//   createdAt: string;
// }

// 예약 확정 리스트 조회 API
export const getConfirmedReservations = async () => {
  try {
    const response = await api.get<{
      isSuccess: boolean;
      code: number;
      message: string;
      result: {
        reservationId: number;
        design: string;
        model: {
          modelDescription: string;
          petName: string;
          petAge: number;
          petGender: string;
          breed: string;
          petImageUrl: string;
          reviews: [
            {
              reviewId: string;
              reviewContent: string;
              createdAt: string;
            }
          ]
        }
        reservationStatus: string;
        reservationRequestDate: string;
        createdAt: string;
      }[];
    }>("/api/products/designer/reservation", {
      params: { status: "CONFIRMED" }, // 추가된 필터
    });

    console.log("확정된 예약 리스트 응답 데이터:", response.data); // 디버그용

    return response.data.result; // result 필드만 반환
  } catch (error) {
    console.error("Error fetching confirmed reservations:", error);
    throw error;
  }
};




export const updatefinalReservationStatus = async (
  reservationId: number,
  reservationStatus: "COMPLETED" | "CANCELLED" | "NO_SHOW"
): Promise<{ isSuccess: boolean; message: string }> => {
  try {
    const response = await api.post(
      `/api/products/designer/reservation/${reservationId}`,
      { reservationStatus }
    );
    return { isSuccess: true, message: "상태가 성공적으로 업데이트되었습니다." };
  } catch (error: any) {
    console.error("Error updating reservation status:", error);
    return { isSuccess: false, message: error.response?.data?.message || "상태 업데이트 실패" };
  }
};

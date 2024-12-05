import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",
  withCredentials: true,
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

api.interceptors.request.use(
    (config) => {
      const accessToken = "eyJraWQiOiJyc2Eta2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkZGQiLCJpc3MiOiJodHRwczovL2FwaS5tdWx0aS1sZWFybi5jb20iLCJpYXQiOjE3MzI1Mzg5NTgsImV4cCI6MTczMzQzODk1OH0.oFrQMeYSJu3BceUe791YUBIDkZjsDVr7NNFA-8_a-wRomiM44vqg9oPXKlpIlFeb6CPB3m98GxPtLcupXm71HMgghF1ISHNIbg8eMBOSk83LO0pFAwn6Gwh84xeSQW2ULNUsDcop6r8dSUayjOD960-XFKGqYTfDAQcF8kap6axPliyzoUb8LUEBhyyCd9vCHMwittTSpz0rL5CQz1CWn4AZKdeVuhPMSv3RepZS9PdJsFqZzawDBMT2eslgl0OJvj1hQGngt6oVJ8pwFkxlA-Y4l1btG7-wdKXJ3cmUVG4y6y47wAVX7kEvCnVhKWI0CCqPIVXbvztoJVQHlrS7dA";
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  

// 상품 등록
export const createProduct = async (productData: {
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
}) => {
  const response = await api.post('/api/products/designer-product', productData);
  return response.data;
};

// 상품 목록 조회
export const getProducts = async (status?: 'AVAILABLE' | 'UNAVAILABLE') => {
  const url = status ? `/api/products/designer-product?status=${status}` : '/api/products/designer-product';
  const response = await api.get(url);
  return response.data;
};

// 본인이 등록한 상품 조회
export const getMyProducts = async (status?: 'AVAILABLE' | 'UNAVAILABLE') => {
  const url = status ? `/api/products/designer-product/my-product?status=${status}` : '/api/products/designer-product/my-product';
  const response = await api.get(url);
  return response.data;
};

// 특정 디자이너 상품 조회
export const getDesignerProduct = async (designerProductId: string) => {
  const response = await api.get(`/api/products/designer-product/${designerProductId}`);
  return response.data;
};

// 예약 요청
export const createReservationRequest = async (requestData: {
  designerProductId: string;
  modelDescription: string;
  reservationRequestDate: string;
}) => {
  const response = await api.post('/api/products/model/reservation-request', requestData);
  return response.data;
};

// 예약 요청 리스트 조회
export const getReservationRequests = async (status?: 'PENDING' | 'ACCEPTED' | 'REJECTED') => {
  const url = status ? `/api/products/designer/reservation-request?status=${status}` : '/api/products/designer/reservation-request';
  const response = await api.get(url);
  return response.data;
};

// 예약 확정 리스트 조회
export const getReservations = async () => {
  const response = await api.get('/api/products/designer/reservation');
  return response.data;
};

// 신고 등록
export const createReport = async (reportData: {
  designerProductId: string;
  reportContent: string;
}) => {
  const response = await api.post('/api/products/designer/report', reportData);
  return response.data;
};

// 리뷰 등록
export const createReview = async (reviewData: {
  designerProductId: string;
  reviewContent: string;
}) => {
  const response = await api.post('/api/products/designer/review', reviewData);
  return response.data;
};

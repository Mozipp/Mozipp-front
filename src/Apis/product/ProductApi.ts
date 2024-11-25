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

// 상품 등록
export const createProduct = async (productData: {
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
}) => {
  const response = await api.post('/designer-product', productData);
  return response.data;
};

// 상품 목록 조회
export const getProducts = async (status?: 'AVAILABLE' | 'UNAVAILABLE') => {
  const url = status ? `/designer-product?status=${status}` : '/designer-product';
  const response = await api.get(url);
  return response.data;
};

// 본인이 등록한 상품 조회
export const getMyProducts = async (status?: 'AVAILABLE' | 'UNAVAILABLE') => {
  const url = status ? `/designer-product/my-product?status=${status}` : '/designer-product/my-product';
  const response = await api.get(url);
  return response.data;
};

// 특정 디자이너 상품 조회
export const getDesignerProduct = async (designerProductId: string) => {
  const response = await api.get(`/designer-product/${designerProductId}`);
  return response.data;
};

// 예약 요청
export const createReservationRequest = async (requestData: {
  designerProductId: string;
  modelDescription: string;
  reservationRequestDate: string;
}) => {
  const response = await api.post('/model/reservation-request', requestData);
  return response.data;
};

// 예약 요청 리스트 조회
export const getReservationRequests = async (status?: 'PENDING' | 'ACCEPTED' | 'REJECTED') => {
  const url = status ? `/designer/reservation-request?status=${status}` : '/designer/reservation-request';
  const response = await api.get(url);
  return response.data;
};

// 예약 확정 리스트 조회
export const getReservations = async () => {
  const response = await api.get('/designer/reservation');
  return response.data;
};

// 신고 등록
export const createReport = async (reportData: {
  designerProductId: string;
  reportContent: string;
}) => {
  const response = await api.post('/designer/report', reportData);
  return response.data;
};

// 리뷰 등록
export const createReview = async (reviewData: {
  designerProductId: string;
  reviewContent: string;
}) => {
  const response = await api.post('/designer/review', reviewData);
  return response.data;
};

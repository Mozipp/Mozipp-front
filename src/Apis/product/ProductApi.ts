import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: "https://api.multi-learn.com/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});  

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

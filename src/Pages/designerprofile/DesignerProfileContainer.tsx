import React, { useState } from 'react';
import DesignerProfilePresentation from './DesignerProfilePresentation';

const DesignerProfileContainer: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    petShopName: '',
    address: '',
    addressDetail: '',
    career: '',
    licenseImage: null as File | null,
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, licenseImage: e.target.files[0] });
    }
  };

  // 등록 버튼 클릭 시 상품 등록 메시지 표시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile Data:', formData); // 디버깅용
    setShowConfirmation(true); // 메시지 표시
  };

  // 상품 등록 여부 처리
  const handleConfirm = (answer: boolean) => {
    setShowConfirmation(false); // 메시지 닫기
    if (answer) {
      // "네" 선택 시 상품 등록 페이지로 이동
      window.location.href = '/designerproduct';
    } else {
      // "아니요" 선택 시 완료 메시지 표시
      alert('프로필 등록이 완료되었습니다!');
    }
  };

  return (
    <>
      <DesignerProfilePresentation
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />

      {showConfirmation && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <p style={styles.popupText}>상품 페이지를 등록하시겠습니까?</p>
            <div style={styles.buttonGroup}>
              <button style={styles.confirmButton} onClick={() => handleConfirm(true)}>
                네
              </button>
              <button style={styles.cancelButton} onClick={() => handleConfirm(false)}>
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  popupOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center' as const,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  popupText: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '10px',
  },
  confirmButton: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DesignerProfileContainer;

import React from "react";

interface DesignerProfileProps {
  profile: {
    career: string;
    petShop: {
      petShopName: string;
      address: string;
      addressDetail: string;
    };
  } | null; // 프로필은 처음에는 null
  formData: {
    petShopName: string;
    address: string;
    addressDetail: string;
    career: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DesignerProfilePresentation: React.FC<DesignerProfileProps> = ({
  profile,
  formData,
  onChange,
  onSubmit,
}) => {
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      background: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
      textAlign: "center" as const,
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#ff7f50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
    profileSection: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#f0f8ff",
      borderRadius: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    profileItem: {
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>프로필 등록</h1>

      {/* 프로필 등록 폼 */}
      <form onSubmit={onSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>미용실 이름</label>
          <input
            type="text"
            name="petShopName"
            value={formData.petShopName}
            onChange={onChange}
            style={styles.input}
            placeholder="미용실 이름을 입력하세요"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>주소</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            style={styles.input}
            placeholder="주소를 입력하세요"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>상세 주소</label>
          <input
            type="text"
            name="addressDetail"
            value={formData.addressDetail}
            onChange={onChange}
            style={styles.input}
            placeholder="상세 주소를 입력하세요"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>경력</label>
          <input
            type="text"
            name="career"
            value={formData.career}
            onChange={onChange}
            style={styles.input}
            placeholder="경력을 입력하세요"
          />
        </div>

        <button type="submit" style={styles.button}>
          등록/수정
        </button>
      </form>

      {/* 현재 프로필 */}
      {profile && (
        <div style={styles.profileSection}>
          <h2>현재 프로필</h2>
          <p style={styles.profileItem}>
            <strong>미용실 이름:</strong> {profile.petShop.petShopName}
          </p>
          <p style={styles.profileItem}>
            <strong>주소:</strong> {profile.petShop.address}
          </p>
          <p style={styles.profileItem}>
            <strong>상세 주소:</strong> {profile.petShop.addressDetail}
          </p>
          <p style={styles.profileItem}>
            <strong>경력:</strong> {profile.career}
          </p>
        </div>
      )}
    </div>
  );
};

export default DesignerProfilePresentation;

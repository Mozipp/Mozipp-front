import React from "react";

interface DesignerAcceptProps {
  requests: Array<{
    reservationRequestId: string; // number -> string
    reservationRequestStatus: string;
    model: {
      modelDescription: string;
      petName: string;
      petAge: number;
      petGender: string;
      breed: string;
    };
    reservationRequestDate: string;
    createdAt: string;
  }>;
  filter: "PENDING" | "ACCEPTED" | "REJECTED";
  setFilter: (filter: "PENDING" | "ACCEPTED" | "REJECTED") => void;
  onAction: (id: string, action: "ACCEPTED" | "REJECTED") => void; // id를 string으로 변경
}

const DesignerAcceptPresentation: React.FC<DesignerAcceptProps> = ({
  requests,
  filter,
  setFilter,
  onAction,
}) => {
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "50px auto",
      padding: "30px",
      background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
      borderRadius: "30px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      fontFamily: '"Arial", sans-serif',
    },
    header: {
      textAlign: "center" as const,
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#444",
    },
    filterGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "20px",
    },
    filterButton: (isActive: boolean) => ({
      padding: "10px 20px",
      borderRadius: "10px",
      border: "none",
      cursor: isActive ? "default" : "pointer",
      background: isActive ? "#4caf50" : "#ddd",
      color: isActive ? "#fff" : "#444",
    }),
    card: {
      background: "#fff",
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    content: {
      flex: 1,
    },
    actionGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "10px",
    },
    acceptButton: {
      backgroundColor: "#4caf50",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    },
    rejectButton: {
      backgroundColor: "#f44336",
      color: "#fff",
      padding: "10px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>예약 요청 관리</h1>
      <div style={styles.filterGroup}>
        <button
          style={styles.filterButton(filter === "PENDING")}
          onClick={() => setFilter("PENDING")}
        >
          대기 중
        </button>
        <button
          style={styles.filterButton(filter === "ACCEPTED")}
          onClick={() => setFilter("ACCEPTED")}
        >
          수락됨
        </button>
        <button
          style={styles.filterButton(filter === "REJECTED")}
          onClick={() => setFilter("REJECTED")}
        >
          거절됨
        </button>
      </div>
      {Array.isArray(requests) && requests.length > 0 ? (
        requests.map((request) => (
          <div key={request.reservationRequestId} style={styles.card}>
            <div style={styles.content}>
              <h3>
                <strong>강아지 이름:</strong> {request.model.petName}
              </h3>
              <p>
                <strong>소개:</strong> {request.model.modelDescription}
              </p>
              <p>
                <strong>품종:</strong> {request.model.breed}
              </p>
              <p>
                <strong>나이:</strong> {request.model.petAge}살
              </p>
            </div>
            <div style={styles.actionGroup}>
              {filter === "PENDING" && (
                <>
                  <button
                    style={styles.acceptButton}
                    onClick={() =>
                      onAction(request.reservationRequestId, "ACCEPTED")
                    }
                  >
                    수락
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() =>
                      onAction(request.reservationRequestId, "REJECTED")
                    }
                  >
                    거절
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>요청이 없습니다.</p>
      )}
    </div>
  );
};

export default DesignerAcceptPresentation;

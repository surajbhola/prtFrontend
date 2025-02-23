import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/api.config";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutModal.module.css";

const LogoutModal = ({ onClose }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.cancel}
            onClick={onClose}
            disabled={isLoggingOut}
          >
            Cancel
          </button>
          <button
            className={styles.logout}
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

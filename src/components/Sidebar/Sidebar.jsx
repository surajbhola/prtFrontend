import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Sidebar.module.css";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import LogoutModal from "../Modal/LogoutModal";

const Sidebar = () => {
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Profile management</h2>
        <nav className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaHome className={styles.icon} /> Home
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <FaUser className={styles.icon} /> Profile
          </NavLink>

        </nav>

  
        <div className={styles.logoutSection}>
          <button
            className={styles.logoutButton}
            onClick={() => setLogoutOpen(true)}
          >
            <FaSignOutAlt className={styles.icon} /> Logout
          </button>
        </div>
      </div>


      {isLogoutOpen && <LogoutModal onClose={() => setLogoutOpen(false)} />}
    </>
  );
};

export default Sidebar;

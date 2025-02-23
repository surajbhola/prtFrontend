import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>

      <Navbar />

      <div className={styles.mainContainer}>
  
        <Sidebar />

   
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

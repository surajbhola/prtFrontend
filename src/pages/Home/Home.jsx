import { useState } from "react";
import styles from "./Home.module.css";
import { FaPlus } from "react-icons/fa";
import Feed from "../Feed/Feed";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";


const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <h2>📢 Social Feed</h2>
        <button className={styles.createPostBtn} onClick={() => setShowModal(true)}>
          <FaPlus /> Create Post
        </button>
      </div>

      <Feed />

      {showModal && <CreatePostModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;

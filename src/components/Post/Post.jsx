import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/postSlice";
import styles from "./Post.module.css";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.postContainer}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
    </div>
  );
};

export default Post;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import styles from "./PostForm.module.css";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <div className={styles.formContainer}>
      <h3>Create a Post</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Post Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Post Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;

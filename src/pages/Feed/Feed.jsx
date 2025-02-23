import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Feed.module.css";
import { fetchPosts, deletePost, updatePost } from "../../redux/postSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const [editingPost, setEditingPost] = useState(null);
  const [newCaption, setNewCaption] = useState("");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const openEditModal = (post) => {
    setEditingPost(post);
    setNewCaption(post.caption);
  };

  const closeEditModal = () => {
    setEditingPost(null);
    setNewCaption("");
  };

  const handleSaveClick = () => {
    if (newCaption.trim() !== "" && editingPost) {
      dispatch(updatePost({ postId: editingPost._id, caption: newCaption }));
      closeEditModal();
    }
  };

  return (
    <div className={styles.feedContainer}>
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : posts.length === 0 ? (
        <p>No posts yet. Click Create Post to add one!</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className={styles.postCard}>
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Post" className={styles.postImage} />
            )}
            <h3>{post.caption}</h3>
            <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
            <div className={styles.buttonContainer}>
              <button onClick={() => openEditModal(post)}>Edit</button>
              <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
            </div>
          </div>
        ))
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Post</h2>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className={styles.editInput}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;

import { useState } from "react";
import styles from "./CreatePostModal.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import ImageKit from "imagekit-javascript";

// const BASE_URL = "http://192.168.1.12:5000"; // Replace with your backend URL
 const BASE_URL = "https://prtbackend-s6g4.onrender.com/api";

const CreatePostModal = ({ closeModal }) => {
  const imagekit = new ImageKit({
    publicKey: "public_d230eOOjqG7Gjb843uIgZYcuZv8=", 
    urlEndpoint: "https://ik.imagekit.io/ez2k09g8a", 
    authenticationEndpoint: `${BASE_URL}/api/imagekit/auth`,
  });

  const getAuthParams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/imagekit/auth`);
      if (!response.ok) throw new Error("Failed to fetch ImageKit Auth Params");

      return await response.json();
    } catch (error) {
      console.error("Error fetching ImageKit Auth:", error);
      return null;
    }
  };

  const uploadToImageKit = async (file) => {
    setUploading(true);
    try {
      const authParams = await getAuthParams();
      if (!authParams) throw new Error("Missing auth parameters");

      const uploadResponse = await imagekit.upload({
        file,
        fileName: file.name || "default.png",
        useUniqueFileName: true,
        folder: "/uploads",
        token: authParams.token,
        signature: authParams.signature,
        expire: authParams.expire,
      });

      console.log("Image Uploaded Successfully:", uploadResponse);
      setImage(uploadResponse.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToImageKit(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title & Content are required!");
      return;
    }

    const newPost = { title, caption: content, imageUrl: image };
    dispatch(createPost(newPost));
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Create a New Post</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p>Uploading image...</p>}
          {image && (
            <img src={image} alt="Preview" className={styles.previewImage} />
          )}

          <div className={styles.actions}>
            <button type="submit" disabled={uploading}>
              Post
            </button>
            <button
              type="button"
              onClick={closeModal}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;

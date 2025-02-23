import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, getUser, updateUserProfile } from "../../redux/authSlice";
import ImageKit from "imagekit-javascript";
import { baseUrl } from "../../config/api.config";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  console.log("user", user);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const imagekit = new ImageKit({
    publicKey: "public_d230eOOjqG7Gjb843uIgZYcuZv8=",
    urlEndpoint: "https://ik.imagekit.io/ez2k09g8a",
    authenticationEndpoint: `${baseUrl}/imagekit/auth`,
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setProfileImage(user.profilePic || "");
    }
  }, [user]);

  const getAuthParams = async () => {
    try {
      const response = await fetch(`${baseUrl}/imagekit/auth`);
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
        folder: "/profile_pictures",
        token: authParams.token,
        signature: authParams.signature,
        expire: authParams.expire,
      });

      console.log("Image Uploaded Successfully:", uploadResponse);
      setProfileImage(uploadResponse.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserProfile({ name, bio, profilePic: profileImage }));

      setModalOpen(false);
    
      dispatch(getUser());
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2>👤 Profile</h2>

      {loading ? (
        <p>Loading profile...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.profileCard}>
          <img
            src={profileImage}
            alt="Profile"
            className={styles.profileImage}
          />
          <h3>{name}</h3>
          <p>{bio}</p>
          <button onClick={() => setModalOpen(true)}>Edit Profile</button>
        </div>
      )}

 
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Profile Image:
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
                <button
                  type="button"
                  onClick={() => uploadToImageKit(imageFile)}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              </label>
              <img
                src={profileImage}
                alt="Profile Preview"
                className={styles.profileImage}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Bio"
              ></textarea>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

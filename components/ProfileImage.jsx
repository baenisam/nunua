import React, { useRef, useContext } from "react";
import { AiFillCamera } from "react-icons/ai";
import GlobalContext from "~/context/GlobalContext";
import useSettingSubmit from "~/Hooks/useSettinSubmit";
const ProfileImage = ({ image }) => {
  const { images, setImages } = useContext(GlobalContext);
  const { loading, updateImage } = useSettingSubmit();
  const fileRef = useRef();
  const handleClick = () => {
    fileRef.current.click();
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImages(event.target.files);
      updateImage(event.target.files[0]);
    }
  };
  return (
    <>
      <div className="avatar-profile">
        <div className="avatar-container">
          <img
            src={
              images?.length > 0
                ? URL.createObjectURL(images[0])
                : image
                ? image
                : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }
          />
          <button disabled={loading} onClick={handleClick}>
            {!loading ? (
              <AiFillCamera color="#fff" />
            ) : (
              <div class="spinner-border text-white" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </div>
      <input
        type="file"
        onChange={onImageChange}
        ref={fileRef}
        className="hidden"
      />
    </>
  );
};

export default ProfileImage;

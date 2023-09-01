import { PlusOutlined } from "@ant-design/icons";
// import ProductServices from "services/ProductServices";
import { Upload } from "antd";
// import { SidebarContext } from "context/SidebarContext";

const UploadImage = ({ setImages, limite, id, image }) => {
  // const { image } = useContext(SidebarContext);

  const handleChange = ({ fileList: newFileList }) => {
    setImages(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  );

  // const onRemove = (e) => {
  //   if (id) {
  //     if (location.pathname === "/products") {
  //       try {
  //         ProductServices.deleteProductImage(id, e.name);
  //       } catch (er) {
  //         console.log(er);
  //       }
  //     }
  //   }
  // };

  return (
    <div>
      <Upload
        listType="picture-card"
        accept="image/*"
        fileList={image}
        style={{with:60, height:60}}
        multiple={true}
        onChange={handleChange}
        maxCount={40}
      >
        {image?.length >= 50 ? null : uploadButton}
      </Upload>
    </div>
  );
};

export default UploadImage;

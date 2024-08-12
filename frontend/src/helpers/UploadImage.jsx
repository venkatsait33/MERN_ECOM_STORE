const url = `https://api.cloudinary.com/v1_1/dtrh55rb8/image/upload`;

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product_images");

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });

  return dataResponse.json();
};

export default UploadImage;

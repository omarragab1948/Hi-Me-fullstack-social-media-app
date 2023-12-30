import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "./firebaseConfig";
const uploadImage = async (image) => {
  console.log("Uploading image", image);
  try {
    console.log("Uploading image...");
    const imageRef = ref(storage, `images/${v4()}`);
    const uploaded = await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error.code, error.message);
    return { error: error.message };
  }
};
export default uploadImage;

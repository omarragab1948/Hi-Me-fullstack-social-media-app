import axios from "axios";

export const signUp = async (user) => {
  try {
    // Create a FormData object
    const formData = new FormData();

    // Append form fields to the FormData object
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("dob", user.dob);
    formData.append("gender", user.gender);
    formData.append("image", user.image);

    // Make the axios post request with the FormData
    const res = await axios.post("/api/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
export const signIn = async (user) => {
  try {
    const res = await axios.post("/api/signin", user);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const res = await axios.get(`/api/users/${userId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCoverImage = async (userId, image) => {
  try {
    const res = await axios.put(
      `/api/users/updateCoverImage/update/${userId}`,
      image
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateProfileImage = async (userId, image) => {
  console.log(image);
  try {
    const res = await axios.put(
      `/api/users/updateProfileImage/update/${userId}`,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfileImage = async (userId) => {
  try {
    const res = await axios.delete(
      `/api/users/updateProfileImage/delete/${userId}`
    );
    console.log("from profile");

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCoverImage = async (userId) => {
  try {
    const res = await axios.delete(
      `/api/users/updateCoverImage/delete/${userId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

import axiosInstance from "../../../libs/axiosInstance";
import { useDataStore } from "../../../Store/DataStore";
import type { logindata, signupdata } from "./types";

const { setUserData } = useDataStore.getState();
export const signup = async (signupdata: signupdata) => {
  if (
    signupdata.email === "" ||
    signupdata.name === "" ||
    signupdata.password === "" ||
    signupdata.confirmPassword === ""
  ) {
    alert("Empty credentials");
    throw new Error("Empty credentials");
  }
  if (signupdata.password !== signupdata.confirmPassword) {
    alert("Password does not match");
    throw new Error("Password does not match");
  }
  try {
    const response = await axiosInstance.post("/auth/signup", {
      email: signupdata.email,
      name: signupdata.name,
      password: signupdata.password,
      confirmPassword: signupdata.confirmPassword,
    });
    if (response.data) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};
export const login = async (loginData: logindata) => {
  if (loginData.email === "" || loginData.password === "") {
    alert("Empty credentials");
    throw new Error("Empty credentials");
  }
  try {
    const response = await axiosInstance.post("/auth/login", {
      email: loginData.email,
      password: loginData.password,
    });
    if (response.data) {
      setUserData(response.data.id, response.data.email, response.data.name);
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

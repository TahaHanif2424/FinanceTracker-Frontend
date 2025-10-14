import * as Yup from "yup"; // ✅ works with Vite + ESM

export const signupSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  name: Yup.string().min(3).required("Required"),
  // password: Yup.string().matches(passwordRules, { message: "Please create a strong message" }).required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  avatar: Yup.string(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  // password: Yup.string().matches(passwordRules, { message: "Please create a strong message" }).required("Required"),
  password: Yup.string().required("Required"),
});

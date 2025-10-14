import { useState } from "react";
import Input from "../../c-level/Input";
import Button from "../../c-level/Button";
import { useFormik } from "formik";
import { loginSchema } from "./Schema";
import { login } from "./functions";
import type { AuthProp } from "./types";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useDataStore } from "../../../Store/DataStore";

export default function Login({ changeMode }: AuthProp) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData } = useDataStore.getState();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          const response = await login(values);
          if (response) {
            setUserData(response.id, response.email, response.name);
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Login failed:", error);
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <div className="relative bg-white backdrop-blur-md p-12 rounded-3xl shadow-2xl w-full max-w-lg border border-career-lightGray animate-fade-in">
      {/* gradient background overlay */}

      <div className="relative z-10">
        {/* header */}
        <h2 className="text-xl font-semibold text-center text-career-darkGreen mb-8">
          Login
        </h2>

        {/* form */}
        <form className="space-y-2" onSubmit={handleSubmit}>
          {/* email */}
          <div>
            <label className="block text-career-darkGreen font-medium mb-2 text-base">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-career-mediumGreen w-5 h-5" />
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!(errors.email && touched.email)}
              />
            </div>
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* password */}
          <div>
            <label className="block text-career-darkGreen font-medium mb-2 text-base">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-career-mediumGreen w-5 h-5" />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={!!(errors.password && touched.password)}
              />
            </div>
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* button */}
          <div className="mt-6">
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </Button>
          </div>
        </form>

        {/* footer */}
        <div className="mt-8 text-center flex justify-center">
          <p className="text-career-mediumGreen text-base flex">
            Don't have an account?{" "}
            <span
              onClick={changeMode}
              className="font-semibold text-career-darkGreen hover:underline cursor-pointer"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Signup from "../components/a-level/auth/Signup";
import Login from "../components/a-level/auth/Login";

export default function AuthPage() {
  const [searchParams, setSearchPrams] = useSearchParams();
  const navigate = useNavigate();

  const changeMode = () => {
    if (searchParams.get("mode") === "login") {
      navigate("/auth?mode=signup");
    } else {
      navigate("/auth?mode=login");
    }
  };

  useEffect(() => {
    if (!searchParams) {
      setSearchPrams({ mode: "login" });
      return;
    }
    const mode = searchParams.get("mode");
    if (mode !== "signup" && mode !== "login") {
      setSearchPrams({ mode: "login" });
    }
  }, [searchParams, setSearchPrams]);

  const mode = searchParams.get("mode");
  const componentRender =
    mode === "login" ? (
      <Login changeMode={changeMode} />
    ) : (
      <Signup changeMode={changeMode} />
    );

  return (
    <div className="w-screen h-screen flex bg-white">
      {/* Left Half - Welcome Section */}
      <div className="w-1/2 bg-gradient-to-br from-career-darkGreen to-career-mediumGreen flex flex-col items-center justify-center text-white p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10"></div>

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center mb-8">
            <img
              src="/logo-bg.png"
              alt="Finance Tracker"
              className="w-20 h-20 mr-4"
            />
            <h1 className="text-4xl font-bold">Finance Tracker</h1>
          </div>

          <h2 className="text-3xl font-semibold mb-6">
            Take Control of Your Financial Future
          </h2>

          <p className="text-lg mb-6 opacity-90">
            Track expenses, manage budgets, and achieve your financial goals
            with our comprehensive finance management platform.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Smart Budgeting</h3>
                <p className="opacity-80">
                  Create and monitor budgets that adapt to your spending habits
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Visual Reports</h3>
                <p className="opacity-80">
                  Gain insights with beautiful charts and detailed analytics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Goal Tracking</h3>
                <p className="opacity-80">
                  Set financial goals and track your progress in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Auth Form */}
      <div className="w-1/2 flex items-center justify-center bg-career-lightGray p-12">
        <div className="w-full max-w-md">{componentRender}</div>
      </div>
    </div>
  );
}

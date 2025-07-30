import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { MdErrorOutline } from "react-icons/md";
import { ROUTES } from "../routes/routePaths";

const STORAGE_KEY = "rememberMeCredentials";

const Login = () => {
  const { login, isLoginLoading } = useAuth();
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // On mount, load saved creds if any
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const creds = JSON.parse(saved);
        if (creds.email && creds.password) {
          setEmail(creds.email);
          setPassword(creds.password);
          setRememberMe(true);
        }
      } catch {
        // invalid JSON - ignore
      }
    }
  }, []);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    // Basic email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Basic password validation
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) return;

    login(
      { email, password },
      {
        onSuccess: () => {
          if (rememberMe) {
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ email, password })
            );
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        },
        onError: (error) => {
          // Show the actual error message from the API
          alert(error.message || "Login failed");
        },
      }
    );
  };

  return (
    <div className="md:w-2/5 w-5/5 md:p-10 p-4 border border-[#e5e5e5] ">
      <h3 className="text-[#1d2328] md:text-3xl text-2xl font-medium">
        Login your Account
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-5">
        <span className="relative flex flex-col">
          <label
            htmlFor="email"
            className="uppercase font-[var(--font-light)] text-[#808387] text-xs tracking-wider absolute left-[10px] top-[10px]"
          >
            email
          </label>
          <input
            id="email-address"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoginLoading}
            type="text"
            className="outline-none font-[var(--font-regular)] border border-[#e5e5e5] pt-[1.5em] px-[.5em] pb-[.5em] focus:border-[#1d2328] duration-300"
          />
          {errors.email && (
            <p className="flex items-center gap-2 text-md py-3 px-1 font-[var(--font-regular)] tracking-wide mt-1 border-l-4  border-red-600 bg-red-200 text-red-600">
              <MdErrorOutline className="text-red-500" size={18} />{" "}
              {errors.email}
            </p>
          )}
        </span>

        <span className="relative flex flex-col">
          <label
            htmlFor="password"
            className="uppercase font-[var(--font-light)] text-[#808387] text-xs tracking-wider absolute left-[10px] top-[10px]"
          >
            password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            disabled={isLoginLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none font-[var(--font-regular)] border border-[#e5e5e5] pt-[1.5em] px-[.5em] pb-[.5em] focus:border-[#1d2328] duration-300"
          />
          {errors.password && (
            <p className="flex items-center gap-2 text-md py-3 px-1 font-[var(--font-regular)] tracking-wide mt-1 border-l-4  border-red-600 bg-red-200 text-red-600">
              <MdErrorOutline className="text-red-500" size={18} />{" "}
              {errors.password}
            </p>
          )}
        </span>
        <button
          type="submit"
          disabled={isLoginLoading}
          className="uppercase text-white tracking-wider text-md font-[var(--font-light)] bg-amber-800 py-[1.1em] px-[2em] hover:bg-[#1d2328] duration-300"
        >
          {isLoginLoading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Logging in...</span>
            </div>
          ) : (
            "login"
          )}
        </button>
        <div className="flex items-center justify-between mt-2">
          <label className="flex items-center">
            <input
              /* data-gtm-form-interact-field-id="0" */
              type="checkbox"
              id="rememberme"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="duration-300 appearance-none w-5 h-5 border border-[#e5e5e5] rounded-sm bg-white checked:bg-amber-800 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMSIgaGVpZ2h0PSIyMSIgZmlsbD0ibm9uZSI+DQoNCgk8cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjY2IDExLjhDOC4wMyAxMS4xNyA3IDkuOTkgNi4zMiA5LjI0Yy0uNjgtLjctMS4xMi0uMS0xLjk1Ljg2LS45MiAxLjAyIDAgMS41NSAxLjMyIDNsMi4zOSAyLjYzYy44Ny44NiAxLjYtLjQzIDIuNzctMS42Nmw0Ljc4LTUuMzFjMS41LTEuNjEgMS44NS0xLjYxLjYzLTIuOS0xLjA3LTEuMjMtMS4wMi0xLjIzLTIuNzMuNy0uNzguOC00LjYyIDUuMS00Ljg3IDUuMjZ6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz4NCjwvc3ZnPg0K')] checked:bg-no-repeat checked:bg-center checked:bg-[length:70%]"
            />
            <span className="ml-4 text-[#808387] tracking-wider uppercase font-[var(--font-light)] text-xs">
              Remember me
            </span>
          </label>
          <Link
            to={ROUTES.LOST_PWD}
            className="hover:border-amber-800 duration-300 border-b border-[#1d2328] pb-[.2em] uppercase text-md tracking-wider font-[var(--font-regular)]"
          >
            Lost your password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

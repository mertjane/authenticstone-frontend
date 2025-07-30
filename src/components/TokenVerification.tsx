import axios from "axios";
import ResetPassword from "../pages/ResetPassword";
import { ROUTES } from "../routes/routePaths";
import { useQuery } from "@tanstack/react-query";

// Token Verification Component
const TokenVerification = ({ token }: { token: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["verify-token", token],
    queryFn: () =>
      axios
        .post("http://localhost:4000/api/auth/verify-reset-token", { token })
        .then((res: any) => res.data),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-amber-800 font-medium mx-auto text-6xl">
          Lost Password
        </h1>
        <div className="max-w-xl mx-auto mt-16">
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-amber-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2 text-lg">Verifying reset link...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.valid) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-amber-800 font-medium mx-auto text-6xl">
          Lost Password
        </h1>
        <div className="max-w-xl mx-auto mt-16">
          <h2 className="text-3xl font-medium text-red-600 mb-4">
            Invalid or Expired Link
          </h2>
          <p className="text-gray-700 font-[var(--font-regular)] text-lg leading-tight">
            This password reset link is either invalid or has expired. Please
            request a new password reset link.
          </p>
          <a
            href={ROUTES.LOST_PWD}
            className="inline-block mt-6 px-6 py-3 bg-amber-800 text-white font-[var(--font-regular)] uppercase tracking-wider hover:bg-[#1d2328] duration-300"
          >
            Request New Link
          </a>
        </div>
      </div>
    );
  }

  return <ResetPassword token={token} />;
};

export default TokenVerification;

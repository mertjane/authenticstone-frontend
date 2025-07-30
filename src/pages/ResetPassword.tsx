import axios from "axios";
import { ROUTES } from "../routes/routePaths";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useState } from "react";

const ResetPassword = ({ token }: { token: string }) => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation({
    mutationFn: (data: { token: string; newPassword: string }) =>
      axios
        .post("http://localhost:4000/api/auth/reset-password", data)
        .then((res: any) => res.data),
    onSuccess: () => {
      // Redirect to login page or show success message
      navigate(ROUTES.AUTH + "?password-reset=success");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Failed to reset password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    resetPasswordMutation.mutate({
      token,
      newPassword: passwords.newPassword,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-20 text-center flex flex-col">
      <h1 className="text-amber-800 font-medium mx-auto text-6xl">
        Lost Password
      </h1>
      <div className="w-xl mt-16 mx-auto">
        <p className="text-gray-700 text-start font-[var(--font-regular)] ml-2 text-lg -mt-3 leading-tight">
          Enter a new password below.
        </p>
      </div>
      {error && (
        <div className="max-w-xl mx-auto mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4 p-2 md:w-xl w-full  flex flex-col gap-4 mx-auto">
        <span className="relative flex flex-col">
          <label
            htmlFor="newPassword"
            className="uppercase font-[var(--font-light)] text-[#808387] text-xs tracking-wider absolute left-[10px] top-[10px]"
          >
            new password
            <abbr title="required">*</abbr>
          </label>
          <input
            id="newPassword"
            name="newPassword"
            required
            autoComplete="new-password"
            type="password"
            value={passwords.newPassword}
            onChange={handleInputChange}
            disabled={resetPasswordMutation.isPending}
            className="outline-none text-lg font-[var(--font-regular)] border border-[#e5e5e5] pt-[1.5em] px-[.5em] pb-[.5em] focus:border-[#1d2328] duration-300"
          />
        </span>
        <span className="relative flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="uppercase font-[var(--font-light)] text-[#808387] text-xs tracking-wider absolute left-[10px] top-[10px]"
          >
            re-enter new password
            <abbr title="required">*</abbr>
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            required
            autoComplete="new-password"
            type="password"
            value={passwords.confirmPassword}
            onChange={handleInputChange}
            disabled={resetPasswordMutation.isPending}
            className="outline-none text-lg font-[var(--font-regular)] border border-[#e5e5e5] pt-[1.5em] px-[.5em] pb-[.5em] focus:border-[#1d2328] duration-300"
          />
        </span>
        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
          className="flex items-center justify-center w-max px-10 py-5 mt-3 bg-amber-800 text-md font-[var(--font-regular)] uppercase tracking-wider text-white hover:bg-[#1d2328] duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {resetPasswordMutation.isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Saving...
            </>
          ) : (
            "save"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

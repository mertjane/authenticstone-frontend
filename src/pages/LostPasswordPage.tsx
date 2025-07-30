import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { ROUTES } from "../routes/routePaths";
import RestLinkSent from "./RestLinkSent";
import TokenVerification from "../components/TokenVerification";

const LostPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const showResetLinkSent = searchParams.get("reset-link-sent") === "true";
  const showResetForm = searchParams.get("show-reset-form") === "true";
  const action = searchParams.get("action");
  const token = searchParams.get("token");


  const mutation = useMutation({
    mutationFn: (email: string) =>
      axios
        .post("http://localhost:4000/api/auth/lost-password", { email })
        .then((res: any) => res.data),
    onSuccess: () =>
      navigate(`${ROUTES.LOST_PWD}?reset-link-sent=true`, { replace: true }),
    onError: () => console.log("Email not found"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const email = (e.target as HTMLFormElement).email.value;
      mutation.mutate(email);
    } catch (error) {
      console.log(error);
    }
  };

  // Show reset password form if token is provided and show-reset-form=true
  if (showResetForm && action && token) {
    return <TokenVerification token={token} />;
  }

  // If query parameter is present, show RestLinkSent component
  if (showResetLinkSent) {
    return <RestLinkSent />;
  }

  // Otherwise, show the lost password form
  return (
    <div className="container md:px-10 px-6 py-20 mx-auto w-screen flex flex-col items-center justify-center">
      <h1 className="md:text-6xl text-4xl text-center">Lost password</h1>
      <form onSubmit={handleSubmit} className="p-2 md:w-xl w-full">
        <h3 className="text-2xl mt-6 text-[#1d2328]">Lost your password?</h3>
        <p className="max-w-5/5 leading-6 text-[#2e2e2e] text-lg py-3 font-[var(--font-regular)] tracking-wide">
          Please enter your email address. You will receive a link to create a
          new password via email.
        </p>
        <span className="relative flex flex-col">
          <label
            htmlFor="email"
            className="uppercase font-[var(--font-light)] text-[#808387] text-xs tracking-wider absolute left-[10px] top-[10px]"
          >
            email
          </label>
          <input
            id="email"
            name="email"
            required
            autoComplete="off"
            type="text"
            className="outline-none text-lg font-[var(--font-regular)] border border-[#e5e5e5] pt-[1.5em] px-[.5em] pb-[.5em] focus:border-[#1d2328] duration-300"
          />
        </span>
        <button
          disabled={mutation.isPending}
          type="submit"
          className="flex items-center justify-center p-4 w-full py-5 mt-3 bg-amber-800 text-md font-[var(--font-regular)] uppercase tracking-wider text-white hover:bg-[#1d2328] duration-300"
        >
          {mutation.isPending ? (
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
              Sending...
            </>
          ) : (
            "reset password"
          )}
        </button>
      </form>
    </div>
  );
};

export default LostPasswordPage;

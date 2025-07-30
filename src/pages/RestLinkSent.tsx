const RestLinkSent = () => {
  return (
    <div className="p-20 text-center">
      <h1 className="text-amber-800 font-medium mx-auto text-6xl">
        Lost Password
      </h1>
      <div className="max-w-xl mx-auto mt-16 text-start">
        <h2 className="text-3xl font-medium text-[#1d2328]">
          Password reset email has been sent.
        </h2>
        <p className="text-gray-700 font-[var(--font-regular)] text-lg -mt-3 leading-tight">
          A password reset email has been sent to the email address on file for
          your account, but may take several minutes to show up in your inbox.
          Please wait at least 15 minutes before attempting another reset.
        </p>
      </div>
    </div>
  );
};

export default RestLinkSent;

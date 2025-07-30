import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  return (
    <div className="min-h-screen w-full p-4 md:p-18">
      <h1 className="text-amber-800 text-center md:text-6xl text-4xl">My account</h1>
      <div className="flex md:flex-row flex-col md:gap-4 gap-8 md:px-20 md:py-20 px-0 py-10 items-center justify-center">
        <Login />
        <Register />
      </div>
    </div>
  );
};

export default Auth;

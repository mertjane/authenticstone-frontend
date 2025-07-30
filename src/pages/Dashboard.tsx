import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, forceLogout } = useAuth();

  const handleLogout = () => {
    forceLogout(); // clears tokens and user data
    navigate(".");
  };

  return (
    <div className="md:w-6/8 w-full md:p-8 py-10 flex flex-col gap-6">
      <div className="flex items-center md:w-4/5">
        <h3 className="text-3xl inline-block mr-2">
          Hello {user && user.first_name}
        </h3>
        <p className="text-[#808387] md:text-xl text-md font-[var(--font-regular)] flex items-center">
          (Not {user ? user.first_name : "you"}?{" "}
          <span
            onClick={handleLogout}
            className="text-amber-800 underline cursor-pointer ml-2"
          >
            Log out
          </span>
          )
        </p>
      </div>
      <div className="md:w-4/5 mt-4 border-b border-[#e5e5e5]">
        <p className="md:text-xl text-lg font-[var(--font-regular)]  md:leading-8 leading-6 mb-10">
          From your account dashboard you can view your{" "}
          <Link to="/my-account/orders">
            <span className="text-amber-800 underline cursor-pointer">
              recent orders
            </span>
          </Link>
          , manage your{" "}
          <span className="text-amber-800 underline cursor-pointer">
            <Link to="/my-account/addresses">billing and shipping address</Link>
          </span>
          , and{" "}
          <span className="text-amber-800 underline cursor-pointer">
            <Link to="/my-account/account-details">change your password </Link>
          </span>
          and account details.
        </p>
      </div>

      {/* Marketing preferences */}
      <div className="mt-4 md:w-4/5 border-b border-[#e5e5e5]">
        <h3 className="text-3xl inline-block mr-2 text-black">
          Marketing Preferences
        </h3>
        <br />
        <br />
        <p className="md:text-xl text-lg font-[var(--font-regular)] md:leading-8 leading-6 mb-10 text-[#23282d]">
          You're not on our mailing list!
          <br />
          If you would like to subscribe to receive future updates from us,
          including new products, exciting news, and sales, please click the
          button below.
        </p>
        <button className="mb-10 px-[1.5em] py-[1em] uppercase text-md font-[var(--font-regular)] tracking-wider bg-amber-800 text-white hover:bg-[#1d2328] duration-300">
          subscribe me
        </button>
      </div>

      {/* Delete account */}
      <div className="mt-4 md:w-3/5">
        <h3 className="text-3xl inline-block mr-2 text-black">
          Delete your account
        </h3>
        <p className="md:text-xl text-lg font-[var(--font-regular)] md:leading-8 leading-6 mb-10 text-[#23282d] mt-6">
          This will permanently delete your account and associated details from
          our system. It cannot be undone.
        </p>

        <button className="mb-10 px-[1.8em] py-[1em] uppercase text-md font-[var(--font-regular)] tracking-wider bg-[#b23434] text-white hover:bg-[#b23434e6] duration-300">
          delete account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

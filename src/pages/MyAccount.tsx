import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const MyAccount = () => {
  const { forceLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarData = [
    {
      item: "dashboard",
      link: ".",
    },
    {
      item: "orders",
      link: "orders",
    },
    {
      item: "addresses",
      link: "addresses",
    },
    {
      item: "account details",
      link: "account-details",
    },
  ];

  const getCurrentTitle = () => {
    const currentPath = location.pathname
      .replace("/my-account", "")
      .replace(/^\/+/, "");

    if (currentPath === "" || currentPath === ".") return "Dashboard";

    const matched = sidebarData.find((item) => item.link === currentPath);
    return matched
      ? matched.item.charAt(0).toUpperCase() + matched.item.slice(1)
      : "My Account";
  };

  const handleLogout = () => {
    forceLogout(); // clears tokens and user data
    navigate("."); 
  };

  return (
    <div className="min-h-screen md:p-10 p-4">
      <h1 className="md:text-6xl text-4xl w-full text-center py-6">
        {getCurrentTitle()}
      </h1>
      <div className="min-h-screen flex md:flex-row flex-col">
        {/* Sidebar */}
        <div className="md:h-[700px] h-auto md:w-2/8 w-full md:pr-6 p-0">
          <div className="bg-[#f9f8f3] h-2/6 shadow-xs flex items-center justify-start">
            <ul className="flex flex-col gap-3 md:ml-12 m-0 md:p-0 p-6">
              {sidebarData.map((i, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer text-[#1d2328d8] text-[15.5px] font-[var(--font-regular)] uppercase"
                >
                  <NavLink
                    to={i.link}
                    end={i.link === "."}
                    className={({ isActive }) =>
                      `cursor-pointer uppercase text-[15.5px] font-[var(--font-regular)] ${
                        isActive
                          ? "text-amber-800 font-semibold"
                          : "text-[#1d2328d8]"
                      }`
                    }
                  >
                    {i.item}
                  </NavLink>
                </li>
              ))}
              <li
                onClick={handleLogout}
                className="cursor-pointer text-[#1d2328d8] text-[15.5px] font-[var(--font-regular)] uppercase"
              >
                logout
              </li>
            </ul>
          </div>
        </div>
        {/* Main */}
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;

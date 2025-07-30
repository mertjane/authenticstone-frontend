import { useState } from "react";
import AddressSidebar from "../components/AddressSidebar";
import { useAuth } from "../hooks/useAuth";

const Addresses = () => {
  const { user, updateUserAddress } = useAuth();
  /* const [currentAddress, setCurrentAddress] = useState(null); */
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleOpenSidebar = () => setSidebarOpen(true);
  const handleCloseSidebar = () => setSidebarOpen(false);

  // Handle saving address (updates both billing and shipping)
  // Save address for both billing and shipping
  const handleSaveAddress = async (address: any) => {
    try {
      await updateUserAddress({
        billing: address,
        shipping: address,
      });

      console.log("✅ Address saved successfully");
      handleCloseSidebar();
    } catch (error) {
      console.error("❌ Failed to save address:", error);
      throw error; // Allow sidebar to display the error
    }
  };

  // Handle deleting address
  const handleDeleteAddress = async () => {
    try {
      await updateUserAddress({
        billing: null,
        shipping: null,
      });
      console.log("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="md:w-6/8 w-full md:p-8 py-10 flex flex-col gap-6">
        <p className="md:text-xl text-lg font-[var(--font-regular)]  md:leading-8 leading-6">
          The following addresses will be used on the checkout page.{" "}
        </p>
        <div className="flex flex-col md:w-3/5  justify-between">
          <div className="w-full flex justify-between gap-8">
            <div className="flex flex-col">
              <h2 className="md:text-3xl text-2xl inline-block mr-2 text-black">
                Billing addresses
              </h2>
              {user?.billing && (
                <div className="h-[270px] w-[340px] flex gap-6">
                  <div className="bg-[#f9f9f9] shadow-xs w-full h-full p-10 font-[var(--font-light)] tracking-wide">
                    <p>
                      {user?.billing?.first_name} {user?.billing?.last_name}
                    </p>
                    <p>{user?.billing?.city}</p>
                    <p>{user?.billing?.county || "-"}</p>
                    <p>{user?.billing?.postcode}</p>
                    <p>
                      {user?.billing?.country === "GB" && "United Kingdom (UK)"}
                    </p>

                    <p onClick={handleOpenSidebar} className="cursor-pointer w-max font-[var(--font-light)] text-md tracking-wider mt-8 border-b border-[#1d2328] hover:border-amber-800 duration-300 uppercase">
                      edit
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="md:text-3xl text-2xl inline-block mr-2 text-black">
                Shipping addresses
              </h2>
              {user?.shipping && (
                <div className="h-[270px] w-[340px] flex gap-6">
                  <div className="bg-[#f9f9f9] shadow-xs w-full h-full p-10 font-[var(--font-light)] tracking-wide">
                    <p>
                      {user?.shipping?.first_name} {user?.shipping?.last_name}
                    </p>
                    <p>{user?.shipping?.city}</p>
                    <p>{user?.shipping?.county || "-"}</p>
                    <p>{user?.shipping?.postcode}</p>
                    <p>
                      {user?.shipping?.country === "GB" &&
                        "United Kingdom (UK)"}
                    </p>

                    <p onClick={handleOpenSidebar} className="cursor-pointer w-max font-[var(--font-light)] text-md tracking-wider mt-8 border-b border-[#1d2328] hover:border-amber-800 duration-300 uppercase">
                      edit
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {!user?.billing || !user?.shipping ? (
            <button
              onClick={handleOpenSidebar}
              className="md:w-xs w-full uppercase py-[1em] px-[1em] bg-amber-800 hover:bg-[#1d2328] duration-300 text-white font-[var(--font-regular)] tracking-wide text-md"
            >
              add new
            </button>
          ) : (
            <></>
          )}
          <h2 className="inline-block md:hidden text-2xl mr-2 text-black">
            Shipping addresses
          </h2>
        </div>
      </div>
      {/* Sidebar */}
      <AddressSidebar
        existingAddress={user?.billing || user?.shipping}
        onSave={handleSaveAddress}
        onDelete={handleDeleteAddress}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </>
  );
};

export default Addresses;

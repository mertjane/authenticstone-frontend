import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

type AddressSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  existingAddress?: Address | null;
  onSave: (address: Address) => void;
  onDelete?: () => void;
};

type Address = {
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  postcode: string;
  address_1: string;
  address_2: string;
  city: string;
  county: string;
};

const AddressSidebar = ({
  isOpen,
  onClose,
  existingAddress,
  onSave,
  onDelete,
}: AddressSidebarProps) => {
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState<Address>({
    first_name: "",
    last_name: "",
    company: "",
    phone: "",
    email: "",
    country: "",
    postcode: "",
    address_1: "",
    address_2: "",
    city: "",
    county: "",
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [foundAddresses, setFoundAddresses] = useState<any[]>([]);
  const [isSearchingPostcode, setIsSearchingPostcode] = useState(false);

  // Initialize form with existing address or user data
  useEffect(() => {
    if (existingAddress) {
      setFormData(existingAddress);
    } else if (user) {
      // Pre-fill with user data for new addresses
      setFormData((prev) => ({
        ...prev,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      }));
    }
  }, [existingAddress, user, isOpen]);

  // Reset form when sidebar closes
  useEffect(() => {
    if (!isOpen) {
      setValidationErrors([]);
      setFoundAddresses([]);
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  // Validation function
  const validateForm = (): string[] => {
    const errors: string[] = [];

    // Required fields
    if (!formData.first_name.trim()) errors.push("First name is required");
    if (!formData.last_name.trim()) errors.push("Last name is required");
    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!formData.email.trim()) errors.push("Email address is required");
    if (!formData.country.trim()) errors.push("Country is required");
    if (!formData.address_1.trim()) errors.push("Address Line 1 is required");
    if (!formData.city.trim()) errors.push("Town/City is required");
    if (!formData.postcode.trim()) errors.push("Postcode is required");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push("Please enter a valid phone number");
    }

    // UK postcode validation (if country is GB)
    if (formData.country === "GB" && formData.postcode) {
      const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
      if (!postcodeRegex.test(formData.postcode)) {
        errors.push("Please enter a valid UK postcode");
      }
    }

    return errors;
  };

  // Find address by postcode (UK specific)
  const handleFindAddress = async () => {
    if (!formData.postcode.trim()) {
      setValidationErrors(["Please enter a postcode to search"]);
      return;
    }

    setIsSearchingPostcode(true);
    try {
      // Simulate API call to postcode lookup service
      // In real implementation, you'd call something like:
      // - Royal Mail API
      // - getAddress.io
      // - postcodes.io

      // Mock addresses for demo
      const mockAddresses = [
        {
          line1: "123 Main Street",
          line2: "",
          city: "London",
          county: "Greater London",
          postcode: formData.postcode.toUpperCase(),
        },
        {
          line1: "456 High Street",
          line2: "Flat 2",
          city: "London",
          county: "Greater London",
          postcode: formData.postcode.toUpperCase(),
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setFoundAddresses(mockAddresses);
    } catch (error) {
      setValidationErrors(["Failed to find addresses. Please enter manually."]);
    } finally {
      setIsSearchingPostcode(false);
    }
  };

  // Select an address from found addresses
  const selectAddress = (address: any) => {
    setFormData((prev) => ({
      ...prev,
      address_1: address.line1,
      address_2: address.line2,
      city: address.city,
      county: address.county,
      postcode: address.postcode,
    }));
    setFoundAddresses([]);
  };

  // Handle save
  const handleSave = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      // This will update both billing and shipping addresses
      await onSave(formData);
      onClose();
    } catch (error) {
      setValidationErrors(["Failed to save address. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setIsLoading(true);
      try {
        if (onDelete) {
          await onDelete();
        }
        onClose();
      } catch (error) {
        setValidationErrors(["Failed to delete address. Please try again."]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sliding Cart */}
      <div
        className={`border fixed top-0 right-0 w-full md:w-[650px] h-screen py-10 md:pl-10 pl-5 pr-5 bg-white z-[1001] overflow-y-auto transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="md:mr-5 mr-0 pb-6 border-b border-[#e5e5e5] flex items-center justify-between">
          <h1 className="text-3xl">Edit Address</h1>
          <svg
            onClick={onClose}
            className="cursor-pointer"
            width="22"
            height="16"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="hover:stroke-amber-800 duration-300"
              d="M1 8.5l8-8m-8 0l8 8"
              stroke="#1d2328"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 mt-10">
          {/* Error Messages */}
          {validationErrors.length > 0 && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <ul className="list-disc list-inside">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Name Fields */}
          <div className="wrapper w-full flex md:flex-row flex-col md:gap-0 gap-2">
            <span className="flex-1 relative">
              <label
                htmlFor="first_name"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                first name <abbr title="required">*</abbr>
              </label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={isLoading}
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
                type="text"
              />
            </span>
            <span className="flex-1 relative">
              <label
                htmlFor="last_name"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                last name <abbr title="required">*</abbr>
              </label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={isLoading}
                type="text"
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              />
            </span>
          </div>
          {/* Company */}
          <span className="flex-1 relative">
            <label
              htmlFor="company"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Company name (optional)<abbr title="required">*</abbr>
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              disabled={isLoading}
              type="text"
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
            />
          </span>

          {/* Phone & Email */}
          <div className="wrapper w-full flex md:flex-row flex-col md:gap-0 gap-2">
            <span className="flex-1 relative">
              <label
                htmlFor="phone"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                phone <abbr title="required">*</abbr>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
                type="text"
              />
            </span>
            <span className="flex-1 relative">
              <label
                htmlFor="email"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                email address <abbr title="required">*</abbr>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                type="text"
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              />
            </span>
          </div>

          {/* Country Select Box */}
          <span
            className="flex flex-row relative"
            id="multiple_addresses_billing_country_field"
            data-priority="40"
          >
            <label
              htmlFor="country"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Country / Region&nbsp;
              <abbr className="required" title="required">
                *
              </abbr>
            </label>
            <span className="flex-1">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                disabled={isLoading}
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
                required
                autoComplete="country"
                data-placeholder="Select a country / region…"
                data-label="Country / Region"
              >
                <option value="">Select a country / region…</option>
                <option value="GB">United Kingdom (UK)</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="OTHER">Other</option>
              </select>
              <noscript>
                <button
                  type="submit"
                  name="woocommerce_checkout_update_totals"
                  value="Update country / region"
                >
                  Update country / region
                </button>
              </noscript>
            </span>
          </span>

          {/* Postcode Search */}
          <div className="wrapper w-full flex md:flex-row flex-col md:gap-0 gap-2">
            <span className="flex-1 relative">
              <label
                htmlFor="postcode"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                postcode
              </label>
              <input
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                disabled={isLoading}
                className="placeholder:font-[var(--font-light)] text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
                type="text"
                placeholder="Enter Postcode"
              />
            </span>
            <span className="flex-1 relative">
              <button
                onClick={handleFindAddress}
                disabled={
                  isSearchingPostcode || isLoading || formData.country !== "GB"
                }
                className="bg-amber-800 hover:bg-[#1d2328] duration-300 text-md h-full text-center uppercase text-white  font-[var(--font-regular)] w-full md:py-0 py-[1.4em]"
              >
                {isSearchingPostcode ? "Searching..." : "find address"}
              </button>
            </span>
          </div>

          {/* Found Addresses */}
          {foundAddresses.length > 0 && (
            <div className="border border-[#e5e5e5] rounded p-4">
              <h4 className="text-lg font-[var(--font-regular)] mb-3">
                Select an address:
              </h4>
              {foundAddresses.map((address, index) => (
                <div
                  key={index}
                  onClick={() => selectAddress(address)}
                  className="cursor-pointer p-3 hover:bg-gray-50 border-b border-[#e5e5e5] last:border-b-0"
                >
                  <div className="font-[var(--font-regular)]">
                    {address.line1}
                  </div>
                  {address.line2 && (
                    <div className="text-sm">{address.line2}</div>
                  )}
                  <div className="text-sm">
                    {address.city}, {address.county} {address.postcode}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Address Line 1 */}
          <span className="flex-1 relative">
            <label
              htmlFor="address_1"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Address Line 1 <abbr title="required">*</abbr>
            </label>
            <input
              name="address_1"
              value={formData.address_1}
              onChange={handleChange}
              disabled={isLoading}
              type="text"
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
            />
          </span>
          <span className="flex-1 relative">
            <label
              htmlFor="address_2"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Address Line 2 (optional) <abbr title="required">*</abbr>
            </label>
            <input
              name="address_2"
              value={formData.address_2}
              onChange={handleChange}
              disabled={isLoading}
              type="text"
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
            />
          </span>
          <span className="flex-1 relative">
            <label
              htmlFor="city"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Town / City <abbr title="required">*</abbr>
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={isLoading}
              type="text"
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
            />
          </span>

          {/* County & Postcode */}
          <div className="wrapper w-full flex md:flex-row flex-col md:gap-0 gap-2">
            <span className="flex-1 relative">
              <label
                htmlFor="county"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                County (optional)
              </label>
              <input
                name="county"
                value={formData.county}
                onChange={handleChange}
                disabled={isLoading}
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
                type="text"
              />
            </span>
            <span className="flex-1 relative">
              <label
                htmlFor="postcode"
                className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
              >
                postcode <abbr title="required">*</abbr>
              </label>
              <input
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                disabled={isLoading}
                className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
                type="text"
              />
            </span>
          </div>
          {/* Delete Address Link */}
          {existingAddress && onDelete && (
            <p
              onClick={handleDelete}
              className="cursor-pointer font-[var(--font-light)] text-[#1d2328] text-md tracking-wider uppercase w-max pt-3 pb-1 border-b border-black hover:border-amber-800"
            >
              delete address
            </p>
          )}
          {/* <p className="cursor-pointer font-[var(--font-light)] text-[#1d2328] text-md tracking-wider uppercase w-max pt-3 pb-1 border-b border-black hover:border-amber-800">
            delete address
          </p> */}

          {/* Action Buttons */}
          <div className="flex-1 p-4 flex items-center justify-center gap-6">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="font-[var(--font-regular)] flex items-center justify-between gap-2 uppercase text-md tracking wider w-max py-5 px-10 bg-amber-800 hover:bg-[#1d2328] duration-300 text-white"
            >
              {isLoading && (
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
              )}
              {isLoading ? "Saving..." : "save"}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="font-[var(--font-regular)] uppercase text-md tracking wider w-max py-5 px-8 border border-[#e5e5e5] hover:bg-[#1d2328] hover:text-white duration-300"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressSidebar;

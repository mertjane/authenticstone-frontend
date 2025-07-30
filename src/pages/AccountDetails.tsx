import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const AccountDetails = () => {
  const {
    user,
    updateUserProfile,
    isUpdateProfileLoading,
    updateProfileError,
    isUpdateProfileSuccess,
  } = useAuth();

  // Local form state initialized with user data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Success and error state management
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // On user change (e.g., login), update local form data
  useEffect(() => {
    if (user) {
      const savedCreds = localStorage.getItem("rememberMeCredentials");
      let currentPassword = "";
      if (savedCreds) {
        currentPassword = JSON.parse(savedCreds).password || "";
      }
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        currentPassword,
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Show success message when profile update succeeds
  useEffect(() => {
    if (isUpdateProfileSuccess) {
      setShowSuccess(true);
      // Clear password fields after successful update
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [isUpdateProfileSuccess]);

  // Handle input changes locally
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  // Validation function
  const validateForm = () => {
    const errors: string[] = [];

    // Check if required fields are filled
    if (!formData.first_name.trim()) {
      errors.push("First name is required");
    }
    if (!formData.last_name.trim()) {
      errors.push("Last name is required");
    }
    if (!formData.email.trim()) {
      errors.push("Email is required");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    // Password validation (only if user is trying to change password)
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        errors.push("Current password is required to change password");
      }
      if (formData.newPassword.length < 6) {
        errors.push("New password must be at least 6 characters long");
      }
      if (formData.newPassword !== formData.confirmPassword) {
        errors.push("New password and confirm password do not match");
      }
    }

    return errors;
  };

  // On Save, update user profile
  const handleSave = () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Prepare update data
    const updateData: any = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      // Note: email updates might need special handling on your backend
    };

    // Only include password if user is changing it
    if (formData.newPassword) {
      updateData.password = formData.newPassword;
    }

    updateUserProfile(updateData);
  };

  return (
    <div className="md:w-6/8 w-full md:p-8 py-10 flex flex-col gap-6">
      <div className="md:w-6/8 w-full flex flex-col">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Profile updated successfully!
          </div>
        )}

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

        {/* API Error Message */}
        {updateProfileError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {updateProfileError.message}
          </div>
        )}

        <div className="wrapper w-full flex md:flex-row flex-col md:gap-0 gap-2">
          <span className="flex-1 relative">
            <label
              htmlFor="name"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              first name <abbr title="required">*</abbr>
            </label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              type="text"
            />
          </span>
          <span className="flex-1 relative">
            <label
              htmlFor="surname"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              last name <abbr title="required">*</abbr>
            </label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={isUpdateProfileLoading}
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              type="text"
            />
          </span>
        </div>
        <span className="flex-1 relative mt-2">
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
            disabled={isUpdateProfileLoading}
            className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
            type="text"
          />
        </span>
        {/* Password change */}
        <div className="mt-12 w-full flex flex-col">
          <h3 className="md:text-3xl text-2xl inline-block mr-2 text-black">
            Password change
          </h3>
          <span className="flex-1 mt-4 relative">
            <label
              htmlFor="password"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Current password (leave blank to leave unchanged)
            </label>
            <input
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              type="password"
              disabled={isUpdateProfileLoading}
            />
          </span>
          <span className="flex-1 mt-2 relative">
            <label
              htmlFor="password"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              New password (leave blank to leave unchanged)
            </label>
            <input
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              type="password"
              disabled={isUpdateProfileLoading}
            />
          </span>
          <span className="flex-1 mt-2 relative">
            <label
              htmlFor="password"
              className="uppercase absolute text-[12px] font-[var(--font-light)] text-[#808387] tracking-widest left-[10px] top-[10px]"
            >
              Confirm new password
            </label>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="text-xl font-[var(--font-regular)] w-full outline-none border border-[#e5e5e5] pt-[1.6em] px-[.5em] pb-[.5em]"
              type="password"
              disabled={isUpdateProfileLoading}
            />
          </span>
          <button
            onClick={handleSave}
            disabled={isUpdateProfileLoading}
            className="mt-2 w-[200px] uppercase py-[1.4em] bg-amber-800 hover:bg-[#1d2328] duration-300 text-white font-[var(--font-regular)] tracking-wide text-md"
          >
            save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;

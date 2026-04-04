// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../hooks/UseAuth.js";
// import img from "../images/Expense.png";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { register } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     const result = await register(
//       formData.name,
//       formData.email,
//       formData.password,
//     );

//     if (result.success) {
//       navigate("/dashboard");
//     } else {
//       setError(result.error || "Registration failed. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Left Image */}
//         <div className="w-1/2 hidden md:block">
//           <img
//             src={img}
//             alt="Register"
//             className="object-cover h-full w-full"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="p-8 w-full md:w-1/2">
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             Smart Expense Splitter
//           </h2>
//           <p className="text-sm text-center text-gray-600 mb-8">
//             Create your account
//           </p>

//           {/* Error */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name */}
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               placeholder="Enter your name"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* Email */}
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter your email"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* Password */}
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Enter your password"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* Confirm Password */}
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               placeholder="Confirm your password"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition cursor-pointer disabled:opacity-70"
//             >
//               {loading ? "Creating account..." : "Register"}
//             </button>
//           </form>

//           {/* Login Link */}
//           <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-indigo-600 hover:underline">
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth.js";
import { toast } from "react-toastify";
import img from "../images/Expense.png";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
    );

    if (result.success) {
      toast.success("Registered successfully! Check your email for OTP.");

      navigate("/verify-email", {
        state: { email: formData.email },
      });
    } else {
      setError(result.error);
      toast.error(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-[60%] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={img}
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Smart Expense Splitter
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded cursor-pointer"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

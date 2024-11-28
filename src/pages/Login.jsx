import React, { useState, useContext } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
	const navigate = useNavigate();
	const { loginAuthSet } = useContext(AuthContext);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = formData;
		if (!email || !password) {
			setError("All fields are required!");
			setSuccess(null);
			return;
		}

		try {
			setIsLoading(true);
			const response = await API.post("/api/v1/user/login", {
				email,
				password,
			});
			console.log(response.data.message);
			console.log(response.data.user);
			loginAuthSet(response.data.token, response.data.user);

			setSuccess(response.data.message);
			setError(null);
			navigate("/");
		} catch (error) {
			setError(error.response?.data?.message || "Something is Wrong !!");
			setSuccess(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInput = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div className="min-h-screen flex px-4 items-center justify-center bg-gray-200">
			<div className="bg-gray-50 shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-lg">
				<h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
					Login
				</h2>
				{error && (
					<div className="bg-red-100 border border-red-300 text-red-600 p-3 rounded mb-4 text-sm">
						{error}
					</div>
				)}
				{success && (
					<div className="bg-green-100 border border-green-300 text-green-600 p-3 rounded mb-4 text-sm">
						{success}
					</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleInput}
							className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
							placeholder="Enter your email"
						/>
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleInput}
							className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
							placeholder="Enter your password"
						/>
					</div>

					{/* Submit Button */}

					<button
						type="submit"
						className="w-full bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-700 transition duration-200"
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

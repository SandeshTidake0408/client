// eslint-disable
import React, { useState } from "react";
import API from "../services/api";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { username, email, password, confirmPassword } = formData;

		// Basic validation
		if (!username || !email || !password || !confirmPassword) {
			setError("All fields are required!");
			setSuccess(null);
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match!");
			setSuccess(null);
			return;
		}

		try {
			const response = await API.post("/api/v1/user/register", {
				username,
				email,
				password,
			});
			console.log(response.data.message);

			setSuccess(response.data.message);
			setError(null);
			// setFormData({
			// 	username: "",
			// 	email: "",
			// 	password: "",
			// 	confirmPassword: "",
			// });
		} catch (error) {
			setError(error.response.data.message);
			setSuccess(null);
		}

		console.log("Form Data Submitted: ", formData);
	};

	const handleInput = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className=" min-h-lvh flex px-4 items-center justify-center bg-gray-200 ">
			<div className="bg-gray-50 shadow-lg rounded-lg p-6 sm:p-10 w-full max-w-lg">
				<h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
					Register
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
					{/* Username */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Username
						</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInput}
							className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
							placeholder="ex: sdt0408"
						/>
					</div>

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
							placeholder="ex: sandy@gamil.com"
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

					{/* Confirm Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleInput}
							className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
							placeholder="Confirm your password"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-700 transition duration-200"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;

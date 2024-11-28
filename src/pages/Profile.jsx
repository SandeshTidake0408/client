import React, { useState, useEffect } from "react";
import API from "../services/api"; // Assuming you have an API service set up for requests
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const [profile, setProfile] = useState({
		username: "",
		email: "",
		password: "",
		newPassword: "",
	});
	const [isEditing, setIsEditing] = useState(false); // State to toggle between view/edit mode
	const [loading, setLoading] = useState(true); // Loading state
	const [error, setError] = useState(""); // Error handling
	const Navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchProfileData = async () => {
			try {
				if (!token) {
					setError("You must be logged in to view your profile.");
					return;
				}
				const response = await API.get("/api/v1/user/profile", {
					headers: {
						Authorization: `${token}`,
					},
				});
				setProfile(response.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch profile data.");
				setLoading(false);
			}
		};
		fetchProfileData();
	}, []);

	// Handle profile updates
	const handleProfileUpdate = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		console.log(profile);
		const response = await API.put(
			"/api/v1/user/update",
			{
				password: profile.password,
				newPassword: profile.newPassword,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.data) {
			alert("Profile updated successfully!");
			Navigate("/login");
		}
	};

	// Handle input changes
	const handleChange = (e) => {
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};

	// Loading and error handling
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p>Loading...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<p className="text-red-600">{error}</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
			<div className="bg-white shadow-md rounded-sm p-6 max-w-md w-full">
				<h1 className="text-2xl font-semibold text-gray-800 mb-4 inline-block mr-2">
					Profile
				</h1>

				{isEditing ? (
					// Edit Form
					<>
						<h1 className="text-2xl font-semibold text-gray-800 mb inline">
							Edit
						</h1>
						<form
							onSubmit={handleProfileUpdate}
							className="space-y-4"
						>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Username
								</label>
								<input
									type="text"
									name="username"
									readonly="true"
									value={profile.username}
									onChange={handleChange}
									className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
									placeholder="Enter your username"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>
								<input
									type="email"
									name="email"
									readonly="true"
									value={profile.email}
									onChange={handleChange}
									className="w-full border border-gray-300 readonly rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
									placeholder="Enter your email"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Current Password
								</label>
								<input
									type="password"
									name="password"
									value={profile.password}
									onChange={handleChange}
									className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
									placeholder="Enter new password"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									New Password
								</label>
								<input
									type="password"
									name="newPassword"
									value={profile.newPassword}
									onChange={handleChange}
									className="w-full border border-gray-300 rounded-sm px-4 py-2 text-gray-800 focus:ring-0 focus:border-gray-400"
									placeholder="Enter new password"
								/>
							</div>

							<button
								type="submit"
								className="w-full bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-700 transition duration-200"
							>
								Save Changes
							</button>
						</form>
					</>
				) : (
					// Display Profile
					<div>
						<p className="text-gray-700 mb-2">
							<strong>Username:</strong> {profile.username}
						</p>
						<p className="text-gray-700 mb-2">
							<strong>Email:</strong> {profile.email}
						</p>

						<button
							onClick={() => setIsEditing(true)}
							className="w-full bg-gray-800 text-white py-2 rounded-sm hover:bg-gray-700 transition duration-200 mt-4"
						>
							Change Password
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfileMenu = ({ username }) => {
	const { logoutAuthRemove } = useContext(AuthContext); // Get logout function from context
	const navigate = useNavigate();

	const [profileDropdown, setProfileDropdown] = useState(false);
	const handleLogout = () => {
		logoutAuthRemove(); // Clear auth data and token
		navigate("/login"); // Redirect to login page
	};

	return (
		<div className="relative flex items-center space-x-4">
			<span className="text-gray-800 font-medium  uppercase">
				{username}
			</span>
			<div className="relative group">
				{/* Dropdown trigger */}
				<button
					className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 focus:outline-none"
					onClick={() => {
						setProfileDropdown(!profileDropdown);
					}}
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				{/* Dropdown menu */}
				<div
					className={`${
						profileDropdown ? "block" : "hidden"
					} absolute bg-white border shadow-lg rounded py-2 mt-2 w-40 right-0 top-7 z-10 transition-all duration-300`}
				>
					<Link
						to="/profile"
						className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
						onClick={() => setProfileDropdown(false)}
					>
						Profile
					</Link>
					<button
						onClick={handleLogout}
						className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileMenu;

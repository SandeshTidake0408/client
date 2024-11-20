import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	// State to toggle the mobile menu
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Toggle the mobile menu when hamburger is clicked
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="flex items-center justify-between p-4 bg-white shadow-md">
			{/* Left Section - Website Name and Home Link */}
			<div className="flex items-baseline space-x-6">
				<h1 className="text-xl font-semibold text-gray-800">
					Stroyline-com
				</h1>
				<Link
					to="/"
					className="text-gray-700 hover:text-gray-900 font-medium  "
				>
					Home
				</Link>
			</div>

			{/* Right Section - Desktop Navigation */}
			<div className="hidden md:flex items-center space-x-4">
				<Link
					to="/login"
					className="text-gray-700 hover:bg-gray-100 border border-gray-400 py-2 px-4 rounded-md text-sm font-medium transition duration-200"
				>
					Login
				</Link>
				<Link
					to="/register"
					className="bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-200"
				>
					Register
				</Link>
			</div>

			{/* Hamburger Icon (Mobile View) */}
			<div className="md:hidden flex items-center">
				<button
					onClick={toggleMenu}
					className="text-gray-800 focus:outline-none"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>

			{/* Mobile Menu - Conditional Rendering */}
			<div
				className={`${
					isMenuOpen ? "block" : "hidden"
				} absolute top-16 right-4 left-4 bg-white shadow-md rounded-lg md:hidden`}
			>
				<div className="flex flex-col items-center space-y-4 py-4">
					<Link
						to="/login"
						className="text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md text-sm font-medium"
						onClick={() => setIsMenuOpen(false)} // Close the menu when an item is clicked
					>
						Login
					</Link>
					<Link
						to="/register"
						className="bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700"
						onClick={() => setIsMenuOpen(false)} // Close the menu when an item is clicked
					>
						Register
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

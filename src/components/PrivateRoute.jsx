import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
	// const { auth } = useContext(AuthContext);

	const token = localStorage.getItem("token"); // Check token in localStorage

	// If token exists, user is authenticated
	if (token) {
		return children;
	} else {
		// Redirect to login page if no token
		return <Navigate to="/login" />;
	}
};

export default PrivateRoute;

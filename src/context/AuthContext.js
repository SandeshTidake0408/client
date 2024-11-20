import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		token: null,
		isAuthenticated: false,
		user: null,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setAuth({
				token,
				isAuthenticated: true,
				user: JSON.parse(localStorage.getItem("user")),
			});
		}
	}, []);

	const loginAuthSet = (token, user) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));

		setAuth({
			token,
			isAuthenticated: true,
			user,
		});
	};
	const logoutAuthRemove = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user"); // Optional
		setAuth({
			token: null,
			isAuthenticated: false,
			user: null,
		});
	};

	return (
		<AuthContext.Provider value={{ auth, loginAuthSet, logoutAuthRemove }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

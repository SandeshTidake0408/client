import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from "./context/AuthContext";
const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<div>
					<Routes>
						<Route path="/" element={<h1>"WORKING"</h1>} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;

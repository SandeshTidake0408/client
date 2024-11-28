import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";
const App = () => {
	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<h1 className=" h-40 flex justify-center items-center">
								{`Hello ${undefined}`}
							</h1>
						}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<Profile />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;

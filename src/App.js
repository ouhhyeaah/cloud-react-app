// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "./Components/LoginComponent";
import RegistrationForm from "./Components/RegisterComponent";
import Home from "./Views/Home";
import Profile from "./Views/Profile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      <Routes>
        <Route
            path={"/"}
            element={< Home />}
        />
        <Route
            path="/profile/*"
            element={
              <PrivateRoute
                  path="/"
                  element={ < Profile />}
              />}
        />
        <Route
          path="/login"
          element={<LoginForm onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route path="/register" element={<RegistrationForm />}></Route>
          <Route
              path={"/logout"}
              element={<Home />}>
          </Route>
      </Routes>
    </Router>
  );
};

export default App;

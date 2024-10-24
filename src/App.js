import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./Route/PrivateRoute";
import LogoutButton from "./components/LogoutButton";  // 로그아웃 버튼 추가

import api from "./utils/api";  // api import 추가

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(); 
  }, []);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        api.defaults.headers["authorization"] = "Bearer " + token;
        const response = await api.get("/user/me");
        setUser(response.data.user);  
      }
    } catch (error) {
      setUser(null)
      console.log("Error fetching user data", error);
    }
  };

  return (
    <>
        <div className="app-container">
            {user && (
                <div className="logout-container">
                    <LogoutButton setUser={setUser} />
                </div>
            )}
            <Routes>
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<PrivateRoute user={user}><TodoPage /></PrivateRoute>} />
            </Routes>
        </div>
    </>
  );
}

export default App;

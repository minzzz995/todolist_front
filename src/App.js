import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./Route/PrivateRoute";
import api from "./utils/api";  // api import 추가

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const response = await api.get("/user/me");
        setUser(response.data.user);  // 사용자 정보 설정
      }
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  useEffect(() => {
    getUser();  // 컴포넌트가 처음 렌더링될 때 사용자 정보 가져옴
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute user={user}><TodoPage /></PrivateRoute>} />
    </Routes>
  );
}

export default App;

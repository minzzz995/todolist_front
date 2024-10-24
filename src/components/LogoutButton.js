// src/components/LogoutButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");  // 세션에서 토큰 제거
        setUser(null);  // 사용자 상태 초기화
        navigate("/login");  // 로그인 페이지로 리디렉션
    };

    return (
        <button onClick={handleLogout} className="button-logout">
            로그아웃
        </button>
    );
};

export default LogoutButton;

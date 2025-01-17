import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/login", { email, password })
      .then((res) => {
        console.log(res.data); // Kiểm tra dữ liệu phản hồi từ API
        if (res.data.message === "Login Success") {
          sessionStorage.setItem("id", res.data.id); // Lưu id người dùng
          sessionStorage.setItem("name", res.data.name); // Lưu tên người dùng
          navigate("/"); // Chuyển hướng đến trang chủ
        } else {
          setMessage("Đăng nhập thất bại, vui lòng thử lại.");
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Đăng nhập thất bại, vui lòng thử lại.");
      });
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", marginTop: "100px" }}
    >
      <h2 className="text-center">Đăng Nhập</h2>
      {message && <div className="alert alert-info">{message}</div>}{" "}
      {/* Hiển thị thông báo */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật Khẩu:</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng Nhập
        </button>
      </form>
      <div className="text-center mt-3">
        <p>
          Chưa có tài khoản?{" "}
          <Link to="/register">Đăng ký</Link> {/* Link tới trang đăng ký */}
        </p>
      </div>
    </div>
  );
};

export default Login;

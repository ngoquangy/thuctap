import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [password, setPassword] = useState("");
  const [mssv, setMssv] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/register", { name, email, sdt, password, mssv })
      .then((res) => {
        if (res.data === "Register Success") {
          setMessage("Đăng ký thành công! Bạn có thể đăng nhập.");
          navigate("/login"); // Chuyển hướng đến trang đăng nhập
        } else {
          setMessage(res.data); // Hiển thị thông báo từ server
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("Đăng ký thất bại, vui lòng thử lại.");
      });
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "100px" }}>
      <h2 className="text-center">Đăng Ký</h2>
      {message && <div className="alert alert-info">{message}</div>} {/* Hiển thị thông báo */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Họ và tên:</label>
          <input
            type="text"
            placeholder="Enter name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label className="form-label">Số điện thoại:</label>
          <input
            type="text"
            placeholder="Enter phone number"
            className="form-control"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu:</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">MSSV:</label>
          <input
            type="text"
            placeholder="Enter MSSV"
            className="form-control"
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng Ký
        </button>
      </form>
    </div>
  );
};

export default Register;

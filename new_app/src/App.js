import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/home/main"; // Import Main component
import Home from "./components/home/home"; // Import Home component
import ChungChi from "./components/home/chungchi"; // Import ChungChi component
import Thongke from "./components/admin/thongke"; // Import Thongke component
import Chitietnhiemvu from "./components/admin/chitietnhiemvu"; // Import Chitietnhiemvu component
import Add from "./components/admin/add"; // Import Add component
import Chitiet from "./components/home/chitiet"; // Import Chitiet component
import Login from "./components/login/login"; // Import Login component
import Register from "./components/login/register"; // Import Register component
import LoginAdmin from "./components/admin/login"; // Import LoginAdmin component
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Admin from "./components/admin/admin"; // Import LoginAdmin component
import Show from "./components/home/show"; // Import LoginAdmin component

const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('adminName') !== null;

  if (isAuthenticated) {
    // Nếu người dùng đã xác thực, trả về component được truyền vào
    return element;
  } else {
    // Nếu không xác thực, chuyển hướng về trang đăng nhập
    return <Navigate to="/admin" />;
  }
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Main Route */}
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Home />} /> {/* Route cho Home */}
            <Route path="chungchi" element={<ChungChi />} /> {/* Route cho ChungChi */}
            <Route path="chitiet/:id" element={<Chitiet />} /> {/* Route chi tiết */}
          </Route>

          {/* Login & Register */}
          <Route path="login" element={<Login />} /> {/* Route cho Login */}
          <Route path="register" element={<Register />} /> {/* Route cho Register */}

          {/* Admin Routes */}
         <Route path="/" element={<Admin />}>
            <Route path="/admin" element={<LoginAdmin />} /> {/* Route cho LoginAdmin */}
            <Route path="/thongke" element={<PrivateRoute element={<Thongke />} />} /> {/* Route cho Thongke */}
            <Route path="/thongke/:id" element={<PrivateRoute element={<Chitietnhiemvu />} />} /> {/* Route chi tiết nhiệm vụ */}
            <Route path="/thongke/add/:id" element={<PrivateRoute element={<Add />} />} /> {/* Route thêm mới nhiệm vụ */}
          </Route>

          <Route path="show/:id" element={<Show />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Lấy tên người dùng từ session storage
    const user = sessionStorage.getItem('name');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    // Xóa tên người dùng khỏi session storage và cập nhật state
    sessionStorage.removeItem('name');
    setUsername('');
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <header className="bg-light shadow-sm">
        <div className="container">
          <div className="row align-items-center py-3">
            {/* Logo */}
            <div className="col-md-7 col-6">
              <Link to="/" className="navbar-brand">
                <img
                  src="/images/download.jpg"
                  alt="Logo"
                  className="img-fluid"
                  style={{ height: "50px" }}
                />
              </Link>
              <span style={{ fontSize: "20px", fontWeight: "bold", margin: "0 10px" }}>Công ty Dark System</span>
            </div>

            {/* Search Bar
            <div className="col-md-5 d-none d-md-block">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button className="btn btn-outline-primary me-2" type="submit">
                  Search
                </button>
              </form>
            </div> */}

            {/* Auth Buttons */}
            <div className="col-md-5 col-6 text-end">
              {username ? (
                <>
                  <span className="me-2">Xin chào, {username}</span>
                  <button onClick={handleLogout} className="btn btn-outline-primary me-2">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <nav className="bg-light p-3" style={{ width: "250px" }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/chungchi" className="nav-link">
                Xem chứng chỉ
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center text-lg-start mt-auto">
        <div className="container p-4">
          <div className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Công ty ABC. Tất cả quyền được
              bảo lưu.
            </p>
            <Link href="#" className="me-4 text-reset">
              Điều khoản sử dụng
            </Link>
            <Link href="#" className="me-4 text-reset">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main;
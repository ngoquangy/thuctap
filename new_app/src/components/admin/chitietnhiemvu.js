import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Chitietnhiemvu = () => {
  const { id } = useParams(); // Lấy ID nhiệm vụ từ URL
  const [task, setTask] = useState([]); // Khởi tạo state là mảng rỗng

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết nhiệm vụ
    axios
      .get(`http://localhost:8081/thongke/${id}`)
      .then((res) => {
        setTask(res.data); // Gán dữ liệu trả về từ API (mảng sinh viên)
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [id]);

  // Hàm xử lý xóa sinh viên
  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8081/delete/${studentId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>DANH SÁCH SINH VIÊN HOÀN THÀNH NHIỆM VỤ</h1>
      <Link to={`/thongke`} className="btn btn-success ms-2">
        Exit
      </Link>
      <Link to={`/thongke/add/${id}`} className="btn btn-primary ms-2">
        Add
      </Link>
      <div className="my-5">
        <table className="table table-bordered mt-3">
          <thead className="thead-light">
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Password</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {task.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td> {/* Số thứ tự */}
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.sdt}</td>
                <td>{student.password}</td>
                <td>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chitietnhiemvu;

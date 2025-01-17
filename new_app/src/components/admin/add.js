import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const { id } = useParams(); // Lấy ID nhiệm vụ từ URL
  const [students, setStudents] = useState([]); // Danh sách sinh viên
  const [selectedStudentId, setSelectedStudentId] = useState(""); // ID sinh viên được chọn
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    // Gọi API để lấy danh sách sinh viên
    axios
      .get(`http://localhost:8081/student`)
      .then((res) => {
        setStudents(res.data); // Lưu danh sách sinh viên vào state
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedStudentId(event.target.value); // Lưu ID sinh viên được chọn vào state
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn reload trang mặc định của form
    if (!selectedStudentId) {
      alert("Vui lòng chọn một sinh viên!");
      return;
    }
    try {
      await axios.post(`http://localhost:8081/add/${id}/${selectedStudentId}`);
      navigate(`/thongke/${id}`); // Chuyển hướng đến trang cụ thể
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>THÊM SINH VIÊN</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student-select">Chọn sinh viên</label>
          <select
            id="student-select"
            className="form-control"
            value={selectedStudentId}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Chọn sinh viên
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                Name: { student.name || "Tên không xác định"}{", "}
                MSSV: { student.mssv || "MSSV không xác định"}{" "}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default Add;

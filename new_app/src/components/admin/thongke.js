import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Thongke = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/nhiemvu").then((res) => {
      setRecords(res.data);
    });
  }, []);
  return (
    <div className="container mt-4">
      <h1>DANH SÁCH NHIỆM VỤ</h1>

      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Hình ảnh</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, stt) => (
            <tr key={stt}>
              <td>{stt + 1}</td>
              <td>{d.name}</td>
              <td>{d.mota}</td>
              <td>
                <img
                  src={d.image}
                  className="card-img-top"
                  alt={d.name}
                  style={{ width: "100px", height: "auto" }} // Đặt chiều rộng cố định và chiều cao tự động
                />
              </td>
              <td>
                <Link to={`/thongke/${d.id}`} className="btn btn-primary ms-2">
                  Đánh giá
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); // Sử dụng JSX để trả về nội dung
};

export default Thongke; // Xuất component

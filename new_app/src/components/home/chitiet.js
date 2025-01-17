import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Chitiet = () => {
  const [record, setRecord] = useState(null); // Chỉ lấy một record duy nhất
  const { id } = useParams(); // Lấy id từ URL

  useEffect(() => {
    axios.get(`http://localhost:8081/chitietnhiemvu/${id}`).then((res) => {
      setRecord(res.data[0]); // Lấy record đầu tiên nếu dữ liệu là mảng
    });
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="card-title">{record.name}</h1>

      <img
        src={record.image} // Sử dụng hình ảnh từ API
        alt={record.name}
        className=""
        style={{ objectFit: "cover", height: "300px" }}
      />
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(record.ngaytao).toLocaleDateString()}
            </p>
            <p>
              <strong>Ngôn ngữ:</strong> {record.ngongu}
            </p>
            <p>
              <strong>Mô tả:</strong> {record.mota}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Ngày bắt đầu:</strong>{" "}
              {new Date(record.start).toLocaleDateString()}
            </p>
            <p>
              <strong>Ngày kết thúc:</strong>{" "}
              {new Date(record.end).toLocaleDateString()}
            </p>
            <p>
              <strong>Ghi chú:</strong> {record.node}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chitiet;

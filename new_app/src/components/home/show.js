import { QRCodeSVG } from "qrcode.react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Show = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [record, setRecord] = useState(null); // Thay đổi thành record
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    axios.get(`http://localhost:8081/student/${id}`).then((res) => {
      setRecord(res.data[0]); // Lấy bản ghi đầu tiên
      setLoading(false); // Đặt loading thành false sau khi nhận dữ liệu
    }).catch(err => {
      console.error(err);
      setLoading(false); // Đặt loading thành false nếu có lỗi
    });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading nếu đang tải dữ liệu
  }

  if (!record) {
    return <div>Không tìm thấy thông tin cho ID: {id}</div>; // Thông báo nếu không tìm thấy bản ghi
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border border-primary rounded p-4 text-center bg-light"
        style={{ maxWidth: "700px", width: "100%", padding: "20px" }}
      >
        <h1 className="text-primary" style={{ fontSize: "28px", fontWeight: "bold" }}>
          CERTIFICATE OF COMPLETION
        </h1>
        <h2 className="font-weight-bold" style={{ fontSize: "36px" }}>
          {record.name}
        </h2>
        <p className="mt-4" style={{ fontSize: "18px" }}>
          has completed the necessary courses of study and passed the exams and
          is hereby declared a Certified Developer.
        </p>
        <p className="mt-4" style={{ fontSize: "14px" }}>
          March 8, 2024
        </p>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="signature" style={{ fontStyle: "italic", textAlign: "left" }}>
            <img
              src="/images/5d776959-2a0e-4f26-b745-e89c3da76a9b-fotor-bg-remover-20250115142458.png"
              alt="Logo"
              className="img-fluid"
              style={{ height: "100px", marginBottom: "10px" }}
            />
            <p>Nguyễn Văn A</p>
          </div>
          <div className="qr-code">
            <QRCodeSVG value={`http://localhost:3000/show/${id}`} size={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ChungChi = () => {
  const [records, setRecords] = useState([]);
  const id = sessionStorage.getItem("id");

  const [name, setName] = useState("");
  useEffect(() => {
    const user = sessionStorage.getItem("name");
    if (user) {
      setName(user);
    }
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8081/nhiemvu/${id}`).then((res) => {
      setRecords(res.data);
    });
  }, [id]);

  return (
    <div className="d-flex justify-content-center">
      {records.length >= 2 ? (
        <div
          className="border border-primary rounded p-4 text-center bg-light"
          style={{ maxWidth: "700px", width: "100%", padding: "20px" }}
        >
          <h1
            className="text-primary"
            style={{ fontSize: "28px", fontWeight: "bold" }}
          >
            CERTIFICATE OF COMPLETION
          </h1>
          <h2 className="font-weight-bold" style={{ fontSize: "36px" }}>
            {name}
          </h2>
          <p className="mt-4" style={{ fontSize: "18px" }}>
            has completed the necessary courses of study and passed the exams
            and is hereby declared a Certified Developer.
          </p>
          <p className="mt-4" style={{ fontSize: "14px" }}>
            March 8, 2024
          </p>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div
              className="signature"
              style={{ fontStyle: "italic", textAlign: "left" }}
            >
              <img
                src="/images/5d776959-2a0e-4f26-b745-e89c3da76a9b-fotor-bg-remover-20250115142458.png"
                alt="Logo"
                className="img-fluid"
                style={{ height: "100px", marginBottom: "10px" }}
              />
              <p>Nguyễn Văn A</p>
            </div>
            <div className="qr-code">
              <QRCodeSVG
                value={`http://localhost:3000/show/${id}`}
                size={100}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4">Chưa đủ điều kiện để nhận chứng chỉ.</p>
      )}
    </div>
  );
};

export default ChungChi;

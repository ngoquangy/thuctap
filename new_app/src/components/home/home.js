import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [records, setRecords] = useState([]);
  const id = sessionStorage.getItem('id');

  useEffect(() => {
    axios.get(`http://localhost:8081/nhiemvu/${id}`).then((res) => {
      setRecords(res.data);
    });
  }, [id]); // Đảm bảo useEffect sẽ chạy lại nếu id thay đổi

  return (
    <div className="container">
      <h1 className="">Nhiệm Vụ Hoàn Thành</h1>
      <div className="row mt-4">
        {records.map((d, i) => (
          
          <div className="col-md-4 mb-4" key={i}>
            <div className="card">
              <img
                src={d.image} // Sử dụng hình ảnh từ JSON hoặc placeholder
                className="card-img-top"
                alt={d.name}
              />
              <div className="card-body">
                <h5 className="card-title">{d.name}</h5>
                <p className="card-text">{d.mota}</p>
                <Link to={`/chitiet/${d.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

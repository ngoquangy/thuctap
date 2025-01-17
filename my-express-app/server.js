import express, { Router } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Middleware để phân tích JSON
app.use(express.json());
app.use(cors());

// Sử dụng cookie-parser
app.use(cookieParser());

// Cấu hình session
app.use(
  session({
    secret: "your_secret_key", // Thay thế bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Đặt là true nếu bạn sử dụng HTTPS
  })
);

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rotthuctap",
});

// Route đăng nhập
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM student WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.status(500).json({ message: "Error: " + err });

    if (result.length > 0) {
      // Đảm bảo chỉ lấy thông tin người dùng đầu tiên
      const user = result[0];
      return res.json({
        message: "Login Success",
        name: user.name,
        id: user.id
      });
    } else {
      return res.json({ message: "Login Failed" });
    }
  });
});



app.post("/loginAdmin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.status(500).json({ message: "Error: " + err });

    if (result.length > 0) {
      // Đảm bảo chỉ lấy thông tin người dùng đầu tiên
      const user = result[0];
      return res.json({
        message: "Login Success",
        id: user.id
      });
    } else {
      return res.json({ message: "Login Failed" });
    }
  });
});

// Route đăng ký
app.post("/register", (req, res) => {
  const { name, email, sdt, password, mssv } = req.body;

  // Kiểm tra xem email đã tồn tại
  const checkEmailSql = "SELECT * FROM student WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json("Error: " + err);
    }
    if (results.length > 0) {
      return res.status(400).json("Email đã tồn tại"); // Email đã tồn tại
    }

    // Nếu email chưa tồn tại, thực hiện chèn
    const sql = "INSERT INTO student (name, email, sdt, password, mssv) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, sdt, password, mssv], (err, result) => {
      if (err) {
        return res.status(500).json("Error: " + err);
      }
      return res.json("Register Success");
    });
  });
});


app.get("/thongke/:id", (req, res) => {
  const id = req.params.id; // Lấy ID từ URL
  db.query(
    "SELECT * FROM student, s_nhiemvu WHERE s_nhiemvu.id_nhiemvu = ? AND s_nhiemvu.id_student = student.id;",
    [id],
    (err, results) => {
      if (err) {
        return res.json(err);
      }
      return res.json(results);
    }
  );
});

app.get("/student", (req, res) => {
  db.query("SELECT * FROM student", (err, results) => {
    if (err) {
      return res.json(err);
    }
    return res.json(results);
  });
});

app.get("/student/:id", (req, res) => {
  const id = req.params.id; // Lấy ID nhiệm vụ từ URL
  db.query("SELECT * FROM student WHERE id = ?", [id],(err, results) => {
    if (err) {
      return res.json(err);
    }
    return res.json(results);
  });
});

app.post("/add/:id/:idstudent", (req, res) => {
  const id = req.params.id; // Lấy ID nhiệm vụ từ URL
  const idstudent = req.params.idstudent; // Lấy ID sinh viên từ URL

  // Thực thi truy vấn SQL
  db.query(
    "INSERT INTO s_nhiemvu(id_student, id_nhiemvu) VALUES (?, ?)",
    [idstudent, id], // Truyền các giá trị
    (err, results) => {
      if (err) {
        return res.json(err);
      }
      return res.json(results);
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id; // Lấy ID từ URL
  db.query("DELETE FROM s_nhiemvu WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.json(err);
    }
    return res.json(results);
  });
});

app.get("/nhiemvu/:id", (req, res) => {
  const id = req.params.id; // Lấy ID từ URL
  db.query("SELECT nhiemvu.* FROM nhiemvu JOIN s_nhiemvu ON nhiemvu.id = s_nhiemvu.id_nhiemvu JOIN student ON s_nhiemvu.id_student = student.id WHERE student.id = ?",[id], (err, results) => {
    if (err) {
      return res.json(err);
    }
    return res.json(results);
  });
});

app.get("/nhiemvu", (req, res) => {
  db.query("SELECT * FROM nhiemvu", (err, results) => {
    if (err) {
      return res.json(err);
    }
    return res.json(results);
  });
});

app.get("/chitietnhiemvu/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM nhiemvu WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.json(err);
    }
    console.log(results); // Thêm dòng này để kiểm tra kết quả trả về
    return res.json(results);
  });
});


// Khởi động server
app.listen(8081, () => {
  console.log(`Listening on port http://localhost:8081/`);
});

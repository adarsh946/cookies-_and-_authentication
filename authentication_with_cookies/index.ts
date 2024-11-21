import express from "express";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "secret";

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // do database validation and get user id

  const token = jwt.sign(
    {
      id: "1",
    },
    JWT_SECRET
  );
  res.cookie("token", token);
  res.send("Signed In");
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  res.json({
    userId: decoded.id,
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.cookie("token", "");

  res.send("logged out");
});

app.listen(3000);

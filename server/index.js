const express = require("express");
const app = express();
require("dotenv").config();

const dbConnect = require("./config/dbConnector");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const courseRoutes = require("./routes/courseRoutes");
 


PORT = process.env.PORT || 5000;
dbConnect();


app.use(
   fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp",
   })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, ()=>{
   console.log("Server is running on port :", PORT);
});

//postman testing router document - https://documenter.getpostman.com/view/24441701/2s93kz6REm
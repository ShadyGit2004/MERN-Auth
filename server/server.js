let express = require("express");
require("dotenv/config");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const {authRoutes} = require("./routes/authRoutes.js");
const {userRoutes} = require("./routes/userRoutes.js");
const databaseConnection = require("./config/db.js");

const app = express();
const port = process.env.PORT || 3000;
databaseConnection();

const allowedOrigins = [process.env.CLIENT_URL];

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({origin : allowedOrigins, credentials : true}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res)=>{
    res.send("auth root working");
});

app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
});
 
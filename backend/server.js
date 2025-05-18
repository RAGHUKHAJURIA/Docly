const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const cors = require('cors');


//config dotenv
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes

app.get('/', (req, res) => {
    res.send({
        activeStatus: true,
        error: false,
    })
})



app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// app.use(cors({
//     origin: '*', // or use '*' to allow all origins (not recommended for production)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));


//listen port
const port = process.env.PORT || 8080 // this line shows that there is environmental variable that is used when we snd our code for production

app.listen(port, () => {
    console.log(`sever running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white
    );
})
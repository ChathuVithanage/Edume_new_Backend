require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path');
const bodyParser = require('body-parser');

// const bodyParser = require('body-parser');

const userlsRoutes = require('./routes/UserLS');
const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
const teacherRoutes = require('./routes/Teacher');
const studentRoutes = require('./routes/Student');
const courseRoutes = require('./routes/Courses');
const paymentRoutes = require('./routes/Payment')
const assignmentRoutes = require('./routes/T_Assignment')

//express app
const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

app.use(cors(corsOptions));

// Serve uploaded files statically
//app.use("/files", express.static("files"))

// Increase the request payload limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use('/files', express.static(path.join(__dirname, 'files')));

// Define middleware
//app.use(bodyParser.json());


// midlware.............................
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})


app.use('/UserLS', userlsRoutes);
app.use('/User', userRoutes);
app.use('/Admin', adminRoutes);
app.use('/Teacher', teacherRoutes);
app.use('/Student', studentRoutes);
app.use('/course', courseRoutes);
app.use('/Payment',paymentRoutes)
app.use('/Assignment', assignmentRoutes)


// connect to db........................
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("server is running")
        })
    })
    .catch((error) => console.log(error))


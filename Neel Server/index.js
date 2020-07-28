const express = require('express');
const app = express();
const path = require('path');
const videoRouter = require('./routers/videoRouter');
const courseRouter = require('./routers/courseRouter');
const loginRouter  = require('./routers/auth');
const signUpRouter = require('./routers/signup');
const addUserRouter = require('./routers/adduser');
const docRouter = require('./routers/docRouter');
const notesRouter = require('./routers/viewNotesRouter');
const playVideo = require('./routers/playVideoRouter');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// cors = require("cors");
// app.use(cors());

// app.use('/',indexRouter);
// app.use('/',router);

const logger = require('morgan');
const cors = require('cors');


//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/login',loginRouter);
app.use('/uploadVideo',videoRouter);
app.use('/signup',signUpRouter)
app.use('/addcourse',courseRouter);
app.use('/adduser',addUserRouter);
app.use('/uploadnotes',docRouter);
app.use('/viewnotes',notesRouter);
app.use('/playvideo',playVideo);
// app.use('/getCourse',getCourse);

app.listen(5000,() =>{
    console.log("Server Started");
});
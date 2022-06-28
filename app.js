const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const expresslayouts = require("express-ejs-layouts")
// const bycrpt = require('bcrypt')
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const { text } = require("body-parser");
const { route } = require("./routes/login");
const app = express();
var path = require("path");
const adminRoute = require("./routes/admin");
const program_routes = require("./routes/programs");
const tourPageRoutes = require("./routes/tourPage");
const reservationRoutes = require("./routes/reservations");
const tourBookingsRoutes = require('./routes/tourBooking')
const loginRoute = require("./routes/login")





app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  sessions({
    secret: "secret$code321",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 },
  })
);



app.set("view engine", "ejs");
app.listen(8080, () => {
  console.log("Server started at port 8080");
  console.log("Database Connected");
});



const db = mysql.createConnection({
  database: "dolphincove",
  password: "root",
  user: "root",
  host: "localhost",
});

db.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database Connected");
});

app.set("views", path.join(__dirname, "views"));

// set directory file for public folder holding css stylesheet
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// set views engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expresslayouts);
app.set('layout','layouts/layout')

//page routes
app.use("/admin", adminRoute);
app.use("/programs", program_routes);
app.use("/TourPage", tourPageRoutes);
app.use("/reservation", reservationRoutes);
app.use("/tourBooking", tourBookingsRoutes)
app.use("/login", loginRoute)


// index page route
app.get("/", (req, res) => {
  let sql = "SELECT * FROM dolphincove.programs";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("index.ejs", {
      programs: rows,
      layout: 'layouts/loginLayout'
    });
  });
});


// app.post('/auth',(req,res)=>{
//     let fname = req.body.fname;
//     let lname = req.body.lname;
//     let email = req.body.email;
//     let password = req.body.password;
//     let admin = req.body.adminRole;
//     let authQuery = 'SELECT * FROM admins WHERE fname = ? AND lname = ? AND email = ? AND password = ? AND admin_type = ?'

//     db.query(authQuery,[fname,lname,email,password,admin],(err,rows)=>{
//         if(err) throw err;

//         if(rows.length > 0){
//             req.session.loggedIn = false
//             res.redirect('login.ejs')
//         } else{
//             req.session.loggedIn = true
//             req.session.admin_id = rows[0].id
//             req.session.fname = rows[0].fname
//             req.session.lname = rows[0].lname
//             req.session.email = rows[0].email
//             req.session.password = rows[0].password
//             res.redirect('tourPage.ejs')
//         }
//     })
// })

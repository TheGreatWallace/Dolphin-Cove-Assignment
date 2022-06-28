const express = require('express');
const router = express.Router();
const db = require('../lib/database');


router.get("/", (req, res) => {
  if(req.session.loggedIn === true && req.session.adminRole === 2){
    res.render("reservations.ejs",);
  }else{
    res.redirect('/tourBooking')
  }
    
  });

  router.get('/form',(req,res)=>{
    res.render('reservations.ejs',{
      layout: 'layouts/loginLayout'
    })
  })


  router.get('/publicView',(req,res)=>{
    res.render('reservations.ejs',{
      layout: 'layouts/loginLayout'
    })
  })
  
  router.post("/add", (req, res) => {
    let data = {
      frst_name: req.body.fname,
      last_name: req.body.lname,
      dob: req.body.dateOfBirth,
    };
    let sql = "INSERT INTO guests SET?";
    db.query(sql, data, (err, rows) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        let sql = `SELECT * FROM dolphincove.guests WHERE id="${rows.insertId}"`;
        db.query(sql, (err2, rows2) => {
          console.log(rows.insertId);
          if (err) {
            res.sendStatus(500);
            console.log(err2);
          } else {
            let g_id = rows.insertId;//This gets the last id input made in the guest table
            let data = {
              hotel_id: req.body.hotels,
              tour_company_id: req.body.tourCompanies,
              check_in: req.body.checkIn,
              check_out: req.body.checkOut,
              payment_status: req.body.paymentTypes,
              program_id: req.body.programChosen,
              guest_id: g_id,
            };
            let sql = `INSERT INTO bookings SET?`;
            db.query(sql, data, (err, results) => {
              if (err) {
                res.sendStatus(500);
                console.log(err);
              } else {
                res.redirect("/");
              }
            });
          }
        });
      }
    });
  });
  
  //Route to view reservations for the public
  router.get("/view", (req, res) => {
    let sql =
      "SELECT gt.frst_name,gt.last_name,bk.check_in,pr.namee AS Program_Name FROM dolphincove.guests gt, dolphincove.bookings bk, dolphincove.programs pr WHERE pr.id = bk.program_id;";
      db.query(sql,(err,results)=>{
        if(err){
          res.sendStatus(500);
          console.log(err)
        }else{
          res.render('view_reservations.ejs',{
              reservations: results
          })
        }
      })
  });



module.exports=router;
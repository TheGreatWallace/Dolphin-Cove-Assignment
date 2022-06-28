const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = express.Router();
const db = require("../lib/database");

//Tour Booking form
router.get('/',(req,res)=>{
    res.render('tour_booking_form.ejs')
})


router.get('/view',(req,res)=>{
    let sql = 'SELECT * FROM dolphincove.tour_bookings';
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }else{
            res.render('tour_bookings.ejs',{
                bookings: results
            })
        }
    })
})


router.get('/form',(req,res)=>{
    res.render('tour_booking_form.ejs',{
        layout: 'layouts/loginLayout'
    })
})


router.post('/add',(req,res)=>{
    let data = {
        fname: req.body.fname,
        lname: req.body.lname,
        pickup_time: req.body.pickup,
        tour_company: req.body.tour_companies,
        address: req.body.address,
        phone_number: req.body.contact
    }
    let sql = 'INSERT INTO dolphincove.tour_bookings SET?'
    db.query(sql,data,(err,results)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/tourBooking/view')
        }
    })
})


router.get('/editview',(req,res)=>{
    let sql = 'SELECT * FROM dolphincove.tour_bookings';
    db.query(sql,(err,results)=>{
        if(err){
            console.log(err)
        }else{
            res.render('tour_booking_edit.ejs',{
                bookings: results
            })
        }
    })
})


router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM tour_bookings WHERE id = ${id}`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      res.render("tour_booking_edit_form.ejs", {
        booking: rows[0]
      });
    });
  });

  router.post('/update',(req,res)=>{
    let id = req.params.id;
    let data = {
        fname: req.body.fname,
        lname: req.body.lname,
        pickup_time: req.body.pickup_time,
        tour_company: req.body.tour_companies,
        address: req.body.address,
        phone_number: req.body.contact
    }
    let sql = `UPDATE INTO dolphincove.tour_bookings SET WHERE id = ${id}`
    db.query(sql,data,(err,results)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/view')
        }
    })
})



router.get("/delete/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM dolphincove.tour_bookings WHERE id = ${id}`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/view");
      }
    });
  });




module.exports=router;
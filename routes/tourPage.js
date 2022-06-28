const express = require('express');
const router = express.Router();
const db = require('../lib/database')


router.get("/", (req, res) => {
    let sql = "SELECT * FROM dolphincove.tour_companies";
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.render("tourPage.ejs", {
        companies: results,
      });
    });
});


// Edit route for a specific tour company this is where the data to be editted is requested
router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM dolphincove.tour_companies WHERE id = ${id}`;
    db.query(sql, (err, rows) => {
      if (err) throw err;
      res.render("tourPage_edit", {
        company: rows[0],
      });
    });
  });
  
  // Update route for a specific tour company
  router.post("/update/:id", (req, res) => {
    let id = req.params.id;
    let data = {
      name: req.body.company,
      voucher_number: req.body.voucher_number,
    };
  
    let sql = `UPDATE tour_companies SET? WHERE id = ${id}`;
    db.query(sql, data, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });
  
  // Delete route for a specific tour company
  router.get("/delete/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM dolphincove.tour_companies WHERE id = ${id}`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/TourPage");
      }
    });
  });
  
  // ADD route for a tour company
  router.post("/add", (req, res) => {
    let data = {
      name: req.body.company,
      voucher_number: req.body.voucher_number,
    };
  
    let sql = `INSERT INTO tour_companies SET?`;
    db.query(sql, data, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  });

module.exports=router
const express = require("express");
const router = express.Router();
const db = require("../lib/database");

//index route for programs page
router.get("/", (req, res) => {
  if (req.session.loggedIn === true && req.session.adminRole === 2) {
    let sql = "SELECT * FROM dolphincove.programs";
    db.query(sql, (err, rows) => {
      res.render("programs.ejs", {
        programs: rows,
        title: "Programs Page",
      });
    });
  } else {
    res.redirect("/reservation");
  }
});

//Edit route for programs page
router.get("/edit/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM programs WHERE id = ${id}`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("program_edit", {
      programs: rows[0],
    });
  });
});

//update route for programs page
router.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let newData = {
    name: req.body.programName,
    cost: req.body.cost,
    description: req.body.description,
  };
  let sql = `UPDATE INTO programs SET? WHERE id = ${id}`;
  db.query(sql, newData, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/programs");
    }
  });
});

//delete route for programs page
router.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM dolphincove.programs WHERE id = ${id}`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/programs");
    }
  });
});

module.exports = router;

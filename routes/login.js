const express = require('express');
const router = express.Router();
const db = require("../lib/database");


router.get('/',(req,res)=>{
    res.render('login',{
    layout: 'layouts/loginLayout'})
})

router.post('/login', (req,res)=>{
    let sql=`SELECT * FROM admins WHERE fname="${req.body.fname}" AND lname="${req.body.lname}" AND email="${req.body.email}" AND password="${req.body.password}" AND admin_type = "${req.body.adminRole}"`

    db.query(sql,(err,rows)=>{
        if(err) throw err
        if(rows.length > 0 && req.body.adminRole ==2){
            req.session.loggedIn=true;
            req.session.adminRole=2;
            res.redirect('/programs')
        }
        if(rows.length > 0 && req.body.adminRole ==1){
            req.session.loggedIn=true;
            res.session.adminRole=1;

        }
        if(rows.length <= 0){
            res.redirect('/login')
        }
    })
})


router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
})

module.exports=router;

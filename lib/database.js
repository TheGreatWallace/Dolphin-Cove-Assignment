
 const mysql = require('mysql');

const db = mysql.createConnection({
   host:'localhost',
   database:'dolphincove',
   password:'root',
   user:'root',
   dateStrings:true
})

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Database Connected!!')
    }
})


module.exports=db
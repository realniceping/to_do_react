const express = require("express");
const mysql = require("mysql")
const cors = require("cors");
const { preProcessFile, isRegularExpressionLiteral } = require("typescript");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Pegoun337",
    database: "tododb"
})


const port = 3001;
const app = express();

app.use(express.json())
app.use(cors())


app.get("/status", (req, res) => {
    res.json({status: "working"})
})

app.post("/api/post", (req, res) => {
    if(req.body.do_title && req.body.do_body){
        const sql = `INSERT INTO todo_list(do_title, do_body, do_done) VALUES ("${req.body.do_title}", "${req.body.do_body}", 0);`
        console.log("post going...");
        pool.query(sql, (err, success) => {if(err){console.log(err)}else{console.log(success);}});
        res.send("success posted")
    }else{
        res.send("requerst must be json and contain do_title and do_body fields")
    }
    
})

app.get("/api/get", (req, res) => {
    const sql = `SELECT * FROM todo_list`
    pool.query(sql, (err, result) => {
        res.json(result)
    })
})

app.post("/api/delete", (req, res) => {
    const sql = `DELETE FROM todo_list WHERE id=${req.body.do_id}`
    pool.query(sql, (err, result) => {
        if(err) console.log(err);
        else{
            res.json(result)
        }
    })
})

app.post("/api/change/todone", (req, res) => {
    const sql = `UPDATE todo_list SET do_done = 1 WHERE id = ${req.body.do_id};` 
    pool.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })

})

app.post("api/change/toundone", (req, res) => {
    console.log("im here");
    const sql = `UPDATE todo_list SET do_done = 0 WHERE id = ${req.body.do_id};` 
    pool.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.json(result)
        }
    })
})

app.listen(port, () => {console.log(`server running in port ${port}`);})


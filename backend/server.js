const express=require("express");
const cors=require("cors");
const mysql=require("mysql");

const app=express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
})

app.get("/",(req,res)=>{
    const sql="SELECT * FROM sms";
    db.query(sql,(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/signup',(req,res)=>{
    const sql="INSERT INTO signup(`username`,`email`,`password`) VALUES (?)";
    const values=[
        req.body.username,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})
app.post('/create',(req,res)=>{
    const sql="INSERT INTO sms(`name`,`avggrade`,`dob`,`age`,`dept`,`rollno`,`address`,`section`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.avggrade,
        req.body.dob,
        req.body.age,
        req.body.department,
        req.body.rollno,
        req.body.address,
        req.body.section
    ]
    db.query(sql,[values],(err,data)=>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM sms WHERE id=?";
    const id = [req.params.id];
    db.query(sql, id, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.listen(8081, ()=>{
    console.log("listening");
})

import express from "express";

const app = express() ; 

app.get('/',(req,res)=>{
    res.send('Server started') ;
})

app.listen(3000,()=>{
    console.log('Server started on port 3000');
}) ;
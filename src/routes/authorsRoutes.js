const express=require('express');
const router=express.Router();
const db=require("./../../config/connection")
const {store1,isAuth}=require("./../../config/auth")
const session=require("express-session")

router.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false,
    store:store1
}))


const print=(data)=>{
    router.get('/',isAuth,(req,res)=>{
        db.authordetails.find()
        .then((datas)=>{
            console.log(datas);
            res.render('authors',{data,datas});
        })
       
    })

    router.get('/:id',isAuth,(req,res)=>{
        let auth_id=req.params.id
        res.render('authors_readmore',{data,auth_id});
    })


  
    //*****end
    return router;
    
    
}
module.exports=print;

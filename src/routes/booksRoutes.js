const express=require('express');
const res = require('express/lib/response');
const router=express.Router();
const db=require("./../../config/connection")
const {store1,isAuth}=require("./../../config/auth")
const session=require("express-session")

const print=(data)=>{

    router.use(session({
         secret:"key",
         resave:false,
         saveUninitialized:false,
         store:store1
    }))
    router.get('/',isAuth,(req,res)=>{
        db.bookdetails.find()
        .then((datas)=>{
            console.log(datas);
            res.render('books',{data,datas});
        })
       
    })
    router.get('/:id',(req,res)=>{
        let bid=req.params.id;
        console.log(bid)
            //db.bookdetails.find({_id:book_id}).then((datas)=>{
           // console.log(data);
            //res.render('books_readmore',{data,datas});
           // })
        //res.render('books_readmore',{data,book_id});
    })
    router.get("/edit_book/get/:id",isAuth,(req,res)=>{
        let bid=req.params.id;
        res.render("edit_book",{data,bid});
      })
    
    router.post('/editbook/update',(req,res)=>{
      
        const book_id=req.body.bk_id;
        let   editedBook={
                            name:req.body.book_name,
                            author:req.body.book_author,
                            category:req.body.book_category,
                            img:req.body.book_img   
        }

        //console.log(editedBook);
        db.bookdetails.updateOne({_id:book_id},
         {$set:{
                name:req.body.book_name,
                author:req.body.book_author,
                category:req.body.book_category,
                img:req.body.book_img   
         }} )            
          .then((e)=>{
                console.log(e);
                res.redirect('/books');
                console.log(editedBook);
          })    });      
  
        
   

    router.get("/delete_book/dlt/:id",(req,res)=>{
        let book_id=req.params.id;
        console.log(book_id);
        db.bookdetails.deleteOne({_id:book_id})
        .then((e)=>{
            res.redirect('/books')
        })})
        

        router.get('/show_author_books/geta/:a_name',(req,res)=>{
            let auth_name=req.params.a_name;
            console.log(auth_name.replace(/[^a-zA-Z ]/g,''));
            //res.redirect('/books');
            db.bookdetails.find({author:auth_name}).then((datas)=>{
                console.log(data);
                res.render('books',{data,datas});
            })
            
           // res.render('show_author_books',{data,auth_name});
        })
      





    return router;
}
module.exports=print;





const express=require("express");
const { request } = require("http");
const path=require("path")
const session=require("express-session")
const mongodbSession=require("connect-mongodb-session")(session)
const app=new express();
const db=require('./config/connection')
const bodyParser=require('body-parser');
const { error } = require("console");
const {store1,isAuth}=require('./config/auth')




app.use(express.static("public"))
app.set('view engine',"ejs")
app.set('views','./src/views')



app.use(express.urlencoded({extended:true}))
app.use(session({
  secret:"key",
  resave:false,
  saveUninitialized:false,
  store:store1
}))


const data={
    
 books:     [{
            name:"Tom and Jerry",
            author:"Joseph Babera",
            category:"Cartoon",
            img:"tom.jpg"
            },
            {
            name:"Harry Potter",
            author:"J K Rowling",
            category:"Fiction",
            img:"harry.jpg"
            },
            {
            name:"'pathummayude aadu'",
            author:"basheer",
            category:"novel",
            img:"pathumma.jpg"
            },
            {
            name:"Tempest",
            author:"Shakespere",
            category:"Drama",
            img:"tempest.jpg"
            }],
navitems:[{
            
           link:"books",
           title:"Books"
          },
          {
            
           link:"authors",
           title:"authors"
          }
         ,
         {
           
          link:"add_book",
          title:"Add Book"
         },
         {
           
          link:"add_author",
          title:"Add Author"
         }
        ]
    
};

const authorDetails={
    authors:[{

            id:1,
            name:"Joseph Babera",
            about:"Joseph Babera is an American writer and cartoonist",
            works:"Micky mouse,Cinderella, Sleeping Beauty are some important works",
            img:"bar.jpg"
            },
            {

                id:2,
                name:"JK Rowling",
                about:"JK Rowling is an American novelist ",
                works:"Harry Potter and the Philosophers Stone,Harry Potter and the Fantastic Beasts,Harry Potter and the Prisoner of Askaban etc",
                img:"jk.jpg"
                },
                {

                    id:3,
                    name:"Vaikom Muhammed Basheer",
                    about:"Basheer is a malayalam writer ",
                    works:"Balyakalasakhi,Premalekhanam,Ntuppooppakkoranandernnu, Mathilukal",
                    img:"basheer.jpg"
                    },
                    {

                        id:4,
                        name:"William Shakespere",
                        about:"Shakespere is an English Play writer and father of English Literature",
                        works:"Hamlet,Macbeth",
                        img:"shake.jpg"
                        }

        ],
        navitems:[{
            
            link:"books",
            title:"Books"
           },
           {
             
            link:"authors",
            title:"authors"
           }
  
          ]
    }

const booksRouter=require("./src/routes/booksRoutes")(data);
const authorsRouter=require("./src/routes/authorsRoutes")(data,authorDetails);


//const db=require("./config/connection")

app.use("/books",booksRouter);

app.use("/authors",authorsRouter);



//setting ejs layout
//app.set('view engine','ejs')

//setting the view directory to src/views
//app.set('views','./src/views')

//routing process
app.get("/",(req,res)=>{
    res.render("index",{data});
})


app.get("/add_book",isAuth,(req,res)=>{
  res.render("add_book",{data});
})
//New route for Form
app.post("/add_book/get",(req,res)=>{
 // res.render("add_book",{data});
 let bookdet = {
               name:req.body.book_name,
               author:req.body.book_author,
               category:req.body.book_category,
               img:req.body.book_img
              }
   let books = db.bookdetails(bookdet);
books.save();
res.redirect('/books');
console.log(bookdet);

})

app.get("/add_author",(req,res)=>{
  res.render("add_author",{data});
})
app.post("/add_author/get",(req,res)=>{
  // res.render("add_book",{data});
  let authdet = {
                name:req.body.author_name,
                occupation:req.body.author_occupation,
                about:req.body.author_about,
                img:req.body.author_img
               }
    let authors = db.authordetails(authdet);
    authors.save();
 res.redirect('/authors');
 console.log(authdet);
 
 })


app.get("/signUp",(req,res)=>{
  res.render("signUp",{data});
})
app.post("/signUp/get",(req,res)=>{
  let userdet = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    user_pwd:req.body.user_pwd,
    user_email:req.body.user_email,
    user_mob:req.body.user_mob
   }
let users = db.userdetails(userdet);
users.save();
res.redirect('/login');
//console.log(userdet);

})

app.get("/login",(req,res)=>{
  res.render("login",{data});
})

app.post("/login/add",(req,res)=>{
 let user_name=req.body.user_name;
 let password=req.body.user_pwd;
 //db.userdetails.find()
 
 db.userdetails.find()
 .then((e)=>{
 
            for(let i=0;i<e.length;i++){
              if(user_name===e[i].user_email&&password===e[i].user_pwd){
                req.session.isAuth=true;
                res.redirect('/books');
              }
              //console.log(e);
              console.log('Login failed');
              //res.redirect('/logout');
            }
      })
 });
 app.get("/logout",(req,res)=>{
   req.session.destroy((error)=>{
     if(error){
      throw error;
     }
     res.redirect("/login")
   })
  
})

app.listen(8083)
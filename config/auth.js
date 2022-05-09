const session=require("express-session")
const mongodbSession=require("connect-mongodb-session")(session)

const isAuth=(req,res,next)=>{
    if(req.session.isAuth){

     next()
    }
   else
  {
    res.redirect("/login")
  }

}
const store1=new mongodbSession({
    uri:"mongodb://localhost:27017/LibraryApp",
    collection:"my_session"
  })

  module.exports={
      store1,
      isAuth
  }
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LibraryApp');//Database name
const schema = mongoose.Schema;
const bookschema = new schema({
    name: String,
    author: String,
    category: String,
    img: String
});
 const authorschema = new schema({
    name: String,
    occupation: String,
    about: String,
    img: String
 })

 const userschema=new schema({
     first_name:String,
     last_name:String,
     user_pwd:String,
     user_email:String,
     user_mob:String    

 })

//const authordetails = mongoose.model('authordetails', authorschema);
//const bookdetails = mongoose.model('bookdetails', bookschema);
const db={
    authordetails: mongoose.model('authordetails', authorschema),
    bookdetails:mongoose.model('bookdetails', bookschema),
    userdetails:mongoose.model('userdetails',userschema)
}
module.exports =  db ;
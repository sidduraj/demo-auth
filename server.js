
const express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var ejs = require('ejs');
const path = require('path');


const app = express()
const port = 3000


const MONGO_URL = "mongodb+srv://siddu:Siddu%40123@cluster0.gjp169q.mongodb.net/DemoAuth?retryWrites=true&w=majority"

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: MONGO_URL })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	
  
// this is used to enable server to read json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String
  });
const User = mongoose.model('User', userSchema);


main().catch(err => console.log(err));


async function main() {
  await mongoose.connect(MONGO_URL);
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//routes

app.get('/signup',(req, res)=>{
    return res.render('signup.ejs');
})

app.post('/signup',(req,res)=>{
    console.log(req.body);

    const user = new User(req.body);
    user.save(function(err, _){
        if(err)
            console.log(err);
        else
            console.log('Success');
    });

    res.send('asdfasd')
})


app.get('/login',(req, res)=>{
    User.findOne(
        {_id:req.session.userId},
        function(err,data){
            if(data){
                return res.redirect('/')
                //return res.send('login successfull go <a href="/">home</a>')
            } else {
                return res.render('login.ejs');
            }
        }
    )
})

app.post('/login',(req,res)=>{

    User.findOne({email:req.body.email},function(err,data){
		if(data){
			console.log(data)
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data._id;
				console.log(req.session.userId);
				return res.send({"Success":"Success!"});
                //return res.redirect('/');
				
			}else{
				return res.send({"Success":"Wrong password!"});
			}
		}else{
			return res.send({"Success":"This Email Is not regestered!"});
		}
	});
})


//start the server on given port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




app.get('/',(req, res)=>{
    User.findOne(
        {_id:req.session.userId},
        function(err,data){
            if(data){
                return res.send(data.userName)
            } else {
                return res.redirect('/login');
                //return res.send('please <a href="/login">login</a>')
            }
        }
    )
})
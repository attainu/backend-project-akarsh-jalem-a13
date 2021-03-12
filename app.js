const express = require('express');
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 5000;
const cors = require('cors');
// const signUpValidation = require("./validators/bodyValidator");
// const signInValidation = require("./validators/bodyValidator");
const Job = require('./model/jobModel'); 
var jobRouter = require('./routes/job');

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./model/UserSchema');
const  session = require('express-session');
const auth = require('./controller/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'sess_secret', cookie: { maxAge: 60000 }}));
app.use(cors())

app.use('/',jobRouter)


app.set('view engine','hbs')

// app.get('/update',auth,async (req,res)=>{
    
//     let id = mongoose.Types.ObjectId(req.query.id)
//     let find = await Price.find({_id:id})
//     // console.log(find)
//     // console.log([...find[0]])
//     res.render('update',{
//         catogery:find[0].catogery,
//         amount:find[0].amount,
//         id:id
//     })
// })
// app.post('/update',auth,async (req,res)=>{
    
//     let id = mongoose.Types.ObjectId(req.query.id)
//     let find = await Price.find({_id:id})
//     // console.log(find)
//     // console.log([...find[0]])
//     find[0].catogery=req.body.catogery
//     find[0].amount=req.body.amount
//     await find[0].save()
//     res.redirect("/postjob")

// })


// app.get('/delete',auth,async(req, res)=>{
//     let id = mongoose.Types.ObjectId(req.query.id)
//     await Price.findOneAndRemove({_id:id})
//     res.redirect("/postjob")
// })

app.get('/signup',(req, res) =>{
    res.render('signup')
})
app.get("/cont",(req,res)=>{
    res.render("contact")

})

app.get('/alert',(req,res)=>{
    res.render("alert")
})
app.get("/mid",(req,res)=>{
    res.render("list")
})

app.get("/seek",(req,res)=>{
    res.render("seeker")
})

app.get("/",(req,res)=>{
    res.render("home")
})
app.get('/add',(req,res)=>{
    res.render("postjob")
})
app.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if (err) throw err;
    })
})
app.get('/signup',(req, res) =>{
    res.render('signup');
});
//user register
app.post('/signup',async(req,res) => {
    var hashpassword = bcrypt.hashSync(req.body.password,6);

    //verify email 
    var email =await User.findOne({email: req.body.email});
    if(email){
        return res.send('SORRY This email already registered');
    }
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lateName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hashpassword,
    },(err,user) => {
        if(err) throw err;
        res.status(200).render('login');
    });
});
app.get('/login',(req, res) =>{
    res.render('login');
});

app.post('/login',(req,res) => {
    User.findOne({phoneNumber:req.body.phoneNumber},(err,data) => {
        if(err) return res.status(500).send("Error while Login");
        if(!data) return res.send({auth:false,token:'No User Found Register First'});
        else{
            // compare password if user found
            // (userinput, password in db)
            const passIsValid = bcrypt.compareSync(req.body.password,data.password);
            // if password not match
            if(!passIsValid) return res.redirect('/login');
            // generate token
            // (tell on which unqiue key, secret, expire time(3600 1 hrs))
            req.session.email=data.email
            req.session.userID=data._id
            return res.render('list')
            
    
        }
    })

})


// app.get('/signup',(req, res) =>{
//     res.render('signup')
// })
// app.post('/signup',async (req,res)=>{
//     var hashpassword = bcrypt.hashSync(req.body.password,8);
//     var hashpasswordConfirmation = bcrypt.hashSync(req.body.passwordConfirmation,8);
//     var user = await User.findOne({email:req.body.email});
//     if(user){
//         res.status(400).send("user already exist");
//     }else{
//     User.create({
//         firstname:req.body.firstname,
//         lastname:req.body.lastname,
//         email:req.body.email,
//         phone:req.body.phone,        
//         password:hashpassword,
//         passwordConfirmation:hashpasswordConfirmation
        
//     },(err,user)=>{
//         if(err) throw err;
//         res.status(200).redirect('/login')
        
        
//     })}
// })
// app.get('/login',(req, res) =>{
//     res.render('login')
// })

// app.post('/login',async (req, res)=>{
//         console.log(req.body)
//         User.findOne({email:req.body.email},(err,data) => {
//         if(err) return res.status(500).send("Error while Login");
//         // in case user not found
//         console.log(data);
//         if(!data) return res.redirect('/login');
//         else{
//             // compare password if user found
//             // (userinput, password in db)
//             const passIsValid = bcrypt.compareSync(req.body.password,data.password);
//             // if password not match
//             if(!passIsValid) return res.redirect('/login');
//             // generate token
//             // (tell on which unqiue key, secret, expire time(3600 1 hrs))
//             req.session.email=data.email
//             req.session.userID=data._id
//             return res.render('list')
           
    
//         }
//     })

// })
app.get('/userDetail',auth ,(req, res) => {
    User.findOne({_id:req.session.userID},(e,d)=>{
        return res.json(d)
    })
})

app.listen(port,()=>{
    console.log("listening on port: 5000")
})
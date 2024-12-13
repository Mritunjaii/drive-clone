const express=require('express')
const userRoutes=require('./routes/user.routes')
const indexRouter=require('./routes/home.routes')
const app=express();
const connectToDB=require('./config/db')
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
dotenv.config();
connectToDB();
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(express.static("uploads"));


app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/',indexRouter);

app.use('/user',userRoutes);

app.listen(3000,()=>{
    console.log("Sever is on at 3000")
})
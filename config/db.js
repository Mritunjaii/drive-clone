const mongoose=require('mongoose');


function connectToDB(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected To DB");
    })
}
module.exports=connectToDB;
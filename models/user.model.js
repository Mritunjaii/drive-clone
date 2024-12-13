const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlenght:[3,'Username must have 3 or more char']
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true,
        minlenght:[13,'Plz Enter Vaild Email']
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlenght:[5,'password more 4']
    }
})

const user=mongoose.model('user',userSchema);

module.exports=user;
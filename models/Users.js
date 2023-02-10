const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true   
    },
    catchPhrase : {
        type : String,
        required : true,
        trim : true
    },
    bs : {
        type : String,
        required : true,
        trim : true
    }
})

const GeoSchema  = new mongoose.Schema({
    lat : {
        type : String,
        required : true,
        trim : true
    },
    lng : {
        type : String,
        required : true,
        trim : true
    }

})

const AddressSchema = new mongoose.Schema({
    street :  {
        type : String,
        required : true,
        trim : true
    },
    city :  {
        type : String,
        required : true,
        trim : true.valueOf,
        match : [/^[a-zA-Z\s]*$/, 'Only alphabets and space while entering city name' ]
    },
    suite :  {
        type : String,
        required : true,
        trim : true
    },
    zipcode :  {
        type : String,
        required : true,
        trim : true,
        match : [/[0-9]{5}-[0-9]{4}$/, 'f.	Zip code format must be like 12345-1234 ']
    },
    geo :  {
        type : GeoSchema,
        required : true
    }
})

const UserSchema = new mongoose.Schema({
username:{
    type : String,
    required : [true, 'Please enter your username'],
    trim : true,
    lowercase : true,
    minlength : 4
},
name:{
    type : String,
    required : [true, 'Please enter your name'],
    trim : true,
    lowercase : true
},
email:{
    type : String,
    required : [true, 'Please enter your email'],
    trim : true,
    lowercase : true,
    unique : true,
    // validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
address:{
    type : AddressSchema,
    required : true  
},
phone:{
    type : String,
    required : [true, 'Please enter your phone'],
    trim : true,
    match : [/[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/ , 'phone format like 1-123-123-1234 ']
},
website:{
    type : String,
    required : [true, 'Please enter your website'],
    match : [/[(http|https):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, "please enter valid URL"]
},
company : {
    type : CompanySchema,
    required : true
}

})

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

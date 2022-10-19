const mongoose = require('mongoose');

const con ="mongodb://sourav:789@ac-se3lvco-shard-00-00.isad8gs.mongodb.net:27017,ac-se3lvco-shard-00-01.isad8gs.mongodb.net:27017,ac-se3lvco-shard-00-02.isad8gs.mongodb.net:27017/ansportal?ssl=true&replicaSet=atlas-8tg3ip-shard-0&authSource=admin&retryWrites=true&w=majority"

const connectDB=()=>{
    //return mongoose.connect('mongodb://localhost:27017/admission_website') //Database name admission_website
    return mongoose.connect(con)
    .then(()=>{
        console.log('Connection Sucessfully')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports= connectDB
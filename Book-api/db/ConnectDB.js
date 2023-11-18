const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const connectDb = () =>{
    return mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected successfully");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = connectDb
const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/newsfetcher?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to database');
}).catch((error) => {
    console.log(error)
    console.log('error occured with db');
})
//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false
// Dependencies
const express = require('express');
const { connectDB } = require('./mongoDb');
const postHandler = require('./routes/postHandler');



// Initialize express
const app = express();



// middleware
app.use(express.json());
app.use('/post', postHandler);






// client.db('mydb').collection('user').find().toArray((err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result);
//     }
// })






// Server listen
app.listen(3000, () => {
    console.log("Server hav been running on port" + " " + 3000);
    connectDB().catch(err => console.log(err));
})
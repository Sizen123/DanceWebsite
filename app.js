const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contact');
}

const port = 4000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    email: String,
    phone: String
  });

const Contact = mongoose.model('Contact', contactSchema);



// Express Stuff
app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded({ extended: true })); //middleware help us to send form data to express

// Pug Stuff
app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//EndPoints
app.get('/', (req,res)=>{
    const params= {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req,res)=>{
    const params= {};
    res.status(200).render('contact.pug', params);
}),

app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This items has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saaved to the database")
    });

    // res.status(200).render('contact.pug');
});

// Start the server
app.listen(port, ()=>{
    console.log(`The application is started succesfuly on port ${port}`);
});
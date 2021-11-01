//making the project ideas website
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const port = 8080;
const fs = require('fs');

//mongoose specific stuff
// getting-started.js
mongoose.connect('mongodb://localhost:27017/projectidea', {useNewUrlParser: true, useUnifiedTopology: true});

//making schema
//projectideaschema is the variable
const projectideaschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('contactinformations', projectideaschema);
  //contact is the model and contacts is the collections

//express specific stuffs
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//pug specific stuffs
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

//serving files html pages
app.get('/',(req,res)=>{
    const params ={}
    res.status(200).render('home.pug',params)
})

app.get('/about',(req,res)=>{
    const params ={}
    res.status(200).render('about.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params)
})
app.get('/services',(req,res)=>{
    const params ={}
    res.status(200).render('services.pug',params)
})

//saving the input in our data base
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body)
    myData.save().then(()=>{
        res.send("You information has been sucessfully stored")
        //if the errors happens 
    }).catch(()=>{
        res.status(400).send("Error Went something wrong")
    });
})

//listing the port
app.listen(port,()=>{
    console.log(`The application has been sucessfully started on ${port}`)
})



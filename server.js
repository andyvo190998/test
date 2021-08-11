const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 30001;

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongoose
mongoose.connect('mongodb+srv://crudoperation:andy123456789@cluster0.5q6ao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

//define schema
const itemSchema = {
    title: String,
    description: String
}

//define mongoose model
const Item = mongoose.model('Item', itemSchema);

//get item route
app.get("/items", (req, res) => {
    Item.find()
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  });

//create route
app.post('/newitem', (req, res)=> {
    const newItem = new Item ({
        title: req.body.title,
        description: req.body.description
    })
    newItem.save()
    .then((item) => console.log(item))
    .catch((err) => res.status.apply(400).json('error' + err));
})

//connect to server
app.listen(port, ()=> {
    console.log('hello world');
})
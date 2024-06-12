const express = require('express');
const bodyParser = require('body-parser');
const { addItem, getItems, getItemById, updateItemById, deleteItemById } = require('./items');

const app = express();
const port = 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

// Endpoint Add
app.post('/items', (req, res) => {
    const { name, price, qty } = req.body;
    const item = addItem(name, price, qty);
    res.json(item);
});

// Endpoint Get
app.get('/items', (req,res) => {
    res.json(getItems());
});

// Endpoint GetById
app.get('/items/:id', (req,res) => {
    const item = getItemById(Number(req.params.id));
    if(item) {
        res.json(item);
    } else {
        res.status(404).send('Not Found');
    }
});

// Endpoint UpdateById
app.put('/items/:id', (req,res) => {
    const { name, price, qty } = req.body;
    const item = updateItemById(Number(req.params.id), name, price, qty);
    if(item) {
        res.json(item);
    } else {
        res.status(404).send('Not Found');
    }
});


// Endpoint DeleteById
app.delete('/items/:id', (req,res) => {
    const item = deleteItemById(Number(req.params.id));
    if(item) {
        res.json(item);
    } else {
        res.status(404).send('Not Found');
    }
})

// app.listen

app.listen(port, () => {
    console.log(`server berjalan di https://localhost/${port}`);
});

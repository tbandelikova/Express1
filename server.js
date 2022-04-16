const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const phonebookData = [];


app.post('/phonebook', function (req, res) {
  if (!req.body || !req.body.name || !req.body.number) {
    res.status(417).send(`Name & number is required`);
  } else {
    phonebookData.push(req.body);
    res.json(req.body);
  }
});

app.get('/phonebook', (req, res) => {
      res.json(phonebookData);
    } 
  );

app.get('/goods', (req, res) => {
  fs.readFile('./goods.json', 'utf8', (err, data) => {
        if (err) res.send(err);
        const goods = JSON.parse(data);
        const count = parseInt(req.query.count);
        const offset = parseInt(req.query.offset);
        if (!count || offset > 10) {
          res.json(goods);
        } else {
            res.json({ goods: goods.slice(offset, offset + count), count: goods.length });
        }
        
      } 
  );
});

app.get('/goods/:id', function (req, res) {
  fs.readFile('./goods.json', 'utf8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data)
      let good = goods.find(item => item.id.toString() === req.params.id.toString());
      if (!good) {
        res.status(404).send(`There is no good with id ${req.params.id}!`);
      } else {
        res.status(200).json(good);        
      }
      
    } else {
      console.error(err);
    }
  });
});

app.get('/empl', function (req, res) {
  fs.readFile('./employes.json', 'utf8', (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.error(err);
    }
  });
  
});

app.get('/empl/:id', function (req, res) {
  fs.readFile('./employes.json', 'utf8', (err, data) => {
    if (!err) {
      const employes = JSON.parse(data)
      let person = employes.find(item => item.id.toString() === req.params.id.toString());
      res.send(person);
    } else {
      console.error(err);
    }
  });
});

app.get('/card', (req, res) => {
  fs.readFile('./cards.json', 'utf8', (err, data) => {
      if (err) res.send(err);
      res.json(JSON.parse(data));
    } 
  );
});

app.get('/card/:id', function (req, res) {
  fs.readFile('./cards.json', 'utf8', (err, data) => {
    if (!err) {
      const cards = JSON.parse(data)
      let card = cards.find(item => item.id.toString() === req.params.id.toString());
      if (card && card.cardNumber) {
        res.send(`Card number: ${card.cardNumber}`);
      } else {
        res.send(`There is no card with id ${req.params.id}`);
      }
      
    } else {
      console.error(err);
    }
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
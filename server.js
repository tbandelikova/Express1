const express = require('express');
const app = express();
const fs = require('fs');

// employes = [
//   {"id": 1, "name": "Adam", "age": 22},
//   {"id": 2, "name": "Eve", "age": 21},
//   {"id": 3, "name": "Dino", "age": 100}
// ]

// app.get('/', function (req, res) {
//   res.send(employes);
// });

app.get('/', function (req, res) {
  fs.readFile('./employes.json', 'utf8', (err, data) => {
    if (!err) {
      console.log(data);
      res.send(data);
    } else {
      console.error(err);
    }
  });
  
});

app.get('/:id', function (req, res) {
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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
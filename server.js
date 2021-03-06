import express from 'express';
import path from 'path'

const app = express();

app.use(express.static('build'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);
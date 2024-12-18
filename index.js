const express = require('express');
const path = require('path');
const port = 3000;
const db = require('./config/db');
const BookStore = require('./modales/BookStore');

const app = express();

app.use(express.urlencoded())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))


app.get('/', async (req, res) => {
  let empData = await BookStore.find();
  res.render('home', {
    empData
  })
});
app.get('/view-more/:id', async (req, res) => {
  let empData = await BookStore.findById(req.params.id);
  console.log(empData);
  
  res.render('view-more', {
    empData
  })
});

app.post('/sendDeta', BookStore.uploadedAvatar, async (req, res) => {

  req.body.coverImage = await BookStore.imgPath + "/" + req.file.filename;

  await BookStore.create(req.body);

  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
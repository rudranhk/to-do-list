const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const tasksRoutes = require('./routes/tasks');
const Task = require('./models/Task');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use('/tasks',tasksRoutes);

app.engine('hbs',exphbs.engine({extname : '.hbs'}));
app.set('view engine','hbs');
app.set('views', __dirname + '/views');

mongoose.connect('mongodb://localhost:27017/todoapp');

app.get('/' , async(req, res) =>{
    const tasks = await Task.find();
    res.render('index',{tasks});
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
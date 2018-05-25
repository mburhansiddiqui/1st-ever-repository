const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials' )

app.use((req,res,next)=>{
var now = new Date().toString();
var log = now+req.method+req.url ;
console.log(log);
fs.appendFileSync('server.log' , log + '\n');
next();
});

// app.use((req,res,next)=>{
//   res.render('maintain.hbs');
// });

hbs.registerHelper('getcurrentyear' , ()=> {
  return new Date().getFullYear()
});

hbs.registerHelper('screamit' , (text)=> {
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  // res.send('<h1>hello world</h1>');
  res.send({
    name: 'Burhan' ,
    likes : ['biking', 'cities']
  });
});
app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pagetitle: 'About Page',
    welcomemessage : 'Welcome to my Website'
  })
});

app.get('/about' , (req,res) => {                   // res.send('About Page')
  res.render('about.hbs',{
  pagetitle: 'About Page',
});
  ;
});
app.listen(port,()=>{
  console.log("Server Running on PORT "+ port);
});

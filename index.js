const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname:'hbs'
})

app.engine('hbs', hbs.engine)
//set extname
app.set('view engine', 'hbs')
//set dirname
app.set('views', 'views')

app.get('/', (req,res,next)=>{
    res.status(200).render('index')
})

app.get('/about', (req,res,next)=>{
    res.status(200).render('about')
})




const PORT = 3000 || process.env.PORT

app.listen(3000, ()=>{
    console.log(`Server started on port: ${PORT}`)
})
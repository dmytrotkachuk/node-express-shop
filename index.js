const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname:'hbs'
})

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

app.engine('hbs', hbs.engine)
//set extname
app.set('view engine', 'hbs')
//set dirname
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// app.use(express.json())
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)



const PORT = 3000 || process.env.PORT

app.listen(3000, ()=>{
    console.log(`Server started on port: ${PORT}`)
})
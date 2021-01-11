const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname:'hbs'
})

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')

app.engine('hbs', hbs.engine)
//set extname
app.set('view engine', 'hbs')
//set dirname
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)
app.use('/cart', cartRoutes)

const MONGO_URI = 'mongodb+srv://dmytro:7IDhTnkz6w0kWH5K@cluster-shop.0g0se.mongodb.net/test'

const PORT = 3000 || process.env.PORT

async function start (){
    try {
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true
        })
        console.log('DB connected')
    } catch (e) {
        console.log(e)
    }
}

start()


app.listen(3000, ()=>{
    console.log(`Server started on port: ${PORT}`)
})
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express()

const hbs = expressHandlebars.create({
    defaultLayout: 'main',
    extname:'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')
const UserModel = require('./models/user')

// app.engine('handlebars', hbs.engine)
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
//set dirname
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))

app.use(async (req,res,next)=>{
    try{
        const user = await UserModel.findById('5ffef3dd63a5ea2191e4c31f')
        req.user = user
        next()
    }catch (err){
        console.log(err)
    }
})

//Routes
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)
app.use('/cart', cartRoutes)

const MONGO_URI = 'mongodb+srv://dmytro:7IDhTnkz6w0kWH5K@cluster-shop.0g0se.mongodb.net/shop'

const PORT = 3000 || process.env.PORT

async function start (){
    try {
        await mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('DB connected')

        const candidate = await UserModel.findOne()
        if(! candidate){
            const user = new UserModel({
                email:'dmytrotkachuk.dev@gmail.com',
                name:'Dmytro',
                cart: {items: []}
            })

            await user.save()
        }

        app.listen(3000, ()=>{
            console.log(`Server started on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()


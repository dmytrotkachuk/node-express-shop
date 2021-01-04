const {Router} = require('express')
const router = new Router()


router.get('/', (req,res,next)=>{
    res.render('index',{
        title:'Home Page',
        isHome:true
    })
})

module.exports= router
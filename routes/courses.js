const {Router} = require('express')
const router = new Router()

router.get('/', (req,res,next)=>{
    res.render('courses',{
        title:'Courses',
        isCourses: true
    })
})

module.exports= router
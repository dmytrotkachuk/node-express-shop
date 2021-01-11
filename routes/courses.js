const {Router} = require('express')
const Course = require('../models/course')
const router = new Router()

router.get('/', async(req,res,next)=>{
    try {
    const courses = await Course.find()
        res.render('courses',{
            title:'Courses',
            isCourses: true,
            courses
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async(req,res)=>{
    try {
        const course = await Course.findById(req.params.id)
        res.render('course',{
            layout:'empty',
            title: `Course ${course.title}`,
            course
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id/edit', async (req,res)=>{
    if (!req.query.allow){
        res.redirect('/')
    }
    try{
        const course = await Course.findById(req.params.id)

        res.render('course-edit',{
            title:`Edit the ${course.title}`,
            course
        })
    } catch (err) {
        console.log(err)
    }
})


router.post('/edit', async (req,res)=>{
    try{
        const {id} = req.body
        delete req.body.id
        await Course.findByIdAndUpdate(id, req.body, )
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})


module.exports= router
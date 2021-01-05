const {Router} = require('express')
const Course = require('../models/course')
const router = new Router()

router.get('/', async(req,res,next)=>{
    const courses = await Course.getAll()
    res.render('courses',{
        title:'Courses',
        isCourses: true,
        courses
    })
})

router.get('/:id', async(req,res)=>{
    const course = await Course.getById(req.params.id)
    res.render('course',{
        layout:'empty',
        title: `Course ${course.title}`,
        course
    })
})

router.get('/:id/edit', async (req,res)=>{
    if (!req.query.allow){
        res.redirect('/')
    }

    const course = await Course.getById(req.params.id)

    res.render('course-edit',{
        title:`Edit the ${course.title}`,
        course
    })
})


router.post('/edit', async (req,res)=>{
    await Course.update(req.body)
    res.redirect('/')
})


module.exports= router
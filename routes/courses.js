const {Router} = require('express')
const CourseModel = require('../models/course')
const router =  Router()

router.get('/', async(req,res,next)=>{
    try {
    const courses = await CourseModel.find()
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
        const course = await CourseModel.findById(req.params.id)
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
        const course = await CourseModel.findById(req.params.id)

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
        await CourseModel.findByIdAndUpdate(id, req.body, )
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})

router.post('/remove', async (req,res)=>{
    try{
        await  CourseModel.findByIdAndDelete(req.body.id)
        res.redirect('/courses')
    } catch (err) {
        console.log(err)
    }

})

module.exports= router
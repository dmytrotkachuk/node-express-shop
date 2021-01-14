const {Router} = require('express')
const router =  Router()
const Course = require('../models/course')

router.get('/', (req,res)=>{
    res.status(200).render('add', {
        title:'Add Course',
        isAdd:true
    })
})

router.post('/', async(req,res)=>{
    const {title, price, img} = req.body
    const course  = new Course({
        title,
        price,
        img,
        userId: req.user._id
    })
    try{
        await course.save()
        res.redirect('/courses')
    }catch (err) {
        console.log(err)
    }

})
module.exports = router
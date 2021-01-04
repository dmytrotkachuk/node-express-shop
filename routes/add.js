const {Router} = require('express')
const router = new Router()

router.get('/', (req,res,next)=>{
    res.status(200).render('add', {
        title:'Add Course',
        isAdd:true
    })
})

router.post('/', (req,res)=>{
    console.log(req.body)
    res.redirect('/courses')
})
module.exports = router
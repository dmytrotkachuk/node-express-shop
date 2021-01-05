const {Router} = require('express')
const router = new Router()

const Cart = require('../models/cart')
const Course = require('../models/course')


router.post('/add', async(req, res) => {
    const course = await Course.getById(req.body.id)
    await Cart.add(course)
    res.redirect('/cart')
})

router.get('/', async (req,res)=>{
    const cart = await Cart.fetch()
    res.render('cart', {
        title: "Cart",
        cart
    })
})

module.exports = router
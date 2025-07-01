const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const homePageRouter = require('./viewsRouter/homePageRouter')
const imageRouter = require('./imageRouter')
const aboutRouter = require('./viewsRouter/aboutRouter')
// const categoryRouter = require('./categoryRouter')

const routes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/viewHome/', homePageRouter)
    app.use('/api/img', imageRouter)
    app.use('/api/about', aboutRouter)
    // app.use('/api/category', categoryRouter)
}

module.exports = routes
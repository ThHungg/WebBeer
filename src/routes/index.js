const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const homePageRouter = require('./viewsRouter/homePageRouter')
const imageRouter = require('./imageRouter')
const aboutRouter = require('./viewsRouter/aboutRouter')
const navigateRouter = require('./viewsRouter/navigateRouter')
// const categoryRouter = require('./categoryRouter')

const routes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/img', imageRouter)
    // app.use('/api/category', categoryRouter)

    //View
    app.use('/api/viewHome', homePageRouter)
    app.use('/api/about', aboutRouter)
    app.use('/api/navigate', navigateRouter)
}

module.exports = routes
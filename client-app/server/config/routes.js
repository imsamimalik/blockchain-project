const controllers = require('../controllers/index')

module.exports = (app) => {
    app.get('/', controllers.home.index)
    app.get('/lend', controllers.user.lend)
    app.get('/borrow', controllers.user.borrow)
    app.get('/profile', controllers.user.profile)
    app.get('/login', controllers.home.login)

    app.get('/check', controllers.user.checkAddress)
    
    app.all('*', (req, res) => {
        res.status(404)
        res.send('404 Not Found!')
        res.end()
    })
}
module.exports = {
    index: (req, res) => {
        res.render('home/index')
    },

    login: (req, res) => {
        res.render('home/login')
    }
}
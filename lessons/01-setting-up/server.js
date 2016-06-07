/**
 * Created by heoo442 on 2016/6/5.
 */
var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()
//must be first
app.use(compression())
app.use(express.static(path.join(path.resolve(__dirname), 'public')))

app.get('*', function (req, res) {
    res.sendFile(path.join(path.resolve(__dirname), 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})



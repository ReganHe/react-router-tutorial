/**
 * Created by heoo442 on 2016/6/5.
 */
var express = require('express')
var path = require('path')
var compression = require('compression')

var app = express()

app.use(express.static(__dirname))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})



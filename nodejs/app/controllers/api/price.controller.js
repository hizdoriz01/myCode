exports.hourList = async function(req, res) {
    var symbol = req.params.symbol
    var page = 1

    if(req.params.page)
    page = req.params.page

    var model = require('../../models/'+ symbol.toLowerCase() +'.model')
    var data = await model.perHour(page)
    res.send(data)
}

exports.dayList = async function(req, res) {
    var symbol = req.params.symbol
    var page = 1

    if(req.params.page)
    page = req.params.page

    var model = require('../../models/'+ symbol.toLowerCase() +'.model')
    var data = await model.perDay(page)
    res.send(data)
}

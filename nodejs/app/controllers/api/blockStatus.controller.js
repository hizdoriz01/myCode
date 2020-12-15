const blockStatusModel = require('../../models/block_status.model')

exports.addBlockStatus = async function(req, res) {
    var balance = req.body.balance
    var latest_block = req.body.latest_block
    var remark = req.body.remark
    var updated_at = req.body.updated_at

    var saveData = {
        balance:balance,
        balance:balance,
        latest_block:latest_block,
        remark:remark,
        saveData:saveData,
        updated_at:updated_at,
    }

    var result = await blockStatusModel.update(id, saveData)

    res.send(result)
}

exports.setBlockStatus = async function(req, res) {
    var id = req.body.id
    var balance = req.body.balance
    var latest_block = req.body.latest_block
    var remark = req.body.remark
    var updated_at = req.body.updated_at

    var saveData = {
        balance:balance,
        latest_block:latest_block,
        remark:remark,
        saveData:saveData,
        updated_at:updated_at,
    }

    var result = await blockStatusModel.update(id, saveData)

    res.send(result)
}
const eventHistoryModel = require('../../models/event_history.model')

exports.addEventHistory = async function(req, res) {
    var sender_address = req.body.sender_address
    var contract_address = req.body.contract_address
    var txid = req.body.txid
    var blocknumber = req.body.blocknumber
    var timestamp = req.body.timestamp
    var status = req.body.status
    var event_name = req.body.event_name
    var params = req.body.params

    var saveData = {
        sender_address:sender_address,
        contract_address:contract_address,
        txid:txid,
        blocknumber:blocknumber,
        timestamp:timestamp,
        status:status,
        event_name:event_name,
        params:params,
    }
    var result = await eventHistoryModel.insert(saveData)

    res.send(result)
}

exports.setEventHistory = async function(req, res) {
    var id = req.body.id
    var sender_address = req.body.sender_address
    var contract_address = req.body.contract_address
    var txid = req.body.txid
    var blocknumber = req.body.blocknumber
    var timestamp = req.body.timestamp
    var status = req.body.status
    var event_name = req.body.event_name
    var params = req.body.params

    var saveData = {
        sender_address:sender_address,
        contract_address:contract_address,
        txid:txid,
        blocknumber:blocknumber,
        timestamp:timestamp,
        status:status,
        event_name:event_name,
        params:params,
    }

    var result = await eventHistoryModel.update(id, saveData)

    res.send(result)
}
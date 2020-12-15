const stakingUserModel = require('../../models/staking_user.model')

exports.addStakingUser = async function(req, res) {
    var address = req.body.address
    var staking = req.body.staking
    var staking_time = req.body.staking_time
    var updated_at = req.body.updated_at

    var saveData = {
        address:address,
        staking:staking,
        staking_time:staking_time,
        updated_at:updated_at
    }

    var result = await blockStatusModel.insert(saveData)

    res.send(result)
}

exports.setStakingUser = async function(req, res) {
    var id = req.body.id
    var address = req.body.address
    var staking = req.body.staking
    var staking_time = req.body.staking_time
    var updated_at = req.body.updated_at

    var saveData = {
        address:address,
        staking:staking,
        staking_time:staking_time,
        updated_at:updated_at
    }

    var result = await blockStatusModel.update(id, saveData)

    res.send(result)
}
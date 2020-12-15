const stakingPendingModel = require('../../models/staking_pending.model')

exports.addStakingPending = async function(req, res) {
    var pending_id = req.body.pending_id
    var address = req.body.address
    var staking = req.body.staking
    var reward = req.body.reward
    var pending_time = req.body.pending_time
    var updated_at = req.body.updated_at

    var saveData = {
        pending_id:pending_id,
        address:address,
        staking:staking,
        reward:reward,
        pending_time:pending_time,
        updated_at:updated_at
    }

    var result = await stakingPendingModel.insert(saveData)

    res.send(result)
}

exports.setStakingPending = async function(req, res) {
    var id = req.body.id
    var pending_id = req.body.pending_id
    var address = req.body.address
    var staking = req.body.staking
    var reward = req.body.reward
    var pending_time = req.body.pending_time
    var updated_at = req.body.updated_at

    var saveData = {
        pending_id:pending_id,
        address:address,
        staking:staking,
        reward:reward,
        pending_time:pending_time,
        updated_at:updated_at
    }
    
    var result = await stakingPendingModel.update(id, saveData)

    res.send(result)
}
const express = require('express');

const Staff = require('./staff-model.js');

const router = express.Router({
    mergeParams: true
})

router.get('/', (req, res) => {
    Staff.getStaff()
        .then(staff => {
            res.status(200).json(staff)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error retrieving the staff list'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Staff.getStaffById(id)
        .then(member => {
            res.status(200).json(member)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error retrieving the user with id ${id}`})
        })

}) 




module.exports = router;
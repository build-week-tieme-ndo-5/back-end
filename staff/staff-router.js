const express = require('express');
const router = express.Router({
    mergeParams: true
});
const Staff = require('./staff-model.js');
const bcrypt = require('bcryptjs');

const Token = require('../auth/token.js');
const verifyJwt = require('../auth/verifyJwt.js');

// Get list of all staff
router.get('/', verifyJwt, (req, res) => {
    Staff.getStaff()
        .then(staff => {
            res.status(200).json(staff)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error retrieving the staff list'})
        })
})

// Get staff member by id
router.get('/member/:id', verifyJwt, (req, res) => {
    const { id } = req.params;
    Staff.getStaffById(id)
        .then(member => {
            if(member){
                res.status(200).json(member)
            } else {
                res.status(404).json({ message: `A user with an id of ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error retrieving the user with id ${id}`})
        })

}) 

// Get staff member by username - probably shouldn't be used by frontend since this is needed return passwords
router.get('/member', (req, res) => {
    const { username } = req.body;
    Staff.getStaffByUsername(username)
        .then(member => {
            if(member){
                res.status(200).json(member)
            } else {
                res.status(404).json({ message: `A user with an identifier of ${filter} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error retrieving the user with the identifier of ${filter}`})
        })
})

// Register a new staff member
router.post('/register', (req, res) => {
   const { username, first_name, last_name, password } = req.body;
   if(!username || !first_name || !last_name || !password) {
       res.status(400).json({ message: 'Please complete all fields to register as a new staff member'})
   } else {
       Staff.insert({
           username,
           first_name,
           last_name,
           password: bcrypt.hashSync(password, 10) 
       })
        .then(id => {
            res.status(201).json({ message: `User ${username} registered`, id})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an registering the user' })
          })
   }
})


// Log in existing staff membersand assign JWT
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        res.status(400).json({ message: `A username and password are required to log in` })
    } else {
        Staff.getStaffByUsername(username)
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)){
                    const token = Token.generate(user)
                    res.status(200).json({
                        message: `Welcome, ${username}`,
                        token
                    })
                } else {
                    res.status(401).json({ message: 'Invalid credentials'})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: 'Error logging in' })
              })
    }
})

router.delete('/remove/:id', (req, res) => {
    const { id } = req.params;
    Staff.getStaffById(id)
        .then(member => {
            if(member) {
                Staff.remove(id)
                    .then(() => {
                        res.status(200).json({ message: `Staff member ${id} deleted`})
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'There was an error deleting that staff member'})
                    })
            } else {
                res.status(404).json({ message: `A staff member with an id of ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error deleting the staff member with id ${id}`})
        })
})

router.put('/update/:id/', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Staff.update(id, data)
        .then(updated => {
            if(updated){
                Staff.getStaffById(id)
                    .then(member => {
                        res.status(200).json(member)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({error: "Update was good but there was some error"})
                    })
            } else {
                res.status(404).json({error: `Staff member with the id ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The staff member's infomation could not be modified."});
        })
})



module.exports = router;
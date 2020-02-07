const express = require('express');
const router = express.Router({
    mergeParams: true
})
const Client = require('./clients-model.js');


// Get list of all clients
router.get('/', (req, res) => {
    Client.getClients()
        .then(clients => {
            res.status(200).json(clients)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'There was an error retrieving the client list'})
        })
})

// Get a client by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    Client.getClientById(id)
        .then(client => {
            if(client){
                res.status(200).json(client)
            } else {
                res.status(404).json({ message: `A client with an id of ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error retrieving the client with id ${id}`})
        })
})


// Add a new client
router.post('/register', (req, res) => {
    console.log(req.body)
    const { name, village, loan_amount, loan_start, loan_due, last_payment, payment_date, harvest_yield, sales_goal } = req.body;
    if(!name || !village || !loan_amount || !loan_start || !loan_due) {
        res.status(400).json({ message: 'Please complete all fields to register a new client'})
    } else {
        Client.insert({
            name,
            village,
            loan_amount,
            loan_start,
            loan_due,
            last_payment,
            payment_date,
            harvest_yield,
            sales_goal
        })
        .then(id => {
            res.status(201).json({ message: `Client ${name} created`, id})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was the following error ${err}`})
        })
    }
})

// Update client
router.put('/:id/update', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    Client.update(id, data)
        .then(updated => {
            if(updated){
                Client.getClientById(id)
                    .then(client => {
                        res.status(200).json(client)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({error: "Update was good but there was some error"})
                    })
            } else {
                res.status(404).json({error: `Client with the id ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The client's infomation could not be modified."});
        })
    
})


// Record payment and adjust loan amount
router.put('/:id/update/payment', (req, res) => {
    const { id } = req.params;
    const { last_payment, payment_date } = req.body;
    Client.getClientById(id)
        .then(client => {
            if(client) {
                const newLoanAmount = client.loan_amount - last_payment
                Client.update(id, { loan_amount: newLoanAmount, last_payment, payment_date })
                 .then(updated => {
                     if(updated){
                         Client.getClientById(id)
                            .then(patron => {
                                res.status(200).json(patron)
                            })
                     }
                 })
                 .catch(err => {
                     console.log(err)
                     res.status(500).json({ message: 'There was an error updating the loan'})
                 })
            } else {
                res.status(404).json({error: `Client with the id ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The client's infomation could not be modified."});
        })
})

router.delete('/remove/:id', (req, res) => {
    const { id } = req.params;
    Client.getClientById(id)
        .then(client => {
            if(client) {
                Client.remove(id)
                    .then(() => {
                        res.status(200).json({ message: `Client ${id} deleted`})
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({ message: 'There was an error deleting the client'})
                    })
            } else {
                res.status(404).json({ message: `A client with an id of ${id} does not exist`})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: `There was an error deleting the client member with id ${id}`})
        })
})






module.exports = router;
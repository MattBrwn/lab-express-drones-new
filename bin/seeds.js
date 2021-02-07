// Iteration #1
const mongoose = require('mongoose')

// first check if our db is connected
require('../configs/db.config.js')

// require the model

const DroneModel = require('../models/Drone.model.js')

// insert into the model
// inserting many documents
DroneModel.insertMany( [
    { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
    { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
    { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
  ])
    .then(() => {
        console.log('Data seeded')
        // always close the connection after seeding
        // please make sure you require mongoose at the top of the file
        mongoose.connection.close()
    })
    .catch((error) => {
        console.log('Data seeding went wrong!', error)
    })

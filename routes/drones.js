const express = require('express');

// require the Drone model here
const DroneModel = require('../models/Drone.model.js');

const router = express.Router();

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  DroneModel.find()
  .then((drones) => {
      // please create this page in your views folder
      res.render('../views/drones/list.hbs', {drones})
  })
  .catch(() => {
      console.log('Something went wrong while finding')
  })

});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('../views/drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {  myDrone, myPropellers, myMaxSpeed } = req.body
     let myNewDrone = {
         name: myDrone,
         propellers: myPropellers,
         maxSpeed: myMaxSpeed

     }     
  DroneModel.create(myNewDrone)
     
     .then(() => {
             //sends a page hbs to the user
             // res.render()
             res.redirect('/drones')  
             // if you want to keep the user on the same page
             //and conditionally render something
             //res.render('create-form.hbs', {dataAdded: true})
             
         })
         .catch(() => {
             console.log('something went wrong creating')
         })
}
);

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id
 
  DroneModel.findById(id)
    .then ((drones) => {
      res.render ('../views/drones/update-form.hbs', {drones})
      console.log(id)
    })
    .catch(() => {
      console.log('Something went wrong while getting actual Drone')
    })
});


router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id
    const {myDrone, myPropellers, myMaxSpeed } = req.body

    let editedDrone = {
        name: myDrone,
        propellers: myPropellers,
        maxSpeed: myMaxSpeed
    }

    DroneModel.findByIdAndUpdate(id, editedDrone)
        .then(() => {
            //redirect to home page
            res.redirect('/drones')
        })
        .catch(() => {
            console.log('Edit failed')
        })

});

router.get('/drones/:id/delete', (req, res, next) => {
  // Iteration #4: Update the drone
  let id = req.params.id
 
  DroneModel.findById(id)
    .then ((drones) => {
      res.render ('../views/drones/delete-form.hbs', {drones})
      console.log(id)
    })
    .catch(() => {
      console.log('Something went wrong while getting actual Drone')
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  let id = req.params.id
  DroneModel.findByIdAndDelete(id)
      .then(() => {
          // when deleted successfully
          // redirect the user to the /todos page

          res.redirect('/drones')
      })
      .catch(() => {
          console.log('Delete failed!')
      })
})

module.exports = router;

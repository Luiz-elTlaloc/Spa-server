var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Treatment = require('../models/Treatment')

const isAuthenticated = require('../middleware/isAuthenticated')
const requireAdmin = require('../middleware/requireAdmin')

router.post('/', isAuthenticated, (req, res, next) => {
    const { image, title, description, details } = req.body;

    Treatment.create({
        image, 
        title,
        description,
        details,
        owner: req.user._id
    })
    .then((createdTreatment) =>{
        console.log('this is the created treatment ===>', createdTreatment);
        res.json(createdTreatment);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.get('/', (req, res, next) => {
    Treatment.find()
    .then((foundTreatments) => {
        console.log('Found Treatments ===>', foundTreatments);
        res.json(foundTreatments);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.get("/details/:treatmentId", (req, res, next) => {
    const { treatmentId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Treatment.findById(treatmentId)
      .then((foundTreatment) => {
        console.log("Found project ===>", foundTreatment);
        res.json(foundTreatment);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
  
  router.put("/update/:treatmentId", isAuthenticated, requireAdmin, (req, res, next) => {
    const { treatmentId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Treatment.findByIdAndUpdate(treatmentId, req.body, { new: true })
      .populate("treatments")
      .then((updatedTreatment) => {
        console.log("Updated treatment ====>", updatedTreatment);
        res.json(updatedTreatment);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
  
  router.delete("/delete/:treatmentId", isAuthenticated, requireAdmin, (req, res, next) => {
    const { treatmentId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Treatment.findByIdAndDelete(treatmentId)
      .then((deletedTreatment) => {
        console.log("This is our deleted project", deletedTreatment);
        let treatmentIds = [...deletedTreatment.treatments];
        let treatmentDeletions = treatmentIds.map((treatment) => {
          return Treatment.findByIdAndDelete(treatment);
        });
        Promise.allSettled(treatmentDeletions)
          .then((deletedTreatment) => {
            console.log("Deleted Treatments ==>");
            res.json({ deletedTreatment });
          })
          .catch((err) => {
            console.log(err);
            res.json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

module.exports = router
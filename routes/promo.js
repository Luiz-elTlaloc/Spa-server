var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Promo = require('../models/Promo')

const isAuthenticated = require('../middleware/isAuthenticated')
const requireAdmin = require('../middleware/requireAdmin')

router.post('/', isAuthenticated, (req, res, next) => {
    const { image } = req.body;

    Promo.create({
        image, 
        owner: req.user._id
    })
    .then((createdPromo) =>{
        console.log('this is the created promo ===>', createdPromo);
        res.json(createdPromo);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

router.get('/', (req, res, next) => {
    Promo.find()
    .populate('promo')
    .then((foundPromos) => {
        console.log('Found Promos ===>', foundPromos);
        res.json(foundPromos);
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
});

  router.delete("/delete/:promoId", isAuthenticated, requireAdmin, (req, res, next) => {
    const { promoId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(promoId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Promo.findByIdAndDelete(promoId)
      .then((deletedPromo) => {
        console.log("This is our deleted promo", deletedPromo);
        let promoIds = [...deletedPromo.promos];
        let promoDeletions = promoIds.map((promo) => {
          return Promo.findByIdAndDelete(promo);
        });
        Promise.allSettled(promoDeletions)
          .then((deletedPromo) => {
            console.log("Deleted Promo ==>");
            res.json({ deletedPromo });
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
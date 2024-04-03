const Promo = require('../models/Promo')

const promoCreate = (req, res, next) => {
  const { image } = req.body;

  Promo.create({
    image,
    promo: promoId,
  })
    .then((createdPromo) => {
      return Promo.findByIdAndUpdate(
        createdPromo.promo,
        {
          $push: { promos: createdPromo._id },
        },
        {
          new: true,
        }
      );
    })
    .then((promoToPopulate) => {
      return promoToPopulate.populate("promos");
    })
    .then((populatedPromo) => {
      console.log("Populated promos with new promo ====>", populatedPromo);
      res.json(populatedPromo);
    })
    .catch((err) => {
      console.log("Error creating promo", err);
      res.json({ errorMessage: "Error creating promo", err });
    });
};

module.exports = {
  promoCreate,
};

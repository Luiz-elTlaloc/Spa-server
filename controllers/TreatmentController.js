const Treatment = require('../models/Treatment')

const treatmentCreate = (req, res, next) => {
  const { image, title, description, details, treatmentId } = req.body;

  Treatment.create({
    image,
    title,
    description,
    details,
    treatment: treatmentId,
  })
    .then((createdTreatment) => {
      return Treatment.findByIdAndUpdate(
        createdTreatment.treatment,
        {
          $push: { treatment: createdTreatment._id },
        },
        {
          new: true,
        }
      );
    })
    .then((treatmentToPopulate) => {
      return treatmentToPopulate.populate("treatments");
    })
    .then((populatedTreatment) => {
      console.log("Populated treatments with new treatment ====>", populatedTreatment);
      res.json(populatedTreatment);
    })
    .catch((err) => {
      console.log("Error creating treatment", err);
      res.json({ errorMessage: "Error creating treatment", err });
    });
};

module.exports = {
  treatmentCreate,
};

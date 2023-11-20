const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const duenioVehiculoSchema = new Schema(
  {
    DNI: {
      type: int,
      required: true,
    },
    vehiculo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehiculo",
      required: true,
    },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
  },
});

const duenioVehiculo = mongoose.model("duenioVehiculo", duenioVehiculoSchema);
module.exports = duenioVehiculo;

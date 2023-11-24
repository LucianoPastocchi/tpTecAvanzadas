const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const duenioVehiculoSchema = new Schema(
  {
    DNI: {
      type: String,
      required: true,
    },
    patente: {
      type: String,
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

const DuenioVehiculo = mongoose.model("duenioVehiculo", duenioVehiculoSchema);
module.exports = DuenioVehiculo;

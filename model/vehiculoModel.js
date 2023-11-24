const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vehiculoSchema = new Schema(
  {
    patente: {
      type: String,
      required: true,
    },
    duenioVehiculo: {
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

const Vehiculo = mongoose.model("vehiculo", vehiculoSchema);
module.exports = Vehiculo;

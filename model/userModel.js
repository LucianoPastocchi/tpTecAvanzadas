const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usrSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    password: {
      type: String,
      required: true,
    },
    fecNacimiento: {
      type: String,
      required: false,
    },
    rol: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
).set("toJSON", {
  transform: (document, object) => {
    object.id = document.id;
    delete object._id;
    delete object.password;
  },
});

const Usr = mongoose.model("usr", usrSchema);
module.exports = Usr;

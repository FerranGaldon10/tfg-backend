const mongoose = require("mongoose");

// const MONGO_URL = "mongodb://localhost/shoppingCartTest";
const MONGO_URL = "mongodb+srv://camalsproject:camalsproject@cluster0.qleqeqj.mongodb.net/?retryWrites=true&w=majority";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB FUNCIONANDO"))
    .catch((error) => console.error(error));
};

module.exports = db
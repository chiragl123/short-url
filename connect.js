const mongoose = require("mongoose");

async function connectToMogo(url){
    return mongoose.connect(url)
}
module.exports = {
    connectToMogo
}
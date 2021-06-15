var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
   user_id:{type: String, required: true},
    
    photo:{type: String, required: true},
    // {
    //     data: Buffer,
    //     contentType: String
    // }
});
 
//Image is a model which has a schema imageSchema
 
const Image = new mongoose.model('image', imageSchema);
module.exports = Image;
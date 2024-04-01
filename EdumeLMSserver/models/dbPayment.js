const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
  });

imageSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        const base64 = Buffer(doc.data).toString("base64");
        ret.data = `data:image/${doc.contentType};base64,${base64}`;
        return ret;
    },
});

const ImageModel = mongoose.model('dbPayment', imageSchema);

module.exports = ImageModel;

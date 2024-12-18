const mongoose = require('mongoose');
const { Schema } = mongoose;
const multer = require('multer');
const path = require('path');
const imagePath = "/uploads";

const BookStoreSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },

    publishedDate: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imagePath))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

BookStoreSchema.statics.uploadedAvatar = multer({ storage: storage }).single('coverImage');
BookStoreSchema.statics.imgPath = imagePath

const BookStore = mongoose.model('BookStore', BookStoreSchema);
module.exports = BookStore;
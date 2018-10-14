let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let songSchema = new Schema(
    {
        id: { type: String },
        name: { type: String },
        artist: { type: String },
        album: { type: String },
        year: { type: Number },
        stars: { type: Number, min: 0, max: 5 },
        author: { type: String },
        genre: { type: String },
        producer: { type: String },
        recordCompany: { type: String },
        imageUrl: { type: String }
    },
    {
        versionKey : false
    }
);

let SongModel = mongoose.model('Songs', songSchema);

module.exports = SongModel;
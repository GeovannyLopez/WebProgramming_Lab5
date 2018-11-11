let _ = require('lodash');
let SongModel = require('../models/songModel');
let connection = require('./connection');

class dataAccess {
    getAll(callback) {
        SongModel.find((err, songs) => {
            if (err) throw err;
            callback('success', songs)
        });
    }

    getSong(id, callback) {
        SongModel.findOne({ _id: id }, (err, song) => {
            console.log(song);
            if (err) {
                callback('error');
            }else if (song === undefined || song === null){
                callback('not found' );
            }
            else{
                callback("success", song);
            }
        });
    }
    
    createSong(newSong) {
        let song = new SongModel({
            name: newSong.name,
            artist: newSong.artist,
            album: newSong.album,
            year: newSong.year,
            stars: newSong.stars,
            author: newSong.author,
            genre: newSong.genre,
            producer: newSong.producer,
            recordCompany: newSong.recordCompany,
            imageUrl: newSong.imageUrl
          });
          
          song.save();
        return { status: 'success', song: song }
    }

    editSong(id, editedSong, callback) {
        SongModel.findOne({ _id: id }, (err, song) => {
            if (err) {
                callback('error');
            }else if (!song){
                callback('not found');
            }
            else{
                SongModel.findOneAndUpdate({_id: id}, {$set: editedSong }, {returnOriginal:false} , function(err){
                    if(err){
                        callback('error');
                    }else{
                        callback('success');
                    }
                });  
            }
        });
    }

    deleteSong(id, callback) {
        //Look for the given song
        SongModel.findOne({ _id: id }, (err, song) => {
            if (err) {
                callback('error');
            }else if (song === undefined || song === null){
                callback('not found' );
            }
            else{
                SongModel.deleteOne({ _id: id }, (err) => {
                    if (err) {
                        callback('error');
                    }else{
                        callback("success");
                    }
                });     
            }
        });
    }

}

module.exports = new dataAccess()
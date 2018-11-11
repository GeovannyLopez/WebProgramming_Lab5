let _ = require('lodash');
let SongModel = require('../models/songModel');
let connection = require('./connection');
var redis = require('redis');
var config = require('config');
var redisConfig = config.get('Customer.redisConfig');


var client = redis.createClient(redisConfig.port, redisConfig.host); //creates a new client

class dataAccess {
    getAll(callback) {
        //Check if the value exists in chaché
        client.exists('songs_*', function(err, reply) {
            //If the value exists
            if (reply === 1) {
                console.log('exists');

                client.get('songs_*', function(error, result) {
                    if (error) throw error;
                    callback('success', JSON.parse(result));
                  });
            } else { //If the value doesn't exist
                console.log('doesn\'t exist');

                SongModel.find((err, songs) => {
                    if (err) throw err;

                    //Store the value in caché
                    client.set('songs_*', JSON.stringify(songs), 'EX', 30);
                    callback('success', songs);
                });
            }
        });
    }

    getSong(id, callback) {
        //Check if the value exists
        client.exists('songs_' + id, function(err, reply) {
            if (reply === 1) {
                console.log('exists');

                //Get the value from caché
                client.get('songs_' + id, function(error, result) {
                    if (error) throw error;
                    callback('success', JSON.parse(result));
                  });
            } else { //If the values doesn't exist
                console.log('doesn\'t exist');
                
                SongModel.findOne({ _id: id }, (err, song) => {
                    console.log(song);
                    if (err) {
                        callback('error');
                    }else if (!song){
                        callback('not found');
                    }
                    else{
                        //Store the value in caché
                        client.set('songs_' + id, JSON.stringify(song), 'EX', 30);
                        callback("success", song);
                    }
                });
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
        return { status: 'success', song }
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
            }else if (!song){
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
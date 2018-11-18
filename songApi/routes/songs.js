var express = require('express');
var router = express.Router();
const dataAccess = require('../data/dataAccess')
var createError = require('http-errors')

/* GET specific song. */
router.get('/:id', function (req, res, next) {
    dataAccess.getSong(req.params.id, function(status, song){
        if (status === "success") {
            res.status(200).json(song);
            return;
        }
        else {
            next(createError(404));
        }
    });  
});

/* GET songs listing. */
router.get('/', function (req, res, next) {
    dataAccess.getAll(function(status, songs){
        if (status === "success") {
            res.status(200).json(songs);
        }
        else {
            next(createError(404));
        }
    });
});

router.post('/', function (req, res, next) {
    var result = dataAccess.createSong(req.body, function(status, newSong){
        if (status == "success") {
            res.status(201).json(newSong);
            return;
        }
        else {
            next(createError(500));
        }
    });
});

router.put('/:id', function (req, res, next) {
    dataAccess.editSong(req.params.id, req.body, function(status){
        if (status == "success") {
            res.status(204).json();
        }
        else if (status == 'not found'){
            next(createError(404));
        }
        else {
            next(createError(500));
        }
    });
});

router.delete('/:id', function (req, res, next) {
    dataAccess.deleteSong(req.params.id, function(status){
        if (status == "success") {
            res.status(204).json();
        }
        else if (status == 'not found'){
            next(createError(404));
        }
        else {
            next(createError(500));
        }
    });
});

module.exports = router;
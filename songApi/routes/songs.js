var express = require('express');
var router = express.Router();
const dataAccess = require('../data/dataAccess')

/* GET specific song. */
router.get('/:id', function (req, res, next) {
    dataAccess.getSong(req.params.id, function(status, song){
        if (status === "success") {
            res.status(200).json(song);
            return;
        }
        else {
            res.status(404).json(
                { status: "error" }
            );
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
            res.status(404).json(
                { status: "error" }
            );
        }
    });
});

router.post('/', function (req, res, next) {
    var result = dataAccess.createSong(req.body);
    if (result.status == "success") {
        res.status(201).json(result.song);
        return;
    }
    else {
        res.status(500).json();
    }
});

router.put('/:id', function (req, res, next) {
    dataAccess.editSong(req.params.id, req.body, function(status){
        if (status == "success") {
            res.status(204).json();
        }
        else if (status == 'not found'){
            res.status(404).json();
        }
        else {
            res.status(500).json();
        }
    });
});

router.delete('/:id', function (req, res, next) {
    dataAccess.deleteSong(req.params.id, function(status){
        if (status == "success") {
            res.status(204).json();
        }
        else if (status == 'not found'){
            res.status(404).json();
        }
        else {
            res.status(500).json();
        }
    });
});

module.exports = router;
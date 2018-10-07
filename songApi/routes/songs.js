var express = require('express');
var router = express.Router();
const dataAccess = require('../data/dataAccess')

/* GET specific song. */
router.get('/:id', function (req, res, next) {
    var result = dataAccess.getSong(req.params.id);

    if (result.status === "success") {
        res.status(200).json(result.song);
        return;
    }
    else {
        res.status(404).json(
            { status: "error" }
        );
    }

});

/* GET songs listing. */
router.get('/', function (req, res, next) {
    var result = dataAccess.getAll();
    if (result.status === "success") {
        res.status(200).json(result.songs);
        return;
    }
    else {
        res.status(404).json(
            { status: "error" }
        );
    }
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
    var result = dataAccess.editSong(req.params.id, req.body);
    if (result.status == "success") {
        res.status(204).json();
        return;
    }
    else {
        res.status(500).json();
    }
});

router.delete('/:id', function (req, res, next) {
    var result = dataAccess.deleteSong(req.params.id);
    if (result.status == "success") {
        res.status(204).json();
        return;
    }
    else {
        res.status(500).json();
    }
});

module.exports = router;
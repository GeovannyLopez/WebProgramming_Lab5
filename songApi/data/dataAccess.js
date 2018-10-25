var _ = require('lodash');

var songs = [
    {
        id: "5cab1c88-27d9-44ed-993f-e59c2ddee11e",
        name: '10 AM',
        artist: 'PXNDX',
        album: 'Sangre Fría',
        year: 2013,
        stars: 5,
        author: "José Madero Vicaíno",
        genre: "Alternative",
        producer: "Adrián \"Rojo\" Treviño",
        recordCompany: "Universal Music México",
        imageUrl: "http://images.coveralia.com/audio/p/Panda-Sangre_Fria-Frontal.jpg?43"
    },
    {
        id: "54e79399-d29f-4826-b76a-7f4ea3f5bdb9",
        name: 'Enfermedad en casa',
        artist: 'PXNDX',
        album: 'Sangre Fría',
        year: 2013,
        stars: 5,
        author: "José Madero Vicaíno",
        genre: "Alternative",
        producer: "Adrián \"Rojo\" Treviño",
        recordCompany: "Universal Music México",
        imageUrl: "http://images.coveralia.com/audio/p/Panda-Sangre_Fria-Frontal.jpg?43"
    },
    {
        id: "23ecde59-64dc-42fd-bb81-d7d03f6ec278",
        name: '3+1',
        artist: 'PXNDX',
        album: 'Para ti con desprecio',
        year: 2005,
        stars: 4,
        author: "José Madero Vicaíno",
        genre: "Alternative",
        producer: "Adrián \"Rojo\" Treviño",
        recordCompany: "Movic Records",
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51EZ8KPYMGL.jpg"
    },
    {
        id: "d71363e8-4c0e-47c1-a8cf-379adff58bfb",
        name: 'Aforismos',
        artist: 'PXNDX',
        album: 'Bonanza',
        year: 2012,
        stars: 4,
        author: "José Madero Vicaíno",
        genre: "Alternative",
        producer: "Adrián \"Rojo\" Treviño",
        recordCompany: "Movic Records",
        imageUrl: "https://anton.com.mx/wp-content/uploads/2018/06/PXNDX.jpg"
    },
    {
        id: "7cdb1a87-39e5-421f-8336-bac78fb7e4e3",
        name: 'La noche de la mesa triste',
        artist: 'PXNDX',
        album: 'Bonanza',
        year: 2012,
        stars: 5,
        author: "José Madero Vicaíno",
        genre: "Alternative",
        producer: "Adrián \"Rojo\" Treviño",
        recordCompany: "Movic Records",
        imageUrl: "https://anton.com.mx/wp-content/uploads/2018/06/PXNDX.jpg"
    }
];

class dataAccess {
    getAll() {
        return { status: 'success', songs }
    }
    getSong(id) {
        var song = songs.find((song) => {
            return song.id === id;
        });

        if (!song) {
            return { status: 'not found' };
        }

        return { status: 'success', song: song }
    }
    createSong(newSong) {
        newSong.id = guid();
        songs.push(newSong);
        return { status: 'success', song: newSong }
    }

    editSong(id, editedSong) {
        var song = songs.find((song) => {
            return song.id === id;
        });

        if (song === undefined || song === null) {
            return { status: 'not found' };
        }

        let objIndex = songs.findIndex((obj => obj.id === id));

        //Update object's name property.
        editedSong.id = id;
        songs[objIndex] = editedSong;
        console.log(songs[objIndex]);

        return { status: 'success' };
    }

    deleteSong(id) {
        var song = songs.find((song) => {
            return song.id === id;
        });

        if (song === undefined || song === null) {
            return { status: 'not found' };
        }

        _.remove(songs, function (song) {
            return song.id === id;
        });
        return { status: 'success' }
    }

}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = new dataAccess()
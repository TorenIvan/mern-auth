const mongoose = require('mongoose');

const url = process.env.DB_URI;

const connection = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, 
            function(err, db) {
                if (err) reject(err);
                console.log('DB Connected...')
                resolve(db);
        });
    });
}

module.exports = connection;
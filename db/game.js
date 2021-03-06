const { ObjectId } = require('mongodb');
const mongodb = require('./mongodb');
const db = mongodb.getDb();

function getGamesByUsername(username) {
    try {
        const userGames = db.collection("games")
        .find({ $or: [{"white" : username}, {"black" : username}]}).toArray();
        return userGames;   
    } catch (error) {
        console.error(error);
    }
}

function saveGame(game) {
    try {
        const savedGame = db.collection("games").insertOne(game);
    } catch (error) {
        console.error(error);
    } 
}

function getGameById(id) {
    try {
        const game = db.collection("games").findOne({ "_id": ObjectId(id) });
        return game;
    } catch (error) {
        console.error(error);
    } 
}

module.exports = { saveGame, getGamesByUsername, getGameById };
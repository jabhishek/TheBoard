(function (database) {
    var mongodb = require("mongodb");
    // theBoard is the name of the database. 
    // If mongoDb doesn't find the database, it will create it for you.
    var mongoUrl = "mongodb://localhost:27017/theBoard";
    var theDb = null;
    database.getDb = function(next) {
        if (!theDb) {
            // connect to database
            mongodb.MongoClient.connect(mongoUrl, function(err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }

    }

})(module.exports)
(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    data.getNoteCategories = function (next) {
        next(null, seedData.initialNotes);
    };

    function seedDatabase() {
        database.getDb(function(err, db) {
            if (err) {
                console.log("Failed to seed database - " + err);
            } else {
                // check if data exists
                db.notes.count(function(errCount, count) {
                    if (errCount) {
                        console.log("Failed to retrieve database count - " + errCount);
                    } else {
                        if (count === 0) {
                            console.log("Seeding database");
                            seedData.initialNotes.forEach(function(item) {
                                db.notes.insert(item, function(errInsert) {
                                    if (errInsert) {
                                        console.log("Failed to insert note into database - " + errInsert);
                                    };
                                });
                            });
                        } else {
                            console.log("Database already seeded.");
                        }
                    }
                }); 
            }
        });
    }

    seedDatabase();

})(module.exports)
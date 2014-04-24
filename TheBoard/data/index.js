(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    data.getNoteCategories = function (next) {
    
        database.getDb(function(err, db) {
            if (err) {
                console.log("Failed to retrieve database - " + err);
                next(err, null);
            } else {
                console.log("Successfully retrieved database.");
                db.notes.find().toArray(function (errNotes, results) {
                    // Other example of find
                    // db.notes.find({notes: { $size: 5 } }) - gets notes item that has size of 5
                    // db.notes.find({notes: { $not: { $size: 5 } } }) - gets notes item that has size not equal to 5
                    // db.notes.find({notes: { name: "People" } }) 
                    // db.notes.aggregate({$project: {name: 1, notes:1} }, {$unwind: "$notes"}, {$match: {"notes.color": "green"}}).pretty()
                    if (errNotes) {
                        next(errNotes, null);
                    } else {
                        //console.log(results);
                        next(null, results); 
                    }
                });
            }
        });
    };

    data.getNotes = function(categoryName, next) {
        database.getDb(function(err, db) {
            if (err) {
                console.log("Failed to retrieve database - " + err);
                next(err, null);
            } else {
                db.notes.findOne({ name: categoryName}, next);
            }
        });
    };

    data.createNewCategory = function (categoryName, next) {
        database.getDb(function(err, db) {
            if (err) {
                console.log("Failed to retrieve database - " + err);
                next(err, null);
            } else {

                db.notes.find({ name: categoryName }).count(function(errCount, count) {
                    if (errCount) {

                    } else {
                        if (count === 0) {
                            var cat = {
                                name: categoryName,
                                notes: []
                            };
                            db.notes.insert(cat, function(err) {
                                if (err) {
                                    next(err);
                                } else {
                                    next(null);
                                }
                            });
                        } else {
                            next("Category already exists");
                        }
                    }
                });

            }
        });
    };

    function seedDatabase() {
        database.getDb(function(err, db) {
            if (err) {
                console.log("Failed to retrieve database - " + err);
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
(function(notesController) {

    var data = require("../data");
    notesController.init = function(app) {
        app.get("/api/notes/:categoryName", function (req, res) {
            var categoryName = req.params.categoryName;
            data.getNotes(categoryName, function (err, notes) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(notes.notes);
                }
            });
            
        });


        app.post("/api/notes/:categoryName", function(req, res) {
            var categoryName = req.params.categoryName;
            console.log(req.body.note);
            var noteToInsert = {
                note: req.body.note,
                author: "Abhishek Jain",
                color: req.body.color
            };
            data.addNote(categoryName, noteToInsert, function(err) {
              if (err) {
                  res.send(400, "Falied to add note to data store -  " + err);
              } else {
                  res.set("Content-Type", "application/json");
                  res.send(201, noteToInsert);
              }
            });
        });

    };

})(module.exports)
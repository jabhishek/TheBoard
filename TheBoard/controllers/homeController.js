    (function (homeController) {
        var data = require("../data");
    homeController.init = function(app) {
        app.get("/", function(req, res) {
            data.getNoteCategories(function(error, results) {
                res.render("index", { title: "The Board", error: error, categories: results });
            });
        });

        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (error) {
                if (error) {
                    console.log("Error creating new category - " + error);
                    res.redirect("/");
                } else {
                    //TODO - create form to add notes
                    res.redirect("/notes/" + categoryName);
                }
            });

        });
    };
})(module.exports)
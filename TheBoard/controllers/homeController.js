    (function (homeController) {
        var data = require("../data");
    homeController.init = function(app) {
        app.get("/", function(req, res) {
            data.getNoteCategories(function(error, results) {
                res.render("index", { title: "Express + vash", error: error, categories: results });
            });
        });
    };
})(module.exports)
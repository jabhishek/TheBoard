(function (controllers) {
    var homeController = require("./HomeController");
    var notesController = require("./notesController");
    controllers.init = function (app) {
        homeController.init(app);
        notesController.init(app);
    };
})(module.exports)
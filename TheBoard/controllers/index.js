(function (controllers) {
    var homeController = require("./HomeController");
    controllers.init = function (app) {
        homeController.init(app);
    };
})(module.exports)
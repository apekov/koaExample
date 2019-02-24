const siteController = require('./site');
const loginController = require('./login');
const adminController = require('./admin');

module.exports.index = siteController.get;
module.exports.sendMessage = siteController.post;

module.exports.login = loginController.get;
module.exports.auth = loginController.post;


module.exports.admin = adminController.get;
module.exports.uploadProduct = adminController.uploadProduct;   
module.exports.updateSkills = adminController.updateSkills; 
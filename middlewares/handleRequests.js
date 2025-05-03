const notificationApis = require("../routes/notifications.js");


/**
 * function to handle the routing request.
 * @param app
 */
const handleRequests = (app) => {
    console.log("hellow")
    // Here before sending the request, we can check the user permissions or validate the token
    app.use('/users', notificationApis)
}


module.exports = handleRequests;

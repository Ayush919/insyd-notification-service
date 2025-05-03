const {respond} = require("../middlewares/respond");
const helper = require('../helper/notifications');


const notifications = {
    sendNotification: async (req, res) => {
        try {
            const {type} = req.body;
            const result = await helper.sendNotification(type, req?.body.userId);
            respond(res, result)
        } catch (error) {
            console.log("error :: ",error)
            respond(res, {
                code: 500,
                reason: "An Application Error has occurred"
            });
        }
    },
    getUserNotification: async (req, res) => {
        try {
            const result = await helper.getNotifications(req,req.query.userId);
            respond(res, result)
        } catch (error) {
            respond(res, {
                code: 500,
                reason: "An Application Error has occurred"
            });
        }
    },
    markAsRead: async (req, res) => {
        try {
            const result = await helper.notificationMarkAsRead(req.params.id);
            respond(res, result)
        } catch (error) {
            respond(res, {
                code: 500,
                reason: "An Application Error has occurred"
            });
        }
    },
    deleteNotification: async (req, res) => {
        try {
            const result = await helper.deleteNotification(req.params.id);
            respond(res, result)
        } catch (error) {
            respond(res, {
                code: 500,
                reason: "An Application Error has occurred"
            });
        }
    }
}

module.exports = notifications;

const {Notifications} = require("../models/models");

const message = {
    like: "Someone liked your post.",
    comment: "You received a new comment on your post.",
    follow: "Someone started following you.",
    job: "A new job matches your profile.",
};


let ioInstance = null;

const initNotificationService = (io) => {
    ioInstance = io;
};

const sendNotification = async (type, userId) => {
    if (!type) throw new Error('Notification type is required');
    console.log("userId :: ", userId)
    const notification = await Notifications.create({
        type,
        text: message[type] || message.default,
        is_read: false,
        user_id: userId
    });
    // Fetch full notification from DB (this ensures full structure and clean fields)
    const fullNotification = await Notifications.findByPk(notification.id);

    if (ioInstance) {
        ioInstance.to(userId).emit('new-notification', fullNotification);
    }

    return notification;
};

const getNotifications = async (req, userId) => {
    console.log("userId :: ", userId, req.query);
    return await Notifications.findAll({
        where: {
            user_id: userId,
            deleted_at: null,
        },
        order: [['created_at', 'DESC']],
    });
}

const notificationMarkAsRead = async (notificationId) => {
    const [affectedCount] = await Notifications.update(
        {is_read: true},
        {where: {id: notificationId}}
    );
    return affectedCount;
};

const deleteNotification = async (notificationId) => {
    return await Notifications.destroy({where: {id: notificationId}});
}

module.exports = {
    initNotificationService,
    sendNotification,
    getNotifications,
    notificationMarkAsRead,
    deleteNotification
}

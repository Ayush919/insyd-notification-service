const express = require('express');
const router = express.Router();
const notifications = require("../controller/notifications");

router.get('/notifications', notifications.getUserNotification);
router.post('/notification', notifications.sendNotification);
router.patch('/read/:id', notifications.markAsRead);
router.delete('/:id', notifications.deleteNotification);

module.exports = router;

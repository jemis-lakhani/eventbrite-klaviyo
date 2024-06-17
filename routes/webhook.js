const express = require('express');
const { webhook,attendeeUpdated,
  orderUpdated,
 } = require('../api/webhook');


const router = express.Router();
router.post('/', webhook);
// router.post('/attendeeUpdated', attendeeUpdated);
// router.post('/orderUpdated', orderUpdated);
// router.get('/avatars', controller.get);

module.exports = router;

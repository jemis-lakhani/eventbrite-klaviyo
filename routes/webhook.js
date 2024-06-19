const express = require('express');
const { webhook,attendeeUpdated,
  orderUpdated,
 } = require('../controllers/webhook');
const hello = require('../controllers/hello');


const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'hello' }));
router.post('/hello', hello);
router.post('/', webhook);
// router.post('/attendeeUpdated', attendeeUpdated);
// router.post('/orderUpdated', orderUpdated);
// router.get('/avatars', controller.get);

module.exports = router;

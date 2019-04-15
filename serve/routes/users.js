const express = require('express');
const router = express.Router();

const api = require('../config/api');

router.get("/", (req, res) => {
  api.find({}, null, { limit: 10 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
});

module.exports = router;

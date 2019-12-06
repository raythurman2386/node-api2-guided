const express = require("express");
const hubs = require("../hubs/hubs-model.js");

const router = express.Router({
  mergeParams: true
});

router.get("/", (req, res) => {
  hubs
    .findHubMessages(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json({ message: "No messages" }));
});

router.get("/:messageId", (req, res) => {
  hubs
    .findHubMessageById(req.params.id, req.params.messageId)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: "Message not found"
        });
      }
    })
    .catch(err => {
      res.status(400).json({ message: "No messages" });
    });
});

router.post("/", (req, res) => {
  const body = {
    sender: req.body.sender,
    text: req.body.text
  };

  if (!req.body.sender || !req.body.text) {
    return res.status(400).json({ message: "Need sender and text values" });
  }

  hubs
    .addHubMessage(req.params.id, body)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(400).json({ message: "No messages" });
    });
});

module.exports = router;

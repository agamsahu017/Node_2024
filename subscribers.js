const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Getting all

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Getting One
router.get("/:id", getSubscriber, (req, res) => {
  try {
    // res.send(req.params.id);
    res.json(res.subscriber);
  } catch (error) {}
});

//Creating one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Updating one

router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscriberToChannel != null) {
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Deleting One

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    return res.json({ message: "Deleted Subscriber" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;

  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;

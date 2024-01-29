const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const JordanModel = require('../models/jordanModel');
const UserModel = require('../models/userModel');
const ReviewModel = require('../models/reviewModel');

// GET route to retrieve all Jordan models
router.get('/', async (req, res) => {
  try {
    const jordans = await JordanModel.find();
    res.json(jordans);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// GET route to retrieve all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// GET route to retrieve all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// POST route to add a new Jordan model
router.post('/', async (req, res) => {
  try {
    const newJordan = new JordanModel(req.body);
    await newJordan.save();
    res.status(201).json(newJordan);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// POST route to add a new review
router.post('/reviews', async (req, res) => {
  try {
    const newReview = new ReviewModel(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// POST route to add a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// PATCH route to update a Jordan model's style
router.patch('/:model', async (req, res) => {
  try {
    const { model } = req.params;
    const updatedJordan = await JordanModel.findOneAndUpdate(
      { model },
      { $addToSet: { styles: req.body.styles } },
      { new: true }
    );
    if (!updatedJordan) {
      return res.status(404).json({ message: 'Jordan model not found.' });
    }

    res.json(updatedJordan);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong.');
  }
});

// PATCH route to update a review
router.patch('/reviews/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedReview);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// PATCH route to update a user
router.patch('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// DELETE route to delete a Jordan model
router.delete('/:model', async (req, res) => {
  try {
    const { model } = req.params;
    await JordanModel.findOneAndDelete({ model });
    res.json({ message: 'Jordan model deleted successfully.' });
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// DELETE route to delete a review
router.delete('/reviews/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    await ReviewModel.findByIdAndDelete(reviewId);
    res.json({ message: 'Review deleted successfully.' });
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// DELETE route to delete a user
router.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    await UserModel.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).send('Something went wrong.');
  }
});

// Seed route
router.get('/seed', async (req, res) => {
  try {
    const user1Id = new mongoose.Types.ObjectId();
    const user2Id = new mongoose.Types.ObjectId();

    const jordan1Id = new mongoose.Types.ObjectId();
    const jordan2Id = new mongoose.Types.ObjectId();

    await UserModel.deleteMany({});
    await UserModel.insertMany([
      { _id: user1Id, username: 'user1', email: 'user1@example.com' },
      { _id: user2Id, username: 'user2', email: 'user2@example.com' },
      // Add more user data if needed
    ]);

    await ReviewModel.deleteMany({});
    await ReviewModel.insertMany([
      { userId: user1Id, productId: jordan1Id, rating: 4, comment: 'Great shoes!' },
      { userId: user2Id, productId: jordan2Id, rating: 5, comment: 'Awesome style!' },
      // Add more review data if needed
    ]);

    await JordanModel.deleteMany({});
    await JordanModel.insertMany([
      {
        _id: jordan1Id,
        model: 'Jordan 11',
        styles: ['Bred 11s', 'Space Jam 11s', 'Concord 11s'],
        releaseYear: 1995,
      },
      // Add more Jordan data if needed
    ]);

    res.status(200).json({ message: 'Seed data inserted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;

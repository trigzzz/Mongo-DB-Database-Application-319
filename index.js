const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jordanRoutes = require('./routes/jordanRoutes');
const UserModel = require('./models/userModel');
const ReviewModel = require('./models/reviewModel');  
const JordanModel = require('./models/jordanModel');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jordansdb', {
  useNewUrlParser: true,
});

// Use routes
app.use('/jordans', jordanRoutes);

// Seed route
app.get('/seed', async (req, res) => {
  try {
    await UserModel.deleteMany({});
    await UserModel.insertMany([
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
      // Add more user data if needed
    ]);

    await ReviewModel.deleteMany({});
    await ReviewModel.insertMany([
      { userId: 'user1_id', productId: 'jordan1_id', rating: 4, comment: 'Great shoes!' },
      { userId: 'user2_id', productId: 'jordan2_id', rating: 5, comment: 'Awesome style!' },
      // Add more review data if needed
    ]);

    await JordanModel.deleteMany({});
    await JordanModel.insertMany([
      {
        model: 'Jordan 11',
        styles: ['Bred 11s', 'Space Jam 11s', 'Concord 11s'],
        releaseYear: 1995,
      },
      // Add more Jordan data if needed
    ]);

    res.status(200).json({ message: 'Seed data inserted successfully.' });
  } catch (err) {
    res.status(500).send('Something went wrong.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

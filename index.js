const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const postsRouter = require('./routes/posts');
const app = express(); // ← this must come before app.use()

dotenv.config();

app.use(cors()); // ← now this works
app.use(express.json());
app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

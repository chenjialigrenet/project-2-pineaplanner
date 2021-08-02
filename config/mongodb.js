const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () =>
  console.log(
    'Successfully connected to mongodb :) App listenging on http://localhost:3000'
  )
);

mongoose.connection.on('error', () => console.log('DB connection error :('));

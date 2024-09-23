const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.localMongoDB_URL)
  .then(( ) => console.log('DB connected successfully'))
  .catch(err=> console.log(err))

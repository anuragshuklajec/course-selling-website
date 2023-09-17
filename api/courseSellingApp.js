const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dbKey = require('./db/dbKey')
const cors = require('cors')
app.use(express.json());
app.use(cors()) ;

const adminRoutes = require('./routes/admin/adminRoute')
const userRoutes = require('./routes/users/userRoute')


mongoose.connect(dbKey, { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/admin',adminRoutes) ;
app.use('/user',userRoutes) ;


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

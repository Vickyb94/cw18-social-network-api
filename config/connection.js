const { connect, connection } = require('mongoose');


//Wrap Mongoose around local connection to MongoDB 
const connectionString =
//connect mongoose to userDB
    process.env.MONGODB_URI || 'mongodb://localhost:27017/userDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export connection 
module.exports = connection;
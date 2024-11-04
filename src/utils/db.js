const mongoose = require('mongoose')

const connect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB.");
    return;
  }

  try {
    // await mongoose.connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("MongoDB URL:", process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB URL:", process.env.DATABASE_URL);
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
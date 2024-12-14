// import mongoose from "mongoose";

// const database = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("Connected to database");

    



//   } catch (err) {
//     console.log(err);
//   }
// };

// export default database;





import mongoose from "mongoose";
const database = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/test`);
    console.log("Connected to database")
  } catch (err) {
    console.log(err);
  }
};
export default database;


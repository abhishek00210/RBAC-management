require("dotenv").config();
const app = require("./app");
const connectDB = require('./config/database');

connectDB();

const PORT = process.env.PORT || 3000; 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
 
});

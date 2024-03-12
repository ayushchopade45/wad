import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log(`Connected to MongoDB: ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`.bgRed.white);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;

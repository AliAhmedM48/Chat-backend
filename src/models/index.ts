import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    //#region 
    try {
        mongoose
            .connect(`${process.env.DB_HOST_MONGO}`, {
                dbName: process.env.DB_NAME
            })
            .then(() => {
                console.log("Connected to MongoDB", process.env.PORT);
            })
    } catch (error) {
        console.log("connectDB function: ", error);

    }
    //#endregion
}


export { connectToMongoDB };

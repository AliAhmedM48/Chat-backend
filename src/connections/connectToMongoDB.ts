import mongoose from 'mongoose';

const connectToMongoDB = async (db_url: string) => {
    //#region 
    try {
        mongoose
            .connect(db_url, {
                dbName: process.env.DB_NAME
            })
            .then(() => {
                console.log("Connected to MongoDB", process.env.PORT);
            })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
    //#endregion
}


export default connectToMongoDB;

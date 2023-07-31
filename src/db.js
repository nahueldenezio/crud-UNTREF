import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://denezionahuel:contraseniauntref@cluster0.78z22wy.mongodb.net/');
        console.log(">>>> DB is connected");
    } catch (error) {
        console.error(error);
        throw new Error("Error al conectar la base de datos")
    }
}
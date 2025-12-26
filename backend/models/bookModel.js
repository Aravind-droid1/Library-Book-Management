import mongoose from "mongoose";

    const bookSchema =  new mongoose.Schema(
        {
            title:{
                type:String,
                required:true,
            },
            author:{
                type:String,
                required:true,
            },
            publishedYear:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:false,
            },
        },
        {
            timestamps:true,
        }
    );

const Book = mongoose.model('Book', bookSchema);

export default Book;
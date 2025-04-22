// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema({
//     Title: String,
//     Author: String,
//     Price: Number,
//     Description: String,
//     ISBN: { type: String, unique: true},
//     PublishedDate: String,
//     bookImage:{
//         type:String,
//         default:"https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ="
//     }
// });

// const bookModel = mongoose.model("DayTask", bookSchema)

// module.exports = bookModel;

const mongoose = require("mongoose");

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
};

const bookSchema = new mongoose.Schema({
    Title: String,
    Author: String,
    Price: Number,
    Description: String,
    ISBN: { type: String, unique: true },
    PublishedDate: {
        type: String,
        default: formatDate(new Date()) 
    },
    bookImage: {
        type: String,
        default: "https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=gi&k=20&c=_Yaofm8sZLZkKs1eMkv-zhk8K4k5u0g0fJuQrReWfdQ="
    }
});

bookSchema.pre("save", function (next) {
    if (this.PublishedDate) {
        this.PublishedDate = formatDate(new Date(this.PublishedDate));
    }
    next();
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files")
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-blog-${file.originalname}`) //callback
    }
  })
  
// export const upload = multer({ 
//     storage, 
// })

export default multer({storage}); 




















// import dotenv from 'dotenv';

// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';

// dotenv.config();

// const DB_URL=process.env.MONGODB_URI;
// const storage = new GridFsStorage({
//     url: DB_URL,
//     // options: { useNewUrlParser: true },
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg", "image/jpeg"];
//         // console.log("File Type:", file.mimeType);

//         if(match.indexOf(file.mimeType) === -1) //memeType
//             return`${Date.now()}-blog-${file.originalname}`;

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-blog-${file.originalname}`
//         }
//     }
// });

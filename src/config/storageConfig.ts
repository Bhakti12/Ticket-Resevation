import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongoose from "mongoose";
import express from "express";

let bucket: mongoose.mongo.GridFSBucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "ImageStore",
  });
  //console.log(bucket);
});

const storage = new GridFsStorage({
  url: "mongodb://127.0.0.1:27017/Ticket-Reservation",
  file: (req, file) => {
    console.log("file", file);
    const fileInfo = {
      filename: file.originalname,
      bucketName: "ImageStore",
    };
    return fileInfo;
  },
});

const upload = multer({
  storage,
});

// export const uploadFiles = multer({
//   storage: new GridFsStorage({
//     url: "mongodb://0.0.0.0:27017/Ticket-Reservation",
//     file: (req, file) => {
//       console.log("file", file);
//       const fileInfo = {
//         filename: file.originalname,
//         bucketName: "ImageStore",
//       };
//       return fileInfo;
//     },
//   }),
// });

// app.post("/upload", upload.single("image"), (req,res) => {
//   res.status(200).send("image uploaded successfully!");
// });

// app.get("/fileinfo/:filename",async(req,res)=>{
//     try{
//       const filename = bucket.openDownloadStreamByName(req.params.filename)
//       filename.on("data",function(data){
//         return res.status(200).write(data)
//       })
//       filename.on("error",function(data){
//         return res.status(404).json({error : "image not found"})
//       })
//       filename.on("end",()=>{
//         return res.end()
//       })
//     }
//     catch(err){
//       console.log(err);
//     }
// });

export default upload;

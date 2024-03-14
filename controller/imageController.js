import  dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadImageCloud = async (localFilePath) => {
    let cloudinaryResponse; // Declare the variable here

    try {
        // console.log("Attempting to upload file: ", localFilePath);

        if (!fs.existsSync(localFilePath)) {
            console.error(`File not found: ${localFilePath}`);
            return null;
        }

        // Upload the file on Cloudinary
        cloudinaryResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File is uploaded on Cloudinary ", cloudinaryResponse.url);
        fs.unlinkSync(localFilePath)

        return cloudinaryResponse;
    } catch (error) {
        console.error("Error in uploadImageCloud:", error);
        // fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation failed
        return null;
    }
};

export const uploadImage = async (request, response) => {
    if (!request.file) {
        return response.status(404).json("File not found");
    }

    const imageUrl = request.file.path;
    const cloudinaryResponse = await uploadImageCloud(imageUrl);

    if (!cloudinaryResponse) {
        return response.status(400).json({ msg: "Image upload failed" });
    }

    // Extract relevant information from the Cloudinary response
    const responseData = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
        // Add any other relevant fields you want to include
    };

    response.status(200).json(responseData);
};



export const getImage = async (request, response) => {
    try {
        const { filename } = request.params;

        if (!filename) {
            return response.status(400).json({ msg: "Filename not provided" });
        }

        // Generate a secure URL for the image using Cloudinary
        const imageUrl = cloudinary.url(filename, {
            secure: true,
            // Add any additional transformations or parameters you want to include
        });

        // Redirect to the secure URL of the image
        response.redirect(302, imageUrl);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
};

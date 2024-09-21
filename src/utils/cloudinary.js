import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        // console.log("File is uploaded on the cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch (error) {
        console.error("Cloudinary upload error:", error); // Log the exact error
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the operate operation get failed
        throw new Error("Failed to upload avatar to Cloudinary");
    }
}

export { uploadOnCloudinary }
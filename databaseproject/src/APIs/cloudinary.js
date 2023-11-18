import dotenv from 'dotenv';
dotenv.config();
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDINARYSECRET
});

export default cloudinary;

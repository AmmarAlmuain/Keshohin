import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';
import * as streamifier from 'streamifier';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = (
  file: Express.Multer.File,
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  return new Promise<UploadApiResponse | UploadApiErrorResponse>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    },
  );
};

export const deleteImage = async (url: string) => {
  await cloudinary.uploader.destroy(url);
};

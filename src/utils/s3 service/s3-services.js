import { PutObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config()

export class S3Service {
    client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    uploadFile = async (file, keyPrefix = "pictures/profile", userId) => {
        const key = `${keyPrefix}/${userId}-${file.originalname}`;

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        });
        await this.client.send(command);
        return key
    }

 

}
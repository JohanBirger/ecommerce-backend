// images.service.ts
import { Injectable } from '@nestjs/common';
import { S3Client, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';

@Injectable()
export class ImagesService {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucketName = process.env.AWS_BUCKET_NAME; // Replace with your bucket name
  }

  async getImages(): Promise<{ url: string; alt: string }[]> {
    try {
      const { Contents } = await this.s3.send(new ListObjectsCommand({ Bucket: this.bucketName }));

      const imageUrls = Contents?.map((file) => ({
        url: `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
        alt: file.Key || '',
      }));

      return imageUrls || [];
    } catch (error) {
      console.error('Error retrieving files:', error);
      throw error;
    }
  }

  async getUploadURL(): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: uuid(),
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return url;
  }
}
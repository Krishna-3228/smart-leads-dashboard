import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/s3";

/**
 * Generates a pre-signed URL for a private S3 object.
 * @param key - The S3 object key stored in the database
 * @param expiresInSeconds - How long the URL is valid (default: 7 days)
 */
export const getPresignedUrl = async (
  key: string,
  expiresInSeconds = 60 * 60 * 24 * 7 // 7 days
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
};

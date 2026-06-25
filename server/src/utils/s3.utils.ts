import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/s3";

/**
 * Extracts the S3 object key from either:
 *   - A plain key:      "profile-images/123-photo.jpeg"
 *   - An old full URL:  "https://bucket.s3.region.amazonaws.com/profile-images/123-photo.jpeg"
 */
const extractS3Key = (imageUrl: string): string => {
  if (imageUrl.startsWith("https://")) {
    // Strip the bucket/region prefix and return the path
    const url = new URL(imageUrl);
    // url.pathname starts with "/" so slice it off
    return url.pathname.slice(1);
  }
  return imageUrl;
};

/**
 * Generates a pre-signed URL for a private S3 object.
 * Accepts either a raw S3 key or a legacy full S3 URL.
 * Returns null if signing fails (e.g. invalid key or missing permissions).
 *
 * @param imageUrl - The S3 key or full S3 URL stored in the database
 * @param expiresInSeconds - How long the URL is valid (default: 7 days)
 */
export const getPresignedUrl = async (
  imageUrl: string,
  expiresInSeconds = 60 * 60 * 24 * 7 // 7 days
): Promise<string | null> => {
  try {
    const key = extractS3Key(imageUrl);
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    });
    return await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
  } catch (err) {
    console.error("[S3] Failed to generate pre-signed URL for:", imageUrl, err);
    return null;
  }
};


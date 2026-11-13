import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
});

export interface UploadResult {
  url: string;
  public_id: string;
  format?: string;
  width?: number;
  height?: number;
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload image buffer or base64 data to Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder: string = 'portfolio/projects'
): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary belum dikonfigurasi. Isi CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET di environment variables.'
    );
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: 'image' as const,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
      ],
    };

    if (typeof fileBuffer === 'string' && (fileBuffer.startsWith('http') || fileBuffer.startsWith('data:'))) {
      cloudinary.uploader.upload(fileBuffer, uploadOptions, (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'));
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        });
      });
    } else {
      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'));
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
        });
      });

      const buffer = typeof fileBuffer === 'string' ? Buffer.from(fileBuffer, 'base64') : fileBuffer;
      stream.end(buffer);
    }
  });
}

/**
 * Delete asset from Cloudinary by public_id
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured() || !publicId || publicId.startsWith('fallback_')) {
    return true;
  }

  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === 'ok';
  } catch (err) {
    console.error('Failed to delete from Cloudinary:', err);
    return false;
  }
}

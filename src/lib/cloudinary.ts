import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
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

/**
 * Upload image buffer or base64 data to Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer | string,
  folder: string = 'portfolio/projects'
): Promise<UploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  // Fallback if Cloudinary credentials are not configured yet
  if (!cloudName || !apiKey || !apiSecret) {
    if (typeof fileBuffer === 'string' && fileBuffer.startsWith('data:')) {
      return {
        url: fileBuffer,
        public_id: `fallback_${Date.now()}`,
      };
    }
    const base64 = typeof fileBuffer === 'string' ? fileBuffer : fileBuffer.toString('base64');
    return {
      url: `data:image/png;base64,${base64}`,
      public_id: `fallback_${Date.now()}`,
    };
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: 'image' as const,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }, // Auto WebP / AVIF compression
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
  if (!process.env.CLOUDINARY_CLOUD_NAME || publicId.startsWith('fallback_')) {
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

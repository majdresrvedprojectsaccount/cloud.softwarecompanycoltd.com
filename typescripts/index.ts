import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://your-project.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-anon-or-service-role-key'; // Replace with your Supabase Key
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * Upload a file to Supabase Storage
 * @param bucketName - The name of the storage bucket
 * @param filePath - The path to save the file in the bucket
 * @param file - The file to upload
 */
const uploadFile = async (bucketName: string, filePath: string, file: File) => { 
  const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);
  if (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
  console.log('File uploaded successfully:', data);
  return data;
};

/**
 * Download a file from Supabase Storage
 * @param bucketName - The name of the storage bucket
 * @param filePath - The path of the file in the bucket
 */
const downloadFile = async (bucketName: string, filePath: string) => {
  const { data, error } = await supabase.storage.from(bucketName).download(filePath);
  if (error) {
    console.error('Error downloading file:', error.message);
    return null;
  }
  console.log('File downloaded successfully');
  return data;
};

/**
 * Delete a file from Supabase Storage
 * @param bucketName - The name of the storage bucket
 * @param filePath - The path of the file in the bucket
 */
const deleteFile = async (bucketName: string, filePath: string) => {
  const { data, error } = await supabase.storage.from(bucketName).remove([filePath]);
  if (error) {
    console.error('Error deleting file:', error.message);
    return null;
  }
  console.log('File deleted successfully:', data);
  return data;
};

// Example usage
(async () => {
  const bucketName = 'my_bucket';
  const filePath = 'uploads/example.txt';
  const file = new File(['Hello, world!'], 'example.txt', { type: 'text/plain' });

  // Upload a file
  const uploadResponse = await uploadFile(bucketName, filePath, file);

  // Download a file
  const downloadResponse = await downloadFile(bucketName, filePath);

  // Delete a file
  const deleteResponse = await deleteFile(bucketName, filePath);
})();

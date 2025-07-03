'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ComplaintForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !place.trim() || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    let imageUrl = null;
    if (image) {
      try {
        imageUrl = await toBase64(image); // Convert to base64
      } catch (err) {
        console.error('Error converting image to base64:', err);
        alert('Failed to process image. Please try again.');
        return;
      }
    }

   console.log('Request body:', { title, description, place, imageUrl });

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, place, imageUrl })
      });
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response status:', response.status);
        console.error('Response text:', errorData);
        throw new Error(`Failed to submit complaint: ${errorData || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log('Submit response:', data);
      router.push('/complaint');
    } catch (err) {
      console.error('Error submitting complaint:', err);
    }
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <div className="border rounded-lg p-4 text-center bg-gray-100">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto w-full max-w-xs h-40 object-cover rounded mb-2"
          />
        )}
        <label className="cursor-pointer underline text-gray-700">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Title Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <label htmlFor="place">Place</label>
      <input
        id="place"
        type="text"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Confirm
      </button>
    </form>
  );
}
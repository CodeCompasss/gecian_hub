//in this form  to add new lost items 
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeenPlace, setLastSeenPlace] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleSave = () => {
    // Save the item to local storage or a backend API
    const newItem = {
      id: Date.now(), // Generate a unique ID
      name,
      description,
      lastSeenPlace,
      contactInfo,
      status: "lost", // Default status
    };

    // Save to local storage (for demonstration purposes)
    const existingItems = JSON.parse(localStorage.getItem("lostFoundItems") || "[]");
    localStorage.setItem(
      "lostFoundItems",
      JSON.stringify([...existingItems, newItem])
    );

    // Redirect back to the LostFound page
    router.push("/lost-found");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Item Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Seen Place"
          className="w-full p-2 border rounded"
          value={lastSeenPlace}
          onChange={(e) => setLastSeenPlace(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Info"
          className="w-full p-2 border rounded"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
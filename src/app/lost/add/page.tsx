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
      <h1 className="text-3xl font-bold mb-6 text-center">Lost & Found</h1>
      <h1 className="text-2xl font-bold mb-2">Add Details</h1>
      <label className="block border-2 border-black rounded-lg p-6 text-center cursor-pointer hover:bg-gray-300 mb-4">
        <span className="text-sm font-medium underline">Upload image</span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
      <h6 className="text-sm font-medium mb-1">Item Name</h6>
      <input
        type="text"
        placeholder="Item Name"
        className="w-full p-2 border-2 border-black rounded-lg mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h6 className="text-sm font-medium mb-1">Description</h6>
      <textarea
        placeholder="Description"
        className="w-full p-2 border-2 border-black rounded-lg mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <h6 className="text-sm font-medium mb-1">Last Seen Place</h6>
      <input
        type="text"
        placeholder="Last Seen Place"
        className="w-full p-2 border-2 border-black rounded-lg mb-4"
        value={lastSeenPlace}
        onChange={(e) => setLastSeenPlace(e.target.value)}
      />
      <h6 className="text-sm font-medium mb-1">Contact Info</h6>
      <input
        type="text"
        placeholder="Mobile Number"
        className="w-full p-2 border-2 border-black rounded-lg mb-4"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
      />
      <div className="flex justify-center">
        <button
          className="w-[120px] border-2 border-black text-black py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSave}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
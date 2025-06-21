//in this form  to add new lost items 
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import WaveDesign from "../wave/wave_design";
import {  ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

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
    router.push("/lost");
  };

  return (
    <div className="p-4">
      <div className="md:flex">
        <div className="flex items-center justify-center border-[1px] border-black rounded-full w-[40px] h-[40px]">
          <Link href={`/lost`}><ArrowLeftIcon/></Link>
        </div>
        <h1 className="text-3xl font-bold text-center md:ml-[530px]">Lost & Found</h1>
      </div>
      <WaveDesign className=" h-[20px] ml-[53px] md:ml-[42%]"/>
      <h1 className="text-2xl font-bold mb-2 ml-[150px]">Add Details</h1>
      <div className="px-[20px] md:px-[150px]">
        <label className="block border-[1px] border-black h-[100px] md:h-[70px] rounded-lg p-6 text-center cursor-pointer bg-gray-300 mb-3">
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
          className="w-full p-2 border-[1px] border-black/[0.5] hover:border-black rounded-lg mb-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h6 className="text-sm font-medium mb-1">Description</h6>
        <textarea
          placeholder="Description"
          className="w-full p-2 border-[1px] border-black/[0.5] hover:border-black rounded-lg mb-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h6 className="text-sm font-medium mb-1">Last Seen Place</h6>
        <input
          type="text"
          placeholder="Last Seen Place"
          className="w-full p-2 border-[1px] border-black/[0.5] hover:border-black rounded-lg mb-1"
          value={lastSeenPlace}
          onChange={(e) => setLastSeenPlace(e.target.value)}
        />
        <h6 className="text-sm font-medium mb-1">Contact Info</h6>
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-2 border-[1px] border-black/[0.5] hover:border-black rounded-lg mb-1"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="w-[150px] mt-[10px] h-[40px] border-[1px] border-black text-black py-2 rounded-lg bg-[var(--main)]"
            onClick={handleSave}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

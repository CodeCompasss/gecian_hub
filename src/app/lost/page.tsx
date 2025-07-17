//in this we show lost and found items, with a toggle to switch between lost and found items, and a floating button to add new items.
// only implement lost not found items temperoilaily
'use client';
import { useState } from "react";
import Link from "next/link";

// Define the type for an item
type Item = {
  id: number;
  name: string;
  description: string;
  lastSeenPlace: string;
  contactInfo: string;
  status: "lost" | "found";
};

export default function LostFound() {
  const [status, setStatus] = useState<"lost" | "found">("lost");
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Watch",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lastSeenPlace: "College Ground",
      contactInfo: "contact@example.com",
      status: "lost",
    },
    {
      id: 2,
      name: "Water Bottle",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      lastSeenPlace: "Library",
      contactInfo: "contact@example.com",
      status: "found",
    },
  ]);

  // Toggle item status between "lost" and "found"
  const toggleItemStatus = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "lost" ? "found" : "lost" }
          : item
      )
    );
  };

  // Filter items based on the selected status
  const filteredItems = items.filter((item) => item.status === status);

  return (
    <div className="p-4 max-w-md mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">Lost And Found</h1>

      {/* Toggle Buttons */}
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-center ${
            status === "lost" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatus("lost")}
        >
          Lost
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            status === "found" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
          onClick={() => setStatus("found")}
        >
          Found
        </button>
      </div>

      {/* List of Items */}
      {filteredItems.map((item) => (
        <div key={item.id} className="mb-4 border p-4 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-300 mb-2"></div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm font-medium text-gray-600">
              Last Seen Place: {item.lastSeenPlace}
            </p>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Contact: {item.contactInfo}
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-blue-600">Report</button>
              <button className="border px-3 py-1 rounded">Edit</button>
              <button
                className="border px-3 py-1 rounded bg-green-600 text-white"
                onClick={() => toggleItemStatus(item.id)}
              >
                {item.status === "lost" ? "Mark as Found" : "Mark as Lost"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Floating "+" Button */}
      <Link href="/lost/add">
        <button className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
          +
        </button>
      </Link>
    </div>
  );
}
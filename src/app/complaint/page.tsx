'use client';

import { useState,useEffect } from 'react';
import ComplaintCard from '@/components/complaint/Complaintcard';
import Tabs from '@/components/complaint/Tabs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Complaint = {
  id: number;
  title: string;
  description: string;
  place: string;
  date: string;
  solved: boolean;
  imageUrl?: string;
  comments?: { id: number; text: string; timestamp: string }[];
};

export default function ComplaintPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'solved' | 'unsolved'>('unsolved');
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const response = await fetch('/api/complaints');
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setComplaints(data);
      } catch (err) {
        console.error('Error fetching complaints:', err);
      }
    }

    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen p-4 pb-28 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Complaint</h1>
      
      <Tabs selected={selectedTab} onChange={setSelectedTab} />
      
      {complaints
        .filter((c) => c.solved === (selectedTab === 'solved'))
        .map((c) => (
          <ComplaintCard key={c.id} complaint={c} />
        ))}

      <Link href="/complaint/new">
        <button
          className="fixed bottom-24 right-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full text-2xl shadow-lg"
          aria-label="Add new complaint"
        >
          +
        </button>
      </Link>

      <button
        onClick={() => router.back()}
        className="text-xl absolute top-32 left-4 bg-white p-2 rounded-full shadow-md z-10"
        aria-label="Go Back"
      >
        ←
      </button>
    </div>
  );
}
//this map can we done in two ways
// 1)make your own map using svg and uploading as pdf 
// 2) make a madpeddin map of your college or school and in home page redirect to that map
'use client';
import { FloorButtons } from '@/components/map/floorButton';

const floorData = [
  { floorNumber: 'Ground', pdfLink: '/pdfs/ground-floor.pdf' },
  { floorNumber: '1', pdfLink: '/pdfs/first-floor.pdf' },
  { floorNumber: '2', pdfLink: '/pdfs/second-floor.pdf' },
  { floorNumber: '3', pdfLink: '/pdfs/third-floor.pdf' },
];

export default function CollegeMapPage() {
  return (
    <div>
      <FloorButtons floors={floorData} />
    </div>
  );
}
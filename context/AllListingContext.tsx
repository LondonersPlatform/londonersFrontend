'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AvailableData {
  checkIn: string;
  checkOut: string;
  minOccupancy?: number;
}

interface AllListingContextType {
  data: any;
  setData: (data: any) => void;
  copyData: any;
  setCopyData: (data: any) => void;
  available: AvailableData | null;
  setAvailableData: (data: AvailableData) => void;
}

const AllListingContext = createContext<AllListingContextType | undefined>(undefined);

export function AllListingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<any>(null);
  const [copyData, setCopyData] = useState<any>(null);
  const [available, setAvailableData] = useState<AvailableData | null>(null);

  return (
    <AllListingContext.Provider value={{ 
      data, 
      setData, 
      copyData, 
      setCopyData, 
      available, 
      setAvailableData 
    }}>
      {children}
    </AllListingContext.Provider>
  );
}

export function useAllListing() {
  const context = useContext(AllListingContext);
  if (context === undefined) {
    throw new Error('useAllListing must be used within an AllListingProvider');
  }
  return context;
}

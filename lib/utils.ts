import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import VideosList from "../VideosList.json"; // adjust the path if needed
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getVideoByListingIdjson(listingId: string): string | null {
  const video = VideosList.find((item) => item["LISTING ID"] === listingId);
  return video?.["YOUTUBE VIDEO URL"] ?? null;
}
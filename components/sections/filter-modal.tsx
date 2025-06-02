"use client";

import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  X,
  ChevronRight,
  Wifi,
  Wind,
  UtensilsCrossed,
  Baby,
  Accessibility,
  Clover,
  Table2,
  SprayCan,
  Coffee,
  Bike,
  Table,
  WashingMachine,
  BatteryCharging,
  Flame,
  Fish,
  PersonStanding,
  Users,
  Cat,
  Wine,
  Sailboat,
  Umbrella,
  TowerControl,
  CookingPot,
  FerrisWheel,
  Tv,
  Speaker,
  AlertCircle,
  ShoppingCart,
  SoapDispenserDroplet,
  Mountain,
  Home,
  ParkingCircle,
  Sofa,
  Landmark,
  Microwave,
  Laptop,
  Utensils,
  Trees,
  Play,
  ThermometerSun,
  Flower2,
  Snowflake,
  Bath,
  Bed,
  BabyIcon,
  ChevronLeft,
} from "lucide-react";

interface FiltersModalProps {
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  filterListings: any;
  setShowFilters: (show: boolean) => void;
}

interface FilterState {
  bedrooms: number | null;
  beds: number;
  bathrooms: number;
  priceRange: [number, number];
  amenities: string[];
}

export default function FiltersModal({
  onClose,
  setShowFilters,
  filterListings,
  onApply,
}: FiltersModalProps) {
  const [filters, setFilters] = useState<FilterState>({
    bedrooms: null,
    beds: 1,
    bathrooms: 1,
    priceRange: [0, 10000],
    amenities: [],
  });

  useEffect(() => {
    onApply(filters);
  }, [filters, onApply]);

  const histogramData = Array.from({ length: 50 }, (_, i) => {
    if ((i > 10 && i < 15) || (i > 25 && i < 30) || (i > 40 && i < 45)) {
      return Math.floor(Math.random() * 30) + 40; // Higher values for peaks
    } else {
      return Math.floor(Math.random() * 20) + 5; // Lower values for non-peaks
    }
  });

  // Normalize histogram data for display
  const maxDataValue = Math.max(...histogramData);
  const normalizedData = histogramData.map((value) => value / maxDataValue);

  // Calculate which bars should be highlighted (between min and max)
  const highlightedBars = normalizedData.map((_, index) => {
    const barValue = 0 + (index / (normalizedData.length - 1)) * (10000 - 0);
    return (
      barValue >= filters.priceRange[0] && barValue <= filters.priceRange[1]
    );
  });

  const amenitiesList = [
    {
      id: "accessible-toilet",
      label: "Accessible-height toilet",
      icon: <Accessibility className="w-4 h-4 mr-2" />,
    },
    {
      id: "air-conditioning",
      label: "Air conditioning",
      icon: <Snowflake className="w-4 h-4 mr-2" />,
    },

    {
      id: "babysitter",
      label: "Babysitter recommendations",
      icon: <Baby className="w-4 h-4 mr-2" />,
    },
    {
      id: "bathtub",
      label: "Bathtub",
      icon: <Bath className="w-4 h-4 mr-2" />,
    },
    {
      id: "bed-linens",
      label: "Bed linens",
      icon: <Bed className="w-4 h-4 mr-2" />,
    },
    {
      id: "body-soap",
      label: "Body soap",
      icon: <BabyIcon className="w-4 h-4 mr-2" />,
    },
    {
      id: "cable-tv",
      label: "Cable TV",
      icon: <Tv className="w-4 h-4 mr-2" />,
    },
    {
      id: "co-detector",
      label: "Carbon monoxide detector",
      icon: <AlertCircle className="w-4 h-4 mr-2" />,
    },
    {
      id: "casinos",
      label: "Casinos",
      icon: <Clover className="w-4 h-4 mr-2" />,
    },
    {
      id: "changing-table",
      label: "Changing table",
      icon: <Table2 className="w-4 h-4 mr-2" />,
    },
    {
      id: "cleaning-disinfection",
      label: "Cleaning Disinfection",
      icon: <SprayCan className="w-4 h-4 mr-2" />,
    },
    {
      id: "coffee",
      label: "Coffee",
      icon: <Coffee className="w-4 h-4 mr-2" />,
    },
    {
      id: "coffee-maker",
      label: "Coffee maker",
      icon: <Coffee className="w-4 h-4 mr-2" />,
    },
    { id: "crib", label: "Crib", icon: <Baby className="w-4 h-4 mr-2" /> },
    {
      id: "cycling",
      label: "Cycling",
      icon: <Bike className="w-4 h-4 mr-2" />,
    },
    {
      id: "dining-table",
      label: "Dining table",
      icon: <Table className="w-4 h-4 mr-2" />,
    },
    {
      id: "dishwasher",
      label: "Dishwasher",
      icon: <WashingMachine className="w-4 h-4 mr-2" />,
    },
    // { id: "dryer", label: "Dryer", icon: <Dry className="w-4 h-4 mr-2" /> },
    {
      id: "ev-charger",
      label: "EV charger",
      icon: <BatteryCharging className="w-4 h-4 mr-2" />,
    },
    {
      id: "fire-extinguisher",
      label: "Fire extinguisher",
      icon: <Flame className="w-4 h-4 mr-2" />,
    },

    {
      id: "fishing",
      label: "Fishing",
      icon: <Fish className="w-4 h-4 mr-2" />,
    },
    // { id: "freezer", label: "Freezer", icon: <machine className="w-4 h-4 mr-2" /> },
    {
      id: "garden-view",
      label: "Garden View",
      icon: <Trees className="w-4 h-4 mr-2" />,
    },
    {
      id: "garden",
      label: "Garden or backyard",
      icon: <Flower2 className="w-4 h-4 mr-2" />,
    },
    {
      id: "golf",
      label: "Golf - Optional",
      icon: <Play className="w-4 h-4 mr-2" />,
    },

    {
      id: "heating",
      label: "Heating",
      icon: <ThermometerSun className="w-4 h-4 mr-2" />,
    },

    {
      id: "internet",
      label: "Internet",
      icon: <Wifi className="w-4 h-4 mr-2" />,
    },
    {
      id: "kitchen",
      label: "Kitchen",
      icon: <Utensils className="w-4 h-4 mr-2" />,
    },
    {
      id: "laptop-friendly",
      label: "Laptop friendly workspace",
      icon: <Laptop className="w-4 h-4 mr-2" />,
    },
    {
      id: "microwave",
      label: "Microwave",
      icon: <Microwave className="w-4 h-4 mr-2" />,
    },
    {
      id: "museums",
      label: "Museums",
      icon: <Landmark className="w-4 h-4 mr-2" />,
    },
    {
      id: "outdoor-seating",
      label: "Outdoor seating",
      icon: <Sofa className="w-4 h-4 mr-2" />,
    },
    // { id: "oven", label: "Oven", icon: <Oven className="w-4 h-4 mr-2" /> },
    {
      id: "parking",
      label: "Paid parking off premises",
      icon: <ParkingCircle className="w-4 h-4 mr-2" />,
    },
    {
      id: "patio",
      label: "Patio or balcony",
      icon: <Home className="w-4 h-4 mr-2" />,
    },
    // { id: "refrigerator", label: "Refrigerator", icon: <Fridge className="w-4 h-4 mr-2" /> },
    {
      id: "rock-climbing",
      label: "Rock Climbing",
      icon: <Mountain className="w-4 h-4 mr-2" />,
    },
    {
      id: "shampoo",
      label: "Shampoo",
      icon: <SoapDispenserDroplet className="w-4 h-4 mr-2" />,
    },
    {
      id: "shopping",
      label: "Shopping",
      icon: <ShoppingCart className="w-4 h-4 mr-2" />,
    },
    {
      id: "smoke-detector",
      label: "Smoke detector",
      icon: <AlertCircle className="w-4 h-4 mr-2" />,
    },
    {
      id: "stereo",
      label: "Stereo system",
      icon: <Speaker className="w-4 h-4 mr-2" />,
    },
    // { id: "stove", label: "Stove", icon: <Stove className="w-4 h-4 mr-2" /> },
    { id: "tv", label: "TV", icon: <Tv className="w-4 h-4 mr-2" /> },
    {
      id: "theme-parks",
      label: "Theme Parks",
      icon: <FerrisWheel className="w-4 h-4 mr-2" />,
    },
    {
      id: "toaster",
      label: "Toaster",
      icon: <CookingPot className="w-4 h-4 mr-2" />,
    },
    {
      id: "towels",
      label: "Towels provided",
      icon: <TowerControl className="w-4 h-4 mr-2" />,
    },
    {
      id: "washer",
      label: "Washer",
      icon: <WashingMachine className="w-4 h-4 mr-2" />,
    },
    {
      id: "water-parks",
      label: "Water Parks",
      icon: <Umbrella className="w-4 h-4 mr-2" />,
    },
    {
      id: "water-sports",
      label: "Water Sports",
      icon: <Sailboat className="w-4 h-4 mr-2" />,
    },
    {
      id: "wine-glasses",
      label: "Wine glasses",
      icon: <Wine className="w-4 h-4 mr-2" />,
    },
    { id: "zoo", label: "Zoo", icon: <Cat className="w-4 h-4 mr-2" /> },
    {
      id: "family-friendly",
      label: "Family/kid friendly",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      id: "infant-friendly",
      label: "Suitable for infants (under 2 years)",
      icon: <Baby className="w-4 h-4 mr-2" />,
    },
    {
      id: "child-friendly",
      label: "Suitable for children (2-12 years)",
      icon: <PersonStanding className="w-4 h-4 mr-2" />,
    },
  ];

  const toggleAmenity = (id: string) => {
    setFilters((prev) => {
      if (prev.amenities.includes(id)) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== id) };
      } else {
        return { ...prev, amenities: [...prev.amenities, id] };
      }
    });
  };

  const handleClearAll = () => {
    setFilters({
      bedrooms: null,
      beds: 1,
      bathrooms: 1,
      priceRange: [0, 10000],
      amenities: [],
    });
  };

  const formatPrice = (value: number) => {
    return value >= 1000 ? `$${value / 1000}K` : `$${value}`;
  };
  const [showAll, setShowAll] = useState(false);

  const visibleAmenities = showAll ? amenitiesList : amenitiesList.slice(0, 10);

  return (
    <div className="fixed inset-0   shadow-lg border rounded-2xl bg-[#00000066] backdrop-blur-sm z-50 ">
      <div className=" p-6 relative bg-white my-6 rounded-2xl mx-auto  max-w-3xl">
        <div className="max-w-3xl bg-white h-[90vh]  px-3 overflow-auto">
          <div className="flex absolute right-[-12px] top-[-15px] items-center justify-center bg-white rounded-full w-12 h-12  hover:bg-gray-100">
            <button onClick={onClose} className="rounded-full ">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Rooms and beds */}
          <div className=" mb-8">
            <h2 className="text-xl font-semibold mb-6">Rooms and beds</h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="font-medium">Bedrooms</div>
                <div className="flex items-center">
                  <button
                    className={`rounded-full w-8 h-8 flex items-center justify-center border ${
                      (filters.bedrooms || 0) <= 1
                        ? "border-gray-200 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    disabled={(filters.bedrooms || 0) <= 1}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        bedrooms: (prev.bedrooms || 0) - 1,
                      }))
                    }
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span className=" px-4">{filters.bedrooms}</span>
                  <button
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        bedrooms: (prev.bedrooms || 0) + 1,
                      }))
                    }
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="font-medium">Beds</div>
                <div className="flex items-center space-x-4">
                  <button
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        beds: Math.max(0, prev.beds - 1),
                      }))
                    }
                    disabled={filters.beds <= 1}
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span>{filters.beds}</span>
                  <button
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, beds: prev.beds + 1 }))
                    }
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="font-medium">Bathrooms</div>
                <div className="flex items-center space-x-4">
                  <button
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        bathrooms: Math.max(0, prev.bathrooms - 1),
                      }))
                    }
                    disabled={filters.bathrooms <= 0}
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <span>{filters.bathrooms}</span>
                  <button
                    className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 hover:border-gray-400"
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        bathrooms: prev.bathrooms + 1,
                      }))
                    }
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 border-b border-gray-200"></div>
          </div>

          {/* Price range */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Price range</h2>

            {/* Histogram */}
            <div className="relative h-24 ">
              <div className="absolute inset-0 flex items-end">
                {normalizedData.map((height, index) => (
                  <div
                    key={index}
                    className={`w-full h-[${Math.max(
                      height * 100,
                      5
                    )}%] mx-[1px] ${
                      highlightedBars[index] ? "bg-black" : "bg-gray-300"
                    }`}
                    style={{ height: `${Math.max(height * 100, 5)}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="relative  ">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={filters.priceRange}
                min={0}
                max={10000}
                step={100}
                onValueChange={(newValues) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: newValues as [number, number],
                  }))
                }
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
                  <Slider.Range className="absolute bg-black rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Minimum price"
                />
                <Slider.Thumb
                  className="block w-5 h-5 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                  aria-label="Maximum price"
                />
              </Slider.Root>

              {/* Min/Max Labels */}
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <div className="flex flex-col items-start">
                  <span>Minimum</span>
                  <div className="mt-1 px-3 py-1 border rounded-full">
                    {formatPrice(filters.priceRange[0])}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span>Maximum</span>
                  <div className="mt-1 px-3 py-1 border rounded-full">
                    {formatPrice(filters.priceRange[1])}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 border-b border-gray-200"></div>
          </div>

          {/* Amenities */}
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-6">Amenities</h2>

            <>
              <div className="flex flex-wrap gap-2">
                {visibleAmenities.map((amenity) => (
                  <button
                    key={amenity.id}
                    className={`flex items-center px-4 py-2 rounded-full border ${
                      filters.amenities.includes(amenity.label)
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => toggleAmenity(amenity.label)}
                  >
                    {amenity.icon}
                    {amenity.label}
                  </button>
                ))}
              </div>

              {amenitiesList.length > 10 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center mt-4 font-semibold"
                >
                  {showAll ? (
                    <>
                      Show less <ChevronLeft className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Show more <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              )}
            </>

            <div className="mt-6 border-b border-gray-200"></div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleClearAll}
              className="flex items-center text-black underline"
            >
              Clear all <X className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                onApply(filters);
                setShowFilters(false);
              }}
              className="bg-black text-white rounded-lg px-6 py-3"
            >
              Show {filterListings.length} places
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

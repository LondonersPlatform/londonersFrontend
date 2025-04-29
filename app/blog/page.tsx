import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Mock blog data
const blogPosts = [
  {
    id: 1,
    slug: "planning-vacation-london",
    title:
      "Planning a vacation in London: Discovering Your Perfect Home Away from Home",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue. Duis mattis lorem neque.",
    image: "./blog0.png",
    date: "March 15, 2025",
  },
  {
    id: 2,
    slug: "luxury-accommodations-london",
    title: "Luxury Accommodations in London: The Ultimate Guide",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus.",
    image: "./blog0.png",
    date: "March 10, 2025",
  },
  {
    id: 3,
    slug: "hidden-gems-london",
    title: "Hidden Gems in London: Off the Beaten Path",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
    image: "./blog0.png",
    date: "March 5, 2025",
  },
  {
    id: 4,
    slug: "family-friendly-london",
    title: "Family-Friendly Activities in London",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
    image: "./blog0.png",
    date: "February 28, 2025",
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto  px-24 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>

        <div className="space-y-12 ">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border-b border-gray-200 pb-12 last:border-0"
            >
              <div className="relative h-[400px] w-full mb-6 overflow-hidden rounded-lg">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Read more
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center">
            1
          </button>

          <button className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            2
          </button>

          <button className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            3
          </button>

          <button className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
            ...
          </button>

          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
}

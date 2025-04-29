import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    slug: "planning-vacation-london",
    title: "Planning a vacation in London: Discovering Your Perfect Home Away from Home",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue. Duis mattis lorem neque.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue. Duis mattis lorem neque.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue. Duis mattis lorem neque.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue. Duis mattis lorem neque.",
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-yHezRmQvXGZZx77lsMidbQIQHbjabx.png",
    date: "March 15, 2025",
  },
  {
    id: 2,
    slug: "luxury-accommodations-london",
    title: "Luxury Accommodations in London: The Ultimate Guide",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus.",
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-yHezRmQvXGZZx77lsMidbQIQHbjabx.png",
    date: "March 10, 2025",
  },
  {
    id: 3,
    slug: "hidden-gems-london",
    title: "Hidden Gems in London: Off the Beaten Path",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-yHezRmQvXGZZx77lsMidbQIQHbjabx.png",
    date: "March 5, 2025",
  },
  {
    id: 4,
    slug: "family-friendly-london",
    title: "Family-Friendly Activities in London",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.",
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blog-yHezRmQvXGZZx77lsMidbQIQHbjabx.png",
    date: "February 28, 2025",
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug) || blogPosts[0]

  return (
    <div className="flex min-h-screen flex-col">


      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>

        <div className="relative h-[300px] w-full mb-8 overflow-hidden rounded-lg">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          {post.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>
      </main>


    </div>
  )
}


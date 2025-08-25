import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-12 text-white">
      <div className="md:w-[85%]  w-[96%] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div>
            <Image
              src="/LonD.svg"
              alt="Stamp"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="flex   flex-col justify-center items-center ">
            <div className="flex   justify-center   space-x-4">
              <Link href="https://www.facebook.com/londonerscom">
                <img src={"/facebookIcon.svg"} className=" w-[36px]" />
              </Link>
              <Link href="https://www.instagram.com/londonerscom">
                <img src={"/instagramIcon.svg"} className=" w-[36px]" />
              </Link>
              <Link href="https://youtube.com/@londoners.com.?si=V4eyp_SVmU6ATFFb ">
                <img src={"/youtubeIcon.svg"} className=" w-[36px]" />
              </Link>
            </div>

            <div className=" flex flex-col items-center justify-center space-y-4  pt-8 text-sm text-gray-400 md:flex-row md:space-x-8 md:space-y-0">
              <Link href="/privacy-policy" className="hover:text-black ">
                Privacy policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-black">
                Terms and conditions
              </Link>
              <Link href="/blog" className="hover:text-black">
                Blog
              </Link>
            </div>

            <div>
              <div className="mt-8 text-center text-sm text-gray-500">
                Londoners - 2025 All rights reserved
              </div>
            </div>
          </div>
          <div className=" mt-12  md:relative">
            <Image
              src="/f0.svg"
              alt="LONDONERS"
              width={150}
              height={200}
              className=" object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

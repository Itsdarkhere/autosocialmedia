import Link from "next/link";
import happy from "../public/happy.svg";
import Image from "next/image";

export default function Hero() {
  return (
    <div className=' bg-neutral-50 w-full flex flex-col md:flex-row justify-between items-center max-w-7xl'>
      <div className=' flex flex-col justify-center items-center md:items-start gap-10 py-12 md:py-24'>
        <div className=" w-full max-w-[550px] text-center md:text-start flex flex-col gap-3">
            <h1 className=' text-blue-500 font-bold text-4xl md:text-6xl'>
            Grow your linkedin<br/>on auto-pilot
            </h1>
            <h2 className=' max-w-[400px] text-neutral-500 text-sm'>
            Our AI post automation tool allows you to create fantastic content,
            specific to your industry, with ease
            </h2>
        </div>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <Link
            href={"/login"}
            className=' px-8 py-3 w-full max-w-72 rounded-md focus:outline focus:outline-offset-2 focus:outline-blue-500 focus:outline-2 bg-blue-500 text-white font-semibold'
          >
            Try EasyLinkedin for free
          </Link>
          <span className=" text-sm text-neutral-500">( no credit card required )</span>
        </div>
      </div>
      <div className=''>
        <Image height={550} width={500} src={happy} alt='happy people' />
      </div>
    </div>
  );
}

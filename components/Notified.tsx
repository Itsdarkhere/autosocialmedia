import Image from "next/image";
import mailbox from "../public/mailbox.svg";

export default function Notified() {
  return (
    <div className=' w-full bg-blue-600 px-5 md:px-16 py-6 md:py-8 mx-auto max-w-7xl rounded-lg flex flex-row justify-between items-center'>
      <div>
        <h4 className=' mb-1 md:mb-3 text-neutral-50 font-semibold text-xl md:text-4xl'>
          Get notified about updates
        </h4>
        <h6 className=' mb-6 text-neutral-200'>
          Leave your email and we will inform you if we add new components
        </h6>
        <EmailInput />
      </div>
      <Image
        className=' hidden md:block'
        src={mailbox}
        alt='mailbox'
        height={300}
        width={300}
      />
    </div>
  );
}

function EmailInput() {
  return (
    <div className='flex h-12 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-neutral-200 rounded-md shadow-md w-min flex-row items-center'>
      <input
        type='email'
        className=' rounded-l-md rounded-r-none outline-none md:w-80 max-w-full h-full px-3 py-2'
        placeholder='bob@example.com'
      />
      <button className=' h-full px-5 py-2 text-sm rounded-r-md border-none outline-none bg-blue-800 text-neutral-50 font-semibold'>
        Subscribe
      </button>
    </div>
  );
}

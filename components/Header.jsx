import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import { checkUser } from '@/lib/checkUser';

const Header = async () => {

  await checkUser()
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b-2'>
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src={"/logo.png"} alt="welth logo" height={60} width={200} className='h-12 w-auto ml-4 object-contain'/>
        </Link>
        

        <div className='flex items-center space-x-8'>
          <SignedIn>
            <Link href={"/dashboard"} className='text-gray-700 hover:text-blue-700 bg-zinc-50 flex items-center gap-3 '>
              <Button variant="outline" className="rounded ">
                <LayoutDashboard size={22} />
                <span className='hidden md:inline text-[15px] text-semibold px-2 py-1'>DashBoard</span>

              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2  bg-black text-white hover:bg-black hover:text-white rounded">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>


          <SignedOut>
            <SignInButton forceRedirectUrl='/dashboard'>
              <Button variant="outline" className="rounded px-6 py-2 ml-18 hover:text-blue-600 ">Login</Button>
             </SignInButton>
          </SignedOut>
          <SignedIn>
             <UserButton  
             appearance={{
              elements:{
                avatorBox: "w-16 h-16"
              }
             }} />
          </SignedIn>


        </div>
      </nav>





        
    </div>
  );
};

export default Header;
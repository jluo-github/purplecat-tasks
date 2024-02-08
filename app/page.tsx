import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import cat1 from "@/assets/cat1.png";
import cat9 from "@/assets/cat9.png";
import cat13 from "@/assets/cat13.png";

export default function Home() {
 return (
  <main>
   <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6'>
    {/* <Image src={cat1} alt='logo' width={100} height={100} /> */}
   </header>

   <section className='max-w-6xl mx-auto px-4 sm:px-8 py-6 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center'>
    <div className='pt-20 px-8'>
     <h1 className='capitalize text-4xl md:text-7xl font-bold'>
      <span className='text-primary'>PurpleCat</span> Tasks
     </h1>
     <p className='leading-lose max-w-md mt-4 text-xl'>
      Stay Organized and Efficient. Keep track of your tasks and priorities all
      in one place
     </p>
     <Button asChild className='mt-4'>
      <Link href='/tasks'>Get Started</Link>
     </Button>
    </div>
    <Image
     src={cat1}
     alt='landing'
     className='mx-auto mb-8 p-12 lg:m-auto lg:p-4 lg:block'
    />
   </section>
  </main>
 );
}

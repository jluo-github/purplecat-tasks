import type React from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const ScrollUpButton = () => {
 return (
  <Button
   className=' fixed bottom-5 right-6 z-50 cursor-pointer p-4'
   variant='secondary'
   size='sm'
   onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
   }}>
   <ArrowUp />
  </Button>
 );
};
export default ScrollUpButton;

import gemini from '@/config/gemini-config';
import React, { useContext } from 'react';
import { MdOutlineKeyboardVoice } from "react-icons/md";
import WelcomeBox from './WelcomeBox';
import { GeminiContext } from '@/context/GeminiContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import geminiImage from "@/assets/google-gemini-icon.webp";
import { Skeleton } from '@/components/ui/skeleton';

const ContentContainer = () => {
   const {
      isLoading,
      recentData,
      showResults,
      setRecentData,
      resultData,
      setResultData,
      inputText,
      recentInput,
      onSend,
      setInputText
   } = useContext(GeminiContext);

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault(); // Prevents the default behavior of the Enter key
         onSend(); // Calls the onSend function
      }
   };

   return (
      <div className='flex flex-col h-[calc(100vh-80px)] '>
         <div>
            {!showResults ? <WelcomeBox /> : <div className='result-container max-w-5xl mx-auto h-[73vh] overflow-y-scroll px-10 pb-4 pt-10'>
               <div className='flex items-start gap-3'>
                  <Avatar>
                     <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                     <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                     <p>{recentInput}</p>
                  </div>
               </div>
               <div className='mt-8 flex items-start gap-3'>
                  <img src={geminiImage} alt='gemini' className={`w-10 ${isLoading ? "animate-spin duration-1000" : ""}`} />
                  {isLoading ? <div className="space-y-2 w-full">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-11/12" />
                  </div> :
                     <div dangerouslySetInnerHTML={{ __html: resultData }} />}
               </div>
            </div>}
         </div>

         {/* prompt input */}
         <div className='mt-auto flex flex-col justify-center items-center px-5 lg:px-0'>
            <div className='bg-[#1E1F20] rounded-full w-full max-w-4xl relative'>
               <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder='Enter a prompt here'
                  className='bg-[#1E1F20] placeholder:text-gray-400 rounded-full py-5 text-[17px] w-full outline-none font-medium px-7'
               />
               <div className='absolute top-1/2 right-5 -translate-y-1/2 flex items-center'>
                  <button className='p-4 flex items-center justify-center hover:bg-[#37393B] rounded-full transition-all duration-300'>
                     <MdOutlineKeyboardVoice className='text-2xl' />
                  </button>
                  {inputText ? <button onClick={onSend} className='p-4 flex items-center justify-center hover:bg-[#37393B] rounded-full transition-all duration-300'>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </button> : null}
               </div>
            </div>
            <p className='text-sm text-center font-medium mt-3 text-[#A3B2C1]'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps</p>
         </div>
      </div>
   );
};

export default ContentContainer;

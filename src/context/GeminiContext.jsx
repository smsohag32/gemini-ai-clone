import gemini from "@/config/gemini-config";
import { createContext, useState } from "react";

export const GeminiContext = createContext(null);

const GeminiProvider = ({ children }) => {
   const [isLoading, setIsLoading] = useState(false);
   const [inputText, setInputText] = useState("")
   const [recentData, setRecentData] = useState([])
   const [showResults, setShowResults] = useState(false)
   const [resultData, setResultData] = useState("")
   const [recentInput, setRecentInput] = useState("")


   const delayPara = (index, wordText) => {
      setTimeout(function () {
         setResultData(prev => prev + wordText);
      }, 75 * index);
   }

   const onSend = async () => {
      setResultData("");
      setIsLoading(true);
      setShowResults(true);
      setRecentInput(inputText);

      const response = await gemini(inputText);
      let newArray = response.split(" ");

      console.log(newArray);

      for (let i = 0; i < newArray.length; i++) {
         const wordText = newArray[i];
         delayPara(i, wordText + " ");
      }

      setIsLoading(false);
      setInputText("");
   }

   const value = {
      isLoading,
      recentData,
      recentInput,
      onSend,
      showResults,
      setRecentData,
      resultData,
      setResultData,
      setIsLoading,
      inputText,
      setInputText
   };



   return (
      <GeminiContext.Provider value={value}>
         {children}
      </GeminiContext.Provider>
   );
};

export default GeminiProvider

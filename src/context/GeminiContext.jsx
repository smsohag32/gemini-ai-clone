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
      setTimeout(() => {
         setResultData(prev => prev + wordText);
      }, 6 * index);
   }
   const formateResult = (response) => {
      setResultData(""); // Clear existing content
      let htmlContent = "";
      const lines = response.split("\n");

      lines.forEach((line, index) => {
         if (line.startsWith("http")) {
            // Handle links
            htmlContent += `<a href="${line}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${line}</a><br />`;
         } else if (line.startsWith("```")) {
            // Handle code blocks
            htmlContent += `<pre class="bg-gray-200 p-4 rounded"><code>${line.replace(/```/g, "")}</code></pre><br />`;
         } else if (line.startsWith("### ")) {
            // Handle H3 headings
            htmlContent += `<h3 class="text-lg font-semibold">${line.replace("### ", "")}</h3><br />`;
         } else if (line.startsWith("## ")) {
            // Handle H2 headings
            htmlContent += `<h2 class="text-xl font-bold">${line.replace("## ", "")}</h2><br />`;
         } else if (line.startsWith("# ")) {
            // Handle H1 headings
            htmlContent += `<h1 class="text-2xl font-extrabold">${line.replace("# ", "")}</h1><br />`;
         } else if (line.startsWith("* ") || line.startsWith("- ") || line.match(/^\d+\.\s/)) {
            // Handle unordered and ordered lists
            const listTag = line.startsWith("* ") || line.startsWith("- ") ? "ul" : "ol";
            htmlContent += `<${listTag} class="list-disc pl-5"><li>${line.replace(/^[-*\d+.\s]/, "")}</li></${listTag}><br />`;
         } else if (line.startsWith("> ")) {
            // Handle blockquotes
            htmlContent += `<blockquote class="border-l-4 border-gray-500 pl-4 italic">${line.replace(/^> /, "").trim()}</blockquote><br />`;
         } else if (line.startsWith("![") && line.includes("](")) {
            // Handle images
            const altText = line.match(/!\[(.*?)\]/)[1];
            const url = line.match(/\((.*?)\)/)[1];
            htmlContent += `<img src="${url}" alt="${altText}" class="max-w-full h-auto" /><br />`;
         } else if (line.includes("`")) {
            // Handle inline code
            const inlineCode = line.replace(/`/g, "");
            htmlContent += `<code class="bg-gray-200 px-1 py-0.5 rounded">${inlineCode}</code>`;
         } else {
            // Handle plain text with bold and italic text
            let formattedLine = line
               .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Handle bold text
               .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Handle bold text
               .replace(/\*(.*?)\*/g, "<em>$1</em>"); // Handle italic text
            htmlContent += `<p>${formattedLine}</p><br />`;
         }
      });

      // Ensure all lists are closed
      if (htmlContent.includes("<ul>")) htmlContent += "</ul>";
      if (htmlContent.includes("<ol>")) htmlContent += "</ol>";

      // Delay the rendering of each part of the HTML content
      htmlContent.split("").forEach((char, index) => {
         delayPara(index, char);
      });
   };




   const onSend = async () => {
      setResultData("");
      setIsLoading(true);
      setShowResults(true);
      setRecentInput(inputText);

      const response = await gemini(inputText);
      console.log(response);

      formateResult(response);

      setIsLoading(false);
      setInputText("");
   };


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

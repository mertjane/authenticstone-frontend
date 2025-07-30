// src/components/SafeHTML.tsx
import React from 'react';
import DOMPurify from 'dompurify';

interface SafeHTMLProps {
  html: string;
  className?: string;
}

const SafeHTML: React.FC<SafeHTMLProps> = ({ html, className }) => {
  const cleanHTML = DOMPurify.sanitize(html);
  
  return (
    <div 
      className={`${className || ''} 
        [&_h1]:text-5xl [&_h1]:font-light [&_h1]:mb-6
        [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4
        [&_h3]:text-2xl [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3
        [&_p]:text-lg w-full [&_p]:leading-relaxed tracking-wide [&_p]:mb-5
        [&_a]:underline  [&_a]:font-medium
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6
        [&_li]:mb-2
        [&_img]:rounded-lg [&_img]:shadow-md [&_img]:my-6 [&_img]:mx-auto
        [&_hr]:my-8 [&_hr]:border-gray-200
        [&_.wp-block-heading]:text-center
        [&_.has-text-align-center]:text-center
        [&_.wp-block-columns]:flex [&_.wp-block-columns]:flex-wrap [&_.wp-block-columns]:gap-6 [&_.wp-block-columns]:my-8
        [&_.wp-block-column]:flex-1 
      `}
      dangerouslySetInnerHTML={{ __html: cleanHTML }} 
    />
  );
};

export default SafeHTML;
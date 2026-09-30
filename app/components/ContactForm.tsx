"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "../i18n/client";

export function ContactForm() {
  const locale = useParams().lang as string;
  const { t } = useTranslation(locale, "footer");

  return (
    <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#0d0d0d] pt-32 pb-24 text-black dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-6 text-black dark:text-white">Contact Us</h1>
          <p className="text-black dark:text-white dark:text-white max-w-2xl mx-auto font-[family-name:var(--font-inter)] tracking-wide">
            We are here to assist you with any inquiries regarding our collections, bespoke orders, or general questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-[#d4af37]">Headquarters</h3>
              <p className="font-[family-name:var(--font-inter)] text-black dark:text-white dark:text-white leading-relaxed text-sm">
               C-97, 4th Floor, Sumel Business Park-2, <br /> Kankaria Road, Behind Vanijya Bhavan, <br />Sherkotda, Ahmedabad, Gujarat, <br />380002, India
              </p>
            </div>
            
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-[#d4af37]">Connect</h3>
              <p className="font-[family-name:var(--font-inter)] text-black dark:text-white dark:text-white leading-relaxed text-sm">
                Email: support.samarpan@gmail.com<br />
                Phone: +91  9913679022
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] tracking-[0.1em] uppercase font-medium text-black dark:text-white dark:text-white">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-sm text-black dark:text-white" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] tracking-[0.1em] uppercase font-medium text-black dark:text-white dark:text-white">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-sm text-black dark:text-white" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-[10px] tracking-[0.1em] uppercase font-medium text-black dark:text-white dark:text-white">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-sm text-black dark:text-white" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="message" className="text-[10px] tracking-[0.1em] uppercase font-medium text-black dark:text-white dark:text-white">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-black dark:focus:border-white transition-colors text-sm resize-none text-black dark:text-white" 
                required 
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-[#d4af37] text-white rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#8b7322] transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

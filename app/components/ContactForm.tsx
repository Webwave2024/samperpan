"use client";

import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("footer");

  return (
    <div className="w-full min-h-screen bg-[#ffffff] pt-32 pb-24 text-black">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] mb-6">Contact Us</h1>
          <p className="text-black/70 max-w-2xl mx-auto font-[family-name:var(--font-inter)] tracking-wide">
            We are here to assist you with any inquiries regarding our collections, bespoke orders, or general questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Details */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-amber-600">Headquarters</h3>
              <p className="font-[family-name:var(--font-inter)] text-black/80 leading-relaxed text-sm">
                SIDHANT Design Studio<br />
                123 Heritage Lane, Satellite<br />
                Ahmedabad, Gujarat 380015<br />
                India
              </p>
            </div>
            
            <div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-4 text-amber-600">Connect</h3>
              <p className="font-[family-name:var(--font-inter)] text-black/80 leading-relaxed text-sm">
                Email: inquiries@sidhant.com<br />
                Phone: +91 98765 43210<br />
                Mon - Sat: 10:00 AM - 7:00 PM (IST)
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[10px] tracking-[0.1em] uppercase font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full border-b border-black/20 bg-transparent py-2 outline-none focus:border-black transition-colors text-sm" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[10px] tracking-[0.1em] uppercase font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full border-b border-black/20 bg-transparent py-2 outline-none focus:border-black transition-colors text-sm" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-[10px] tracking-[0.1em] uppercase font-medium">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full border-b border-black/20 bg-transparent py-2 outline-none focus:border-black transition-colors text-sm" 
                required 
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="message" className="text-[10px] tracking-[0.1em] uppercase font-medium">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full border-b border-black/20 bg-transparent py-2 outline-none focus:border-black transition-colors text-sm resize-none" 
                required 
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-black text-white rounded-full text-xs tracking-[0.2em] uppercase font-bold hover:bg-black/80 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCurrency } from "../context/CurrencyContext";
import { useTheme } from "./ThemeProvider";

type Step = "contact" | "shipping" | "payment";

const STEPS: { id: Step; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Delivery", desc: "5–7 business days", price: 99 },
  { id: "express", label: "Express Delivery", desc: "2–3 business days", price: 199 },
  { id: "overnight", label: "Overnight Delivery", desc: "Next business day", price: 399 },
];

export function CheckoutClient() {
  const locale = useParams().lang as string;
  const { formatPrice, currency } = useCurrency();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>("contact");
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  // Form state
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    shipping: "standard",
    saveInfo: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      setCartItems([]);
    }
  }, []);

  const subtotalINR = cartItems.reduce((acc, item) => {
    return acc + parseInt(item.price.replace(/\D/g, "")) * item.quantity;
  }, 0);

  const selectedShipping = SHIPPING_OPTIONS.find(o => o.id === form.shipping)!;
  const totalINR = subtotalINR + (selectedShipping?.price ?? 99);

  const setField = (key: string, value: any) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const stepIndex = STEPS.findIndex(s => s.id === step);

  const handleRazorpay = () => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.href = "https://rzp.io/l/YOUR_LINK_HERE";
  };

  if (!mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
      <div className="w-8 h-8 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  // ── Order Summary Panel (shared between mobile header and desktop sidebar) ──
  const OrderSummary = () => (
    <div className="flex flex-col gap-6">
      {/* Cart items */}
      <div className="flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <p className="text-sm text-center py-8 text-black/50 dark:text-white/50">Your bag is empty.</p>
        ) : cartItems.map((item, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
              <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d4af37] text-white text-[10px] flex items-center justify-center font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
              <p className="text-sm font-medium leading-snug text-black dark:text-white">{item.title}</p>
              <p className="text-xs text-black/50 dark:text-white/50">Size: {item.size}</p>
              <p className="text-sm font-semibold mt-1 text-black dark:text-white">
                {formatPrice(parseInt(item.price.replace(/\D/g, "")) * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-black/10 dark:bg-white/10" />

      {/* Coupon */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Discount code"
          className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#d4af37] transition-colors"
        />
        <button className="px-5 py-2.5 bg-black/10 hover:bg-black/15 dark:bg-white/10 dark:hover:bg-white/15 text-black dark:text-white text-sm rounded-lg transition-colors">
          Apply
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-black/10 dark:bg-white/10" />

      {/* Totals */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-black/70 dark:text-white/70">
          <span>Subtotal</span>
          <span className="text-black dark:text-white">{formatPrice(subtotalINR)}</span>
        </div>
        <div className="flex justify-between text-black/70 dark:text-white/70">
          <span>Shipping</span>
          <span className="text-black dark:text-white">{step === "contact" ? "Calculated at next step" : formatPrice(selectedShipping.price)}</span>
        </div>
        <div className="h-px bg-black/10 dark:bg-white/10" />
        <div className="flex justify-between font-bold text-base text-black dark:text-white">
          <span>Total</span>
          <div className="text-right">
            <div>{formatPrice(step === "contact" ? subtotalINR : totalINR)}</div>
            {currency !== "INR" && (
              <div className="text-[10px] font-normal text-black/40 dark:text-white/40">incl. taxes</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex flex-col pt-28 pb-16 transition-colors duration-300">

      {/* Mobile order summary toggle bar */}
      <div className="md:hidden border-b border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#111] px-6 py-4">
        <button
          className="flex items-center justify-between w-full text-sm text-black/70 dark:text-white/70"
          onClick={() => setOrderSummaryOpen(prev => !prev)}
        >
          <span>Order summary</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-black dark:text-white">{formatPrice(step === "contact" ? subtotalINR : totalINR)}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points={orderSummaryOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
            </svg>
          </div>
        </button>
        {orderSummaryOpen && (
          <div className="pt-4">
            <OrderSummary />
          </div>
        )}
      </div>

      {/* ── Main Layout ── */}
      <div className="flex flex-col md:flex-row flex-1 max-w-6xl mx-auto w-full">

        {/* ── Left: Form ── */}
        <div className="flex-1 px-6 md:px-12 py-10 md:border-r border-black/10 dark:border-white/10">

          {/* Breadcrumb steps */}
          <nav className="flex items-center gap-2 text-xs mb-10 flex-wrap text-black/40 dark:text-white/40">
            <Link href={`/${locale}`} className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                {i > 0 && <span>/</span>}
                <button
                  onClick={() => stepIndex > i && setStep(s.id)}
                  className={`transition-colors ${step === s.id ? "text-black dark:text-white font-semibold" : stepIndex > i ? "text-[#d4af37] hover:text-black dark:hover:text-white cursor-pointer" : "text-black/30 dark:text-white/30 cursor-default"}`}
                >
                  {s.label}
                </button>
              </React.Fragment>
            ))}
          </nav>

          {/* ─── STEP 1: Contact ─── */}
          {step === "contact" && (
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Contact</h2>
                  <span className="text-xs text-black/40 dark:text-white/40">
                    Already have an account?{" "}
                    <button className="text-[#d4af37] underline">Log in</button>
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <FormInput label="Email" type="email" value={form.email} onChange={v => setField("email", v)} placeholder="you@example.com" required />
                  <FormInput label="Phone" type="tel" value={form.phone} onChange={v => setField("phone", v)} placeholder="+91 98765 43210" required />
                  <label className="flex items-center gap-3 text-sm cursor-pointer select-none text-black/60 dark:text-white/60">
                    <input
                      type="checkbox"
                      checked={form.saveInfo}
                      onChange={e => setField("saveInfo", e.target.checked)}
                      className="accent-[#d4af37] w-4 h-4 rounded"
                    />
                    Email me with news and offers
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Delivery</h2>
                <div className="flex flex-col gap-3">
                  <FormSelect label="Country / Region" value={form.country} onChange={v => setField("country", v)}
                    options={["India", "United States", "United Kingdom", "UAE", "Canada", "Australia"]} />
                  <div className="grid grid-cols-2 gap-3">
                    <FormInput label="First name" value={form.firstName} onChange={v => setField("firstName", v)} required />
                    <FormInput label="Last name" value={form.lastName} onChange={v => setField("lastName", v)} required />
                  </div>
                  <FormInput label="Address" value={form.address} onChange={v => setField("address", v)} placeholder="House number and street name" required />
                  <FormInput label="Apartment, suite, etc. (optional)" value={form.apartment} onChange={v => setField("apartment", v)} />
                  <div className="grid grid-cols-3 gap-3">
                    <FormInput label="City" value={form.city} onChange={v => setField("city", v)} required />
                    <FormInput label="State" value={form.state} onChange={v => setField("state", v)} required />
                    <FormInput label="PIN code" value={form.pincode} onChange={v => setField("pincode", v)} required />
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                <Link href={`/${locale}/retail`} className="text-sm flex items-center gap-2 transition-colors text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  Return to store
                </Link>
                <button
                  onClick={() => {
                    if (!form.email || !form.firstName || !form.lastName || !form.address || !form.city || !form.state || !form.pincode) {
                      alert("Please fill in all required fields.");
                      return;
                    }
                    setStep("shipping");
                  }}
                  className="w-full sm:w-auto px-10 py-4 bg-[#b59536] hover:bg-[#d4af37] text-white text-sm font-semibold uppercase tracking-widest rounded-xl transition-all"
                >
                  Continue to Shipping
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Shipping ─── */}
          {step === "shipping" && (
            <div className="flex flex-col gap-8">
              {/* Contact summary */}
              <SummaryBox label="Contact" value={form.email} onEdit={() => setStep("contact")} />
              <SummaryBox
                label="Ship to"
                value={`${form.address}${form.apartment ? ", " + form.apartment : ""}, ${form.city}, ${form.state} ${form.pincode}, ${form.country}`}
                onEdit={() => setStep("contact")}
              />

              <div>
                <h2 className="text-lg font-semibold mb-4">Shipping method</h2>
                <div className="flex flex-col gap-3">
                  {SHIPPING_OPTIONS.map(opt => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        form.shipping === opt.id
                          ? "border-[#d4af37] bg-[#d4af37]/10"
                          : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 bg-black/5 dark:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${form.shipping === opt.id ? "border-[#d4af37]" : "border-black/30 dark:border-white/30"}`}>
                          {form.shipping === opt.id && <div className="w-2 h-2 rounded-full bg-[#d4af37]" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-black/50 dark:text-white/50">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">{formatPrice(opt.price)}</span>
                      <input type="radio" className="hidden" checked={form.shipping === opt.id} onChange={() => setField("shipping", opt.id)} />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                <button onClick={() => setStep("contact")} className="text-sm flex items-center gap-2 transition-colors text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  Return to contact
                </button>
                <button
                  onClick={() => setStep("payment")}
                  className="w-full sm:w-auto px-10 py-4 bg-[#b59536] hover:bg-[#d4af37] text-white text-sm font-semibold uppercase tracking-widest rounded-xl transition-all"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Payment ─── */}
          {step === "payment" && (
            <div className="flex flex-col gap-8">
              {/* Summaries */}
              <SummaryBox label="Contact" value={form.email} onEdit={() => setStep("contact")} />
              <SummaryBox
                label="Ship to"
                value={`${form.address}, ${form.city}, ${form.state} ${form.pincode}`}
                onEdit={() => setStep("contact")}
              />
              <SummaryBox
                label="Shipping"
                value={`${selectedShipping.label} · ${formatPrice(selectedShipping.price)}`}
                onEdit={() => setStep("shipping")}
              />

              {/* Payment method */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment</h2>
                <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                      </div>
                      <span className="text-sm">Razorpay — UPI, Cards, Net Banking & Wallets</span>
                    </div>
                    <div className="flex gap-2">
                      {["UPI", "Visa", "MC"].map(m => (
                        <span key={m} className="text-[9px] px-1.5 py-0.5 border border-black/20 dark:border-white/20 rounded text-black/50 dark:text-white/50">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-5 text-sm text-black/50 dark:text-white/50">
                    After clicking "Pay now", you will be redirected to Razorpay to securely complete your purchase.
                  </div>
                </div>
              </div>

              {/* Billing address */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Billing address</h2>
                <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
                  <label className="flex items-center gap-3 px-4 py-3 cursor-pointer bg-black/5 dark:bg-white/5">
                    <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                    </div>
                    <span className="text-sm">Same as shipping address</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
                <button onClick={() => setStep("shipping")} className="text-sm flex items-center gap-2 transition-colors text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  Return to shipping
                </button>
                <button
                  onClick={handleRazorpay}
                  className="w-full sm:w-auto px-10 py-4 bg-[#b59536] hover:bg-[#d4af37] text-white text-sm font-semibold uppercase tracking-widest rounded-xl transition-all flex items-center gap-3 justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Pay Now · {formatPrice(totalINR)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Order Summary (desktop) ── */}
        <div className="hidden md:flex flex-col w-[420px] shrink-0 px-12 py-10 bg-gray-50 dark:bg-[#111] border-l border-black/10 dark:border-white/10">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

// ── Reusable form components ───────────────────────────────────────────────────
function FormInput({
  label, value, onChange, type = "text", placeholder, required
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50">{label}{required && " *"}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 outline-none focus:border-[#d4af37] transition-colors"
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
      >
        {options.map(o => <option key={o} value={o} className="bg-white dark:bg-[#111]">{o}</option>)}
      </select>
    </div>
  );
}

function SummaryBox({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 gap-4">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <span className="text-xs w-16 shrink-0 pt-0.5 text-black/40 dark:text-white/40">{label}</span>
        <span className="text-sm truncate text-black/80 dark:text-white/80">{value}</span>
      </div>
      <button onClick={onEdit} className="text-xs text-[#d4af37] hover:underline shrink-0">Change</button>
    </div>
  );
}

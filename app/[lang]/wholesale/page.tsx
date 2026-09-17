import { DigitalShowroom } from "../../components/DigitalShowroom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function WholesalePage() {
  return (
    <div className="w-full min-h-screen bg-[#ffffff]">
      <Header />
      <div className="pt-24">
        <DigitalShowroom mode="wholesale" />
      </div>
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import HeroCounter from "@/components/HeroCounter";
import BakeryTicker from "@/components/BakeryTicker";
import MorningTable from "@/components/MorningTable";
import PancakeFeature from "@/components/PancakeFeature";
import BreadShelf from "@/components/Bakery/BreadShelf";
import PieCabinet from "@/components/Bakery/PieCabinet";
import CoffeeBar from "@/components/CoffeeBar";
import LunchBoard from "@/components/LunchBoard";
import SpecialsBoard from "@/components/SpecialsBoard";
import CabinetDomeGallery from "@/components/CabinetDomeGallery";
import MenuSection from "@/components/Menu/MenuSection";
import DriveThruOutdoorSection from "@/components/DriveThruOutdoorSection";
import CommunitySection from "@/components/CommunitySection";
import FeedbackTable from "@/components/FeedbackTable";
import VisitHoursSection from "@/components/VisitHoursSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-buttercream focus:px-4 focus:py-3 focus:text-oxblood"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HeroCounter />
        <BakeryTicker />
        {/* Sticky stack: Mornings holds while Artisan bread scrolls over it */}
        <div className="relative isolate">
          <div className="sticky top-[var(--nav-h)] z-0">
            <MorningTable />
          </div>
          <div className="relative z-10">
            <BreadShelf />
          </div>
        </div>
        <PancakeFeature />
        <PieCabinet />
        <CoffeeBar />
        <LunchBoard />
        <SpecialsBoard />
        <CabinetDomeGallery />
        <MenuSection />
        <DriveThruOutdoorSection />
        <CommunitySection />
        <FeedbackTable />
        <VisitHoursSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

import ScrollHero from "@/components/home/ScrollHero";
import PanoramaBanner from "@/components/home/PanoramaBanner";

export default function Home() {
  return (
    <>
      <ScrollHero />
      <PanoramaBanner />
      <PanoramaBanner
        src="/images/pano_middle_goan.jpg"
        alt="Sunaray Gaon mid-ridge panorama"
        titleKey="hero.panorama2.title"
        descKey="hero.panorama2.desc"
        className="mt-0"
      />
    </>
  );
}

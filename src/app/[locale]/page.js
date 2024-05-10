import Footer from '@/components/molecules/Footer';
import Hero from '@/components/organisms/Hero';
import About from '@/components/organisms/About';
import Services from '@/components/organisms/Services';
import Missions from '@/components/molecules/Missions';
import References from '@/components/molecules/References';
import Video from '@/components/organisms/Video';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Video />
      <Missions />
      <References />
      <Footer />
    </main>
  );
}

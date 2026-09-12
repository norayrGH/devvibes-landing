import { lazy, Suspense, useEffect, useState } from 'react';
import Header from './landing/Header';
import Hero from './landing/Hero';
import Trust from './landing/Trust';
import Problems from './landing/Problems';
import Services from './landing/Services';
import Process from './landing/Process';
import CaseStudies from './landing/CaseStudies';
import TechStack from './landing/TechStack';
import Testimonials from './landing/Testimonials';
import FinalCTA from './landing/FinalCTA';
import Footer from './landing/Footer';
import ScrollProgress from './landing/ScrollProgress';
import Loader from './landing/Loader';
import Cursor from './components/ui/Cursor';
import { WhatsAppFab } from './components/ui/WhatsAppButton';

const AdminApp = lazy(() => import('./admin/AdminApp'));

function useHashRoute() {
  // Always '' on the first render, on both the server and the client. Reading
  // location.hash during render would make a visitor arriving at /#/admin
  // hydrate the admin shell against prerendered landing-page markup, which
  // tears the whole tree. Resolving in an effect costs one extra paint on a
  // route that is signed-in-only anyway.
  const [hash, setHash] = useState('');

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    onChange();
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const isAdmin = hash.startsWith('#/admin');

  if (isAdmin) {
    return (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <main className="relative bg-dv-ink text-white selection:bg-dv-gold selection:text-black">
      <Loader />
      <Cursor />
      <ScrollProgress />
      <Header />
      <Hero />
      <Trust />
      <Problems />
      <Services />
      <Process />
      <CaseStudies />
      <TechStack />
      <Testimonials />
      <FinalCTA />
      <Footer />
      <WhatsAppFab />
    </main>
  );
}

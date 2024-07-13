import Presentacion from "./components/Presentacion";
import { Navbar } from "./components/Navbar";
import { Consolas } from "./components/Consolas";
import GamesSection from "./components/GamesSection";
import Footer from "./components/Footer";
import { SessionProvider } from './context/SessionContext';
import Category from "./components/Categorias";

export default function Home() {
  return (
    <SessionProvider>
      <main className="flex min-h-screen flex-col bg-[#121212]">
        <Navbar />
        <div className="container mt-24 mx-auto px-12 py-4">
          <section id="presentacion">
            <Presentacion />
          </section>
          <section id="consolas">
            <Consolas />
          </section>
          {/* <section id="categories-section">
            <Category />
          </section> */}
          <section id="games-section">
            <GamesSection />
          </section>
        </div>
        <Footer />
      </main>
    </SessionProvider>
  );
}
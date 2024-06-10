import Presentacion from "./components/Presentacion";
import { Navbar } from "./components/Navbar";
import { Consolas } from "./components/Consolas";
import { GamesSection } from "./components/GamesSection";
import  Footer  from "./components/footer";
import { UserProvider } from "./context/UserContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
     <UserProvider>
            <Navbar />
            <div className="container mt-24 mx-auto px-12 py-4">
              <Presentacion />
              <Consolas />
              <GamesSection />
            </div>
            <Footer/>
      </UserProvider>
    </main>
  );
}

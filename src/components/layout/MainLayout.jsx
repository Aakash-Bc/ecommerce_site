import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full mx-auto animate-fade-in">
        <div className="min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}


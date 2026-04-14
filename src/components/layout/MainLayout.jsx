import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full mx-auto animate-fade-in mb-12">
        <div className="min-h-[calc(100vh-300px)] pb-20 max-w-[1536px] mx-auto px-6 md:px-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}


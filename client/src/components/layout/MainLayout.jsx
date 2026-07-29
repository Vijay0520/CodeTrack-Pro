import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 px-6 pb-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
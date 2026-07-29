import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {children}
        <Footer />
      </main>
    </>
  );
}

export default MainLayout;
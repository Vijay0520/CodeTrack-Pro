import Navbar from "./Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {children}
      </main>
    </>
  );
}

export default MainLayout;
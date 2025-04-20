import Navbar from "@/components/Navbar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default MainLayout;

import Header from "@/components/SideBar/Header";
import SideBar from "@/components/SideBar/SideBar";

function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="md:block hidden">
        <SideBar />
      </div>
      <div className="md:hidden block">
        <Header />
      </div>
      <main className="w-full mt-14 md:mt-0">{children}</main>
    </div>
  );
}

export default PagesLayout;

import SideBar from "@/components/SideBar/SideBar";

function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="mr-64">
        <SideBar />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}

export default PagesLayout;

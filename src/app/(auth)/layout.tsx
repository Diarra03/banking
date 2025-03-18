import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className="flex min-h-screen w-full justify-between font-inter">
    {children}

    <div className="auth-asset">
      <div>
        <Image 
        src="/icons/design.jpg"
        alt="Image"
        width={800}
        height={800}
        />
      </div>

    </div>
   </main>
  );
}

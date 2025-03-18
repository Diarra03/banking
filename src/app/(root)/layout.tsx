import { Sidebar as SidebarIcon } from "lucide-react"; 
import Sidebar from "@/components/Sidebar"; 
import Image from 'next/image';
import MobileNav from "@/components/MobileNav";
import { getLoggedInUser } from "../../../lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full font-inter">
      {/* Sidebar */}
      <Sidebar user={loggedIn} /> 
      
      {/* Conteneur principal avec flexbox */}
      <div className="flex flex-col w-full">
        {/* Header contenant le logo et la navigation mobile */}
        <div className="flex items-center justify-between p-4 w-full">
        
          
          {/* MobileNav - à gauche avec un margin-left pour l'espacement */}
          <div className="ml-4">
            <MobileNav user={loggedIn} />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}

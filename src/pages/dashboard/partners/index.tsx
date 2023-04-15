import { type NextPage } from "next";
import { PartnerTable } from "~/components/Partner";
import { Navbar } from "~/components/Layouts";
import { useSession } from "next-auth/react";
import { AccessDenied } from "~/components/common";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  if (sessionData?.user.role !== "Admin") {
    return <AccessDenied />;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#282c35] to-[#15162c]">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <PartnerTable />
      </div>
    </main>
  );
};

export default Home;

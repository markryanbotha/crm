import { type NextPage } from "next";
import { Navbar } from "~/components/Layouts";
import { useSession } from "next-auth/react";
import { AccessDenied } from "~/components/common";
import { useRouter } from "next/router";
import { ContactPartner } from "~/components/Contact";

const PartnerContactDetails: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { partnerId } = router.query as { partnerId: string };

  if (
    !(
      sessionData?.user.role === "Admin" ||
      sessionData?.user.partnerId === partnerId
    )
  ) {
    return <AccessDenied />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#282c35] to-[#15162c]">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <ContactPartner partnerId={partnerId} />
      </div>
    </main>
  );
};

export default PartnerContactDetails;

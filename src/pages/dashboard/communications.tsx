import { type NextPage } from "next";
import { Navbar } from "~/components/Layouts";

const Communications: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#282c35] to-[#15162c]">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-white ">
        TODO
      </div>
    </main>
  );
};

export default Communications;

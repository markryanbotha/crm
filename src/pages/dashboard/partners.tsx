import { type NextPage } from "next";
import { Table } from "~/components/Table";
import { Navbar } from "~/components/Layouts";

const Home: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#282c35] to-[#15162c]">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Table />
      </div>
    </main>
  );
};

export default Home;

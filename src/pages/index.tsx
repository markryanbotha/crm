import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Table } from "~/components/Table";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Customer Relational Management System</title>
        <meta name="description" content="created by Mark Botha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#282c35] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
            Partner{" "}
            <span className="text-[#31a5ce]">Relationship</span> Manager
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white"></p>
            {/* <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button> */}
          </div>
          <Table />
        </div>
      </main>
    </>
  );
};

export default Home;

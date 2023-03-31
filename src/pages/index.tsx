import { type NextPage } from "next";
import Head from "next/head";
import { type GetSessionParams, getSession, useSession } from "next-auth/react";
import { Table } from "~/components/Table";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData)
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
            Partner <span className="text-[#31a5ce]">Relationship</span> Manager
          </h1>
          <Table />
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Home;

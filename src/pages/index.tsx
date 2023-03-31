import { Navbar } from "~/components/Layouts";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900">
      <Navbar />
      <section className="align-center align-center relative flex flex-grow items-center justify-center">
        <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-28 md:px-8">
          <div className="mx-auto max-w-4xl space-y-5 text-center">
            <h2 className="mx-auto text-4xl font-extrabold text-white md:text-7xl">
              Mange Partner Relationships
            </h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              This acts as a central knowledge base for Partners and Project
              Managers to gather contact information and communicate 
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="items-center justify-center gap-x-3 sm:flex"
            >
              <Link
                href="/dashboard/partners"
                className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-lg bg-sky-500 py-2.5 px-4 text-sm font-medium text-white duration-150 hover:bg-sky-400 active:bg-sky-600 sm:mt-0 sm:w-auto"
              >
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </form>
          </div>
        </div>
        <div
          className="absolute inset-0 m-auto h-[357px] max-w-xs blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </section>
    </div>
  );
};

export default Home;

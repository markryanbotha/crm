import { type NextPage } from "next";
import Link from "next/link";
import { Navbar } from "~/components/Layouts";

const AccessDenied: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#282c35] to-[#15162c]">
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-white ">
        <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
          <div className="mx-auto max-w-lg space-y-3 text-center">
            <h3 className="text-4xl font-semibold text-red-300 sm:text-5xl">
              Access Denied
            </h3>
            <p className="text-white-600">
              Sorry, you do not have access to this page.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-x-1 font-medium text-sky-600 duration-150 hover:text-sky-400"
            >
              Go back to homepage
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccessDenied;

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// This component is a Navbar that is used throughout the application
// Users can use the Navbar to navigate to important pages
const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { data: sessionData } = useSession();
  const router = useRouter();

  const navigation = [
    ...(sessionData?.user.role === "Admin"
      ? [{ title: "Partners", path: "/dashboard/partners" }]
      : []), // Only add this navigation option if the user is an admin
    { title: "Projects", path: "/dashboard/projects" },
    { title: "Communications", path: "/dashboard/communications" },
    { title: "Contact", path: "/dashboard/contact" },
  ];

  return (
    <nav className="w-full bg-transparent md:static">
      <div className="items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link href="/">
            <h3 className="text-sm font-extrabold tracking-tight text-white sm:text-xl">
              Partner <span className="text-[#31a5ce]">Relationship</span>{" "}
              Manager
            </h3>
          </Link>
          <div className="md:hidden">
            <button
              className="text-700 rounded-md p-2 text-white outline-none focus:border focus:border-gray-400"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
            isNavOpen ? "block" : "hidden"
          }`}
        >
          <ul className="items-center justify-center gap-x-20 space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-white hover:text-[#31a5ce]">
                  <Link href={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden justify-self-end md:flex">
          <button
            onClick={() =>
              sessionData?.user ? void signOut() : void router.push("/login")
            }
            className="rounded-lg bg-transparent py-2 px-4 text-white shadow hover:bg-sky-500"
          >
            {sessionData?.user ? "Log out" : "Log in"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

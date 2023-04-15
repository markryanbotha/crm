import type { User } from "@prisma/client";
import Link from "next/link";

type TeamProps = {
  header: string;
  description: string;
  users: User[];
};

const Team = ({ header, description, users }: TeamProps) => {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="max-w-xl">
          <h3 className="text-3xl font-semibold text-white sm:text-4xl">
            {header}
          </h3>
          <p className="mt-3 text-gray-400">{description}</p>
        </div>
        <div className="mt-12">
          {users.length === 0 ? (
            <div className="text-gray-300">
              <p>
                There are currently no employees that belong to this partner.
              </p>
            </div>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="h-24 w-24 flex-none">
                    <div className="relative inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-700">
                      <span className="text-xl font-medium text-gray-300">
                        {user.name
                          .split(" ")
                          .map((name) => name.slice(0, 1).toUpperCase())}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-300 sm:text-lg">
                      {user.name}
                    </h4>
                    <p className="text-sky-600">{user.jobTitle}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                      <svg
                        className="inline-block h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 8 6"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m0 0h8v6h-8zm.75 .75v4.5h6.5v-4.5zM0 0l4 3 4-3v1l-4 3-4-3z" />
                      </svg>
                      <Link href={`mailto:${user.email}`}>{user.email}</Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;

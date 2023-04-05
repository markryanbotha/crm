import { type Communication } from "@prisma/client";
import { formatRelative } from "date-fns";
import Link from "next/link";
import { api } from "~/utils/api";
import { Loading } from "../common";
import MessageNavigation from "./MessageNavigation";
import { get } from "lodash";

type CardsProps = {
  data: Communication[];
};

const Cards = ({ data }: CardsProps) => {
  return (
    <section className="mx-auto mt-12 max-w-screen-lg px-4 md:px-8">
      <ul className="mt-12 space-y-6">
        {data.map((message, idx) => (
          <li key={idx} className="rounded-md bg-white p-5 shadow-sm">
            {/* <a href={communication.href}> */}
            <div>
              <div className="justify-between sm:flex">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-cyan-600">
                    {message.header}
                  </h3>
                  <p className="mt-2 pr-2 text-gray-500">{message.content}</p>
                </div>
                <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                  <span className="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formatRelative(message.date, new Date())}
                  </span>
                  <span className="flex items-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                    {get(message, "recipient.email")}
                  </span>
                </div>
              </div>
              <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                <span className="flex items-center text-gray-500">
                  Project:{" "}
                  <Link href="/dashboard/projects" className="text-gray-800">
                    {get(message, "PartnerProject.jiraProject")}
                  </Link>
                </span>
                <span className="flex items-center text-gray-500">
                  Type: {message.type}
                </span>
              </div>
            </div>
            {/* </a> */}
          </li>
        ))}
      </ul>
    </section>
  );
};

const AllCommunications = () => {
  const { data, isLoading, isError, error } =
    api.communication.getAllMessages.useQuery();

  if (isLoading) return <Loading />;
  if (isError) return <p>There was an error: {error.message}</p>;

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      <MessageNavigation />
      <Cards data={data} />
    </div>
  );
};

export default AllCommunications;

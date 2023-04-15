import { formatRelative } from "date-fns";
import Link from "next/link";
import { type CommunicationWithAggregations } from "~/server/types";

type CardsProps = {
  data: CommunicationWithAggregations[];
};

const Cards = ({ data }: CardsProps) => {
  return (
    <section className="mt-1 w-full px-4 md:px-8">
      <ul className="mt-12 space-y-6">
        {data.length !== 0 ? (
          data.map((message, idx) => (
            <li key={idx} className="rounded-md bg-white p-5 shadow-sm">
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
                        className="mr-2 h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7498 6C15.7498 8.07107 14.0709 9.75 11.9998 9.75C9.92877 9.75 8.24984 8.07107 8.24984 6C8.24984 3.92893 9.92877 2.25 11.9998 2.25C14.0709 2.25 15.7498 3.92893 15.7498 6Z"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.50098 20.1182C4.57128 16.0369 7.90171 12.75 11.9998 12.75C16.0981 12.75 19.4286 16.0371 19.4987 20.1185C17.2159 21.166 14.6762 21.75 12.0002 21.75C9.32384 21.75 6.78394 21.1659 4.50098 20.1182Z"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {message.sender.email}
                    </span>
                  </div>
                </div>
                <div className="mt-4 items-center justify-end space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                  {message.partnerProject !== null ? (
                    <span className="flex items-center text-gray-500">
                      {message.type} about project{" "}
                      <Link
                        href="/dashboard/projects"
                        className="pl-1 text-sky-700"
                      >
                        {message.partnerProject.jiraProject}
                      </Link>
                    </span>
                  ) : (
                    <span className="flex items-center text-gray-500">
                      {message.type} that is not project specific
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="mt-[10rem] flex w-full flex-col items-center justify-center gap-4">
            <p className="text-s text-white-300 font-medium sm:text-5xl">
              No Messages
            </p>
          </div>
        )}
      </ul>
    </section>
  );
};

export default Cards;

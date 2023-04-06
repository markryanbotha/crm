import type { Dispatch, SetStateAction } from "react";
import FilterMessages from "./FilterMessages";
import SendMessage from "./SendMessage";

export type CommunicationType = "All" | "Sent" | "Received";

type MessageNavigationProps = {
  communicationType: CommunicationType;
  setCommunicationType: Dispatch<SetStateAction<CommunicationType>>;
};

const MessageNavigation = ({
  communicationType,
  setCommunicationType,
}: MessageNavigationProps) => {
  const navigation = ["All", "Sent", "Received"] as const;

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-4 md:px-8">
      <div className="flex">
        <div>
          <h3 className="text-2xl font-bold text-white">All Messages</h3>
          <p className="mt-2 text-white">
            View all the communication between Partners and Project Managers
          </p>
        </div>
        <div className="mt-6 ml-auto items-center gap-x-3 sm:flex md:mt-0">
          <FilterMessages />
          <SendMessage />
        </div>
      </div>

      <div className="mt-6">
        <ul className="flex w-full items-center gap-x-3 overflow-x-auto border-b border-gray-700">
          {navigation.map((type, idx) => (
            // Replace [idx == 0] with [window.location.pathname == item.path] or create your own logic
            <li
              key={idx}
              className={`border-b-2 py-2 ${
                communicationType === type
                  ? "border-sky-600 text-sky-600"
                  : "border-white text-gray-300"
              }`}
            >
              <button
                onClick={() => setCommunicationType(type)}
                className="rounded-lg py-2.5 px-4 text-sm font-medium duration-150 hover:bg-gray-50 hover:text-sky-600 active:bg-gray-100"
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MessageNavigation;
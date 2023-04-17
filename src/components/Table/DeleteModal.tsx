import type { Dispatch, SetStateAction } from "react";

export type BaseDeleteModalProps = {
  id?: string;
  deleteType: string;
};

interface DeleteModalProps extends BaseDeleteModalProps {
  handleDelete: () => void;
  isOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
}

// This is a generic component that is used to render a delete modal
export const DeleteModalButton = ({
  deleteType,
  isOpenState,
  handleDelete,
}: DeleteModalProps) => {
  const [isOpen, setIsOpen] = isOpenState;

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 h-full w-full bg-black opacity-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="flex min-h-screen items-center px-4 py-8">
            <div className="relative mx-auto w-full max-w-lg rounded-md bg-white shadow-lg">
              <div className="flex items-center justify-between border-b p-4">
                <h4 className="text-lg font-medium text-gray-800">
                  Delete Confirmation
                </h4>
                <button
                  className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-3 space-y-2 p-4 text-center text-[15.5px] leading-relaxed text-gray-500">
                <p>
                  Are you sure you want to{" "}
                  <strong className="text-red-500">delete {deleteType}</strong>
                </p>
              </div>
              <div className="mt-5 flex items-center gap-3 border-t p-4">
                <button
                  className="rounded-md bg-sky-600 px-6 py-2 text-white outline-none ring-sky-600 ring-offset-2 focus:ring-2"
                  onClick={() => handleDelete()}
                >
                  Accept
                </button>
                <button
                  className="rounded-md border px-6 py-2 text-gray-800 outline-none ring-sky-600 ring-offset-2 focus:ring-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg py-2 px-3 font-medium leading-none text-red-600 duration-150 hover:bg-gray-50 hover:text-red-500"
      >
        Delete
      </button>
    </>
  );
};

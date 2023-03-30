import type { Partner } from "@prisma/client";
import type { FC, Dispatch, SetStateAction } from "react";
import { api } from "~/utils/api";

type DeleteModalProps = {
  partner: Partner;
  isOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
};

export const DeleteModal: FC<DeleteModalProps> = ({ partner, isOpenState }) => {
  const [isOpen, setIsOpen] = isOpenState;
  const utils = api.useContext();
  const deletePartner = api.partner.deletePartner.useMutation({
    onMutate: async (id) => {
      await utils.partner.getAllPartners.cancel();
      return id;
    },
    onSettled: async () => {
      await utils.partner.getAllPartners.invalidate();
    },
  });

  const handleDelete = () => {
    deletePartner.mutate(partner.id);
    setIsOpen(false);
  };

  return isOpen ? (
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
            {/* <button
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            ></button> */}
          </div>
          <div className="mt-3 space-y-2 p-4 text-center text-[15.5px] leading-relaxed text-gray-500">
            <p>
              Are you sure you want to{" "}
              <strong className="text-red-500">delete {partner.name}</strong>{" "}
              partner
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t p-4">
            <button
              className="rounded-md bg-indigo-600 px-6 py-2 text-white outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
              onClick={() => handleDelete()}
            >
              Accept
            </button>
            <button
              className="rounded-md border px-6 py-2 text-gray-800 outline-none ring-indigo-600 ring-offset-2 focus:ring-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

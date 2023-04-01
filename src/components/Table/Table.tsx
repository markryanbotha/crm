import { useState } from "react";
import { api } from "~/utils/api";
import { Loading } from "../common";
import { CreateOrEditModal } from "./CreateOrEditModal";
import { TableRow } from "./TableRow";

export const columns = [
  "name",
  "email",
  "phone",
  "territory",
  "summary",
] as const;
export type Columns = (typeof columns)[number];

export default function Table() {
  const [isCreateModalOpen, setIsCreateModelOpen] = useState(false);
  const partners = api.partner.getAllPartners.useQuery();
  const partnerData = partners?.data && partners.data;

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      <div className="justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-xl font-bold text-white sm:text-2xl">Partners</h3>
          <p className="mt-2 text-white">
            The information about each partner is shown below
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <CreateOrEditModal
            type="create"
            isOpenState={[isCreateModalOpen, setIsCreateModelOpen]}
          />
          <button
            onClick={() => setIsCreateModelOpen(true)}
            className="inline-block rounded-lg bg-sky-600 px-4 py-2 font-medium text-white duration-150 hover:bg-sky-500 active:bg-sky-700 md:text-sm"
          >
            Add partner
          </button>
        </div>
      </div>
      {partnerData ? (
        <div className="mt-12 overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full table-auto text-left text-sm">
            <thead className="border-b bg-gray-50 font-medium text-gray-600">
              <tr>
                {columns.map((value, index) => (
                  <th key={index} className="py-3 px-6">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </th>
                ))}
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-white">
              {partnerData.map((partner) => (
                <TableRow key={partner.id} partner={partner} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center py-20">
          <Loading />
        </div>
      )}
    </div>
  );
}

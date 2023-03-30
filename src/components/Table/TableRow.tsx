import type { Partner } from "@prisma/client";
import { type FC, useState } from "react";
import { EditModal } from "./EditModal";
import { columns } from "./Table";

type TableRowProps = { partner: Partner };

export const TableRow: FC<TableRowProps> = ({ partner }) => {
  const isEditModalOpenState = useState(false);
  const [, setIsEditModalOpen] = isEditModalOpenState;

  return (
    <>
      <EditModal
        key={`${partner.id}_modal_${Math.random()}`}
        partner={partner}
        isOpenState={isEditModalOpenState}
      />
      <tr key={partner.id}>
        {columns.map((value, index) => (
          <td key={index} className="whitespace-nowrap px-6 py-4">
            {partner[value]}
          </td>
        ))}
        <td className="whitespace-nowrap px-6 text-right">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-lg py-2 px-3 font-medium text-indigo-600 duration-150 hover:bg-gray-50 hover:text-indigo-500"
          >
            Edit
          </button>
          <button className="rounded-lg py-2 px-3 font-medium leading-none text-red-600 duration-150 hover:bg-gray-50 hover:text-red-500">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

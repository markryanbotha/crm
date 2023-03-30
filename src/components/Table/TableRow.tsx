import type { Partner } from "@prisma/client";
import { type FC, useState } from "react";
import { CreateOrEditModal } from "./CreateOrEditModal";
import { DeleteModal } from "./DeleteModal";
import { columns } from "./Table";

type TableRowProps = { partner: Partner };

export const TableRow: FC<TableRowProps> = ({ partner }) => {
  const [isEditModelOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);

  return (
    <tr key={partner.id}>
      {columns.map((value, index) => (
        <td key={index} className="whitespace-nowrap px-6 py-4">
          {partner[value]}
        </td>
      ))}
      <td className="whitespace-nowrap px-6 text-right">
        <CreateOrEditModal
          type="edit"
          key={`${partner.id}_modal_${Math.random()}`}
          partner={partner}
          isOpenState={[isEditModelOpen, setIsEditModalOpen]}
        />
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="rounded-lg py-2 px-3 font-medium text-indigo-600 duration-150 hover:bg-gray-50 hover:text-indigo-500"
        >
          Edit
        </button>
        <DeleteModal
          partner={partner}
          isOpenState={[isDeleteModelOpen, setIsDeleteModelOpen]}
        />
        <button
          onClick={() => setIsDeleteModelOpen(true)}
          className="rounded-lg py-2 px-3 font-medium leading-none text-red-600 duration-150 hover:bg-gray-50 hover:text-red-500"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

import type { Partner } from "@prisma/client";
import type { FC } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { EditModal } from "./EditModal";
import { type Columns, columns } from "./Table";

type TableRowProps = { partner: Partner };

type RowItemProps = {
  columnName: Columns;
  formControls: UseFormReturn<Partner>;
};

const RowItem: FC<RowItemProps> = ({ columnName: key, formControls }) => {
  const {
    setValue,
    register,
    formState: { errors },
  } = formControls;

  const handleTyping = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(key, event.currentTarget.value);
  };

  if (errors[key]) {
    console.log(errors[key])
  }

  return (
    <input
      id={key}
      type="text"
      aria-invalid={errors[key] ? "true" : "false"}
      className={`rounded-lg bg-transparent text-white shadow-sm outline-none focus:border-indigo-600${
        errors[key] ? " border border-red-500" : ""
      }`}
      {...register(key, { onChange: handleTyping, required: true })}
    />
  );
};

export const TableRow: FC<TableRowProps> = ({ partner }) => {
  const formControls = useForm<Partner>({
    defaultValues: { ...partner },
  });

  return (
    <tr key={partner.id}>
      {columns.map((value, index) => (
        <td key={index} className="whitespace-nowrap px-6 py-4">
          <RowItem columnName={value} formControls={formControls} />
        </td>
      ))}
      <td className="whitespace-nowrap px-6 text-right">
        <button className="rounded-lg py-2 px-3 font-medium text-indigo-600 duration-150 hover:bg-gray-50 hover:text-indigo-500">
          Edit
        </button>
        <button className="rounded-lg py-2 px-3 font-medium leading-none text-red-600 duration-150 hover:bg-gray-50 hover:text-red-500">
          Delete
        </button>
      </td>
    </tr>
  );
};

import { type ReactElement, cloneElement } from "react";
import type { ColumnDefinitionType, TableItem } from "./Table";
import { get } from "lodash";

type TableRowProps<T extends TableItem, K extends keyof T> = {
  data: T;
  columns: Array<ColumnDefinitionType<T, K>>;
  editModalButton: ReactElement<{ data: T }>;
  deleteModalButton: ReactElement<{ data: T }>;
};

export const TableRow = <T extends TableItem, K extends keyof T>({
  data,
  columns,
  editModalButton,
  deleteModalButton,
}: TableRowProps<T, K>) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index} className="whitespace-nowrap px-6 py-4">
          {column.path
            ? // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              (get(data, column.path) as string)
            : (data[column.key] as string)}
        </td>
      ))}
      <td className="whitespace-nowrap px-6 text-left">
        {cloneElement(editModalButton, { data })}
        {cloneElement(deleteModalButton, { data })}
      </td>
    </tr>
  );
};

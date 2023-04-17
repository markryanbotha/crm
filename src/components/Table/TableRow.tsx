import { type ReactElement, cloneElement } from "react";
import type { ColumnDefinitionType, TableItem } from "./Table";
import { get } from "lodash";

type TableRowProps<T extends TableItem, K extends keyof T> = {
  data: T;
  columns: Array<ColumnDefinitionType<T, K>>;
  editModalButton: ReactElement<{ data: T }>;
  deleteModalButton: ReactElement<{ id: string }>;
};

// This is a component that represents a single row in the table.
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
          {/* If a customDisplayField is defined, it renders the field and injects the necessary dependencies */}
          {/* Otherwise, it renders text for a specific path in the data object*/}
          {/* If a path is defined, it will render the data in the location of the path*/}
          {/* Else, it renders the data that exists at the related key */}
          {column.customDisplayField
            ? cloneElement(column.customDisplayField, { data })
            : column.path
            ? get(data, column.path)
            : data[column.key]}
        </td>
      ))}
      <td className="whitespace-nowrap px-6 text-left">
        {/* This allows the TableRow to inject the required properties into the edit and delete modal buttons*/}
        {cloneElement(editModalButton, { data })}
        {cloneElement(deleteModalButton, { id: data.id })}
      </td>
    </tr>
  );
};

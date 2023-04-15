import type { PartnerProject, Partner } from "@prisma/client";
import { Loading } from "../common";
import { TableRow } from "./TableRow";

export type TableItem = {
  id: string;
};

export type ColumnDefinitionType<T extends TableItem, K extends keyof T> = {
  key: K;
  header: string;
  customInputField?: JSX.Element;
  customDisplayField?: JSX.Element;
  path?: string;
};

interface TableProps<T extends TableItem, K extends keyof T> {
  heading: string;
  subheading: string;
  columns: Array<ColumnDefinitionType<T, K>>;
  data: Array<T>;
  createModalButton: React.ReactElement;
  editModalButton: React.ReactElement;
  deleteModalButton: React.ReactElement;
}

export type TableDataType = Partner | PartnerProject;

const Table = <T extends TableItem, K extends keyof T>({
  heading,
  subheading,
  data,
  columns,
  createModalButton,
  editModalButton,
  deleteModalButton,
}: TableProps<T, K>) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      <div className="justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {heading}
          </h3>
          <p className="mt-2 text-white">{subheading}</p>
        </div>
        <div className="mt-3 md:mt-0">{createModalButton}</div>
      </div>
      {data.length !== 0 ? (
        <div className="mt-12 overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full table-auto text-left text-sm">
            <thead className="border-b bg-gray-50 font-medium text-gray-600">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="py-3 px-6">
                    {column.header}
                  </th>
                ))}
                <th className="py-3 px-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-white">
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  data={row}
                  columns={columns}
                  editModalButton={editModalButton}
                  deleteModalButton={deleteModalButton}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : data ? (
        <div className="mt-[10rem] flex w-full flex-col items-center justify-center gap-4">
          <p className="text-s text-white-300 font-medium sm:text-5xl">
            No Data Available
          </p>
          <p>Create new {heading} by clicking the create button above</p>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center py-20">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Table;

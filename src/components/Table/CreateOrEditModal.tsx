/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type Dispatch,
  type SetStateAction,
  type BaseSyntheticEvent,
  cloneElement,
} from "react";
import { type UseFormReturn, type FieldValues } from "react-hook-form";
import type { ColumnDefinitionType, TableItem } from "./Table";

export type BaseModalProps<T extends TableItem> = {
  type: "create" | "edit";
  isOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  columns: Array<ColumnDefinitionType<T, keyof T>>;
  data?: T;
  header: string;
};

interface ModalProps<T extends TableItem> extends BaseModalProps<T> {
  onSubmit: (data: T, event?: BaseSyntheticEvent) => Promise<void>;
  formControls: UseFormReturn<T>;
}

export const CreateOrEditModal = <T extends TableItem & FieldValues>({
  header,
  isOpenState,
  onSubmit,
  columns,
  formControls,
}: ModalProps<T>) => {
  const [isOpen, setIsOpen] = isOpenState;
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = formControls;

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => handleClose()}
      />
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
          <div className="flex justify-end">
            <button
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
              onClick={() => handleClose()}
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
          <div className="mx-auto max-w-sm space-y-3 py-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">{header}</h4>
            <p className="text-[15px] text-gray-600">Enter Details below</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {columns.map((value, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start justify-start gap-1"
                >
                  <label className="text-start text-gray-800">
                    {value.header}
                  </label>
                  {errors[value.key] ? (
                    <label className="text-xs text-red-500">
                      {errors[value.key]?.message?.toString()}
                    </label>
                  ) : null}
                  {value.customInputField ? (
                    cloneElement(value.customInputField, {
                      error: errors[value.key],
                      register,
                    })
                  ) : (
                    <input
                      type="text"
                      className={`w-full rounded-lg border bg-transparent py-2 pl-2 pr-3 pb-2 text-gray-700 shadow-sm outline-none focus:border-sky-600${
                        errors[value.key] ? " border-red-500" : ""
                      }`}
                      {...register(value.key as any)}
                    />
                  )}
                </div>
              ))}
              <button className="mt-3 block w-full rounded-lg bg-sky-600 py-3 px-4 text-center text-sm font-medium text-white ring-sky-600 ring-offset-2 hover:bg-sky-500 focus:ring-2 active:bg-sky-700">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

import { zodResolver } from "@hookform/resolvers/zod";
import type { Partner } from "@prisma/client";
import {
  type Dispatch,
  type SetStateAction,
  type FC,
  type BaseSyntheticEvent,
} from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { partnerSchema } from "~/server/types";
import { api } from "~/utils/api";
import { columns, type Columns } from "./Table";

type ModalProps = {
  type: "create" | "edit";
  isOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  partner?: Partner;
};

type RowItemProps = {
  columnName: Columns;
  formControls: UseFormReturn<Partner>;
};

const RowItem: FC<RowItemProps> = ({ columnName, formControls }) => {
  const {
    register,
    formState: { errors },
  } = formControls;

  return (
    <input
      id={columnName}
      type="text"
      aria-invalid={errors[columnName] ? "true" : "false"}
      className={`w-full rounded-lg border bg-transparent py-2 pl-2 pr-3 pb-2 text-gray-700 shadow-sm outline-none focus:border-indigo-600${
        errors[columnName] ? " border-red-500" : ""
      }`}
      {...register(columnName, { required: true })}
    />
  );
};

export const CreateOrEditModal: FC<ModalProps> = ({
  type,
  isOpenState,
  partner,
}) => {
  const [isOpen, setIsOpen] = isOpenState;
  const utils = api.useContext();
  const defaultValues =
    partner ??
    columns.reduce(
      (currentObject, key) => ({ ...currentObject, [key]: "" }),
      {}
    );
  const formControls = useForm<Partner>({
    defaultValues,
    resolver: zodResolver(partnerSchema),
  });
  const { handleSubmit } = formControls;
  const createOrEditPartner =
    type === "edit" ? api.partner.updatePartner : api.partner.createPartner;
  // TODO error handling and validation
  const upsertPartner = createOrEditPartner.useMutation({
    async onMutate(partner) {
      await utils.partner.getAllPartners.cancel();
      return partner;
    },
    async onSettled() {
      await utils.partner.getAllPartners.invalidate();
      formControls.reset();
    },
  });

  const onSubmit = async (partner: Partner, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    upsertPartner.mutate(partner);
    await utils.invalidate();
    setIsOpen(false);
  };

  return isOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
          <div className="flex justify-end">
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
          <div className="mx-auto max-w-sm space-y-3 py-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              {type === "edit"
                ? `Edit ${partner?.name ?? ""} Details`
                : "Create New Partner"}
            </h4>
            <p className="text-[15px] text-gray-600">
              Enter Partner Details below
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {columns.map((value, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start justify-start gap-1"
                >
                  <label className="text-start text-gray-800">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </label>
                  <RowItem
                    key={index}
                    columnName={value}
                    formControls={formControls}
                  />
                </div>
              ))}
              <button className="mt-3 block w-full rounded-lg bg-indigo-600 py-3 px-4 text-center text-sm font-medium text-white ring-indigo-600 ring-offset-2 hover:bg-indigo-500 focus:ring-2 active:bg-indigo-700">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

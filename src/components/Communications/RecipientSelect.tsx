import type { Communication } from "@prisma/client";
import type { FieldError, UseFormRegister } from "react-hook-form";
import { api } from "~/utils/api";
import { Loading, SelectArrow } from "../common";

type RecipientSelectProps = {
  register: UseFormRegister<Communication>;
  error?: FieldError;
};
export const RecipientSelect = ({ register, error }: RecipientSelectProps) => {
  const { data, isLoading, isError } = api.user.getAllUsers.useQuery();
  const selectProps = {
    ...(register && register("recipientId", { required: true })),
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>There was an error</p>;

  return (
    <div className="relative w-full">
      <SelectArrow />
      <select
        className={`w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-indigo-600 ${
          error ? "border-red-500" : ""
        }`}
        {...selectProps}
      >
        {data.map(({ id, email }, index) => (
          <option key={index} value={id}>
            {email}
          </option>
        ))}
      </select>
    </div>
  );
};

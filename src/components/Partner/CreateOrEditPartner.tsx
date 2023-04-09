import { zodResolver } from "@hookform/resolvers/zod";
import type { Partner } from "@prisma/client";
import { type BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { partnerSchema } from "~/server/types";
import { api } from "~/utils/api";
import {
  type BaseModalProps,
  CreateOrEditModal,
} from "../Table/CreateOrEditModal";
import { partnerColumns } from "./PartnerTable";

export const PartnerCreateOrEditModal = ({
  data,
  isOpenState,
  type,
}: BaseModalProps<Partner>) => {
  const [, setIsOpen] = isOpenState;
  const utils = api.useContext();
  const formControls = useForm({
    defaultValues: data,
    resolver: zodResolver(partnerSchema),
  });
  const createOrEditPartner =
    type === "edit" ? api.partner.updatePartner : api.partner.createPartner;

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

  const onSubmit = async (data: Partner, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    upsertPartner.mutate(data);
    await utils.invalidate();
    setIsOpen(false);
  };

  const header = type === "edit" ? "Edit Details" : "Create New Partner";

  return (
    <CreateOrEditModal
      header={header}
      type={type}
      isOpenState={isOpenState}
      onSubmit={onSubmit}
      formControls={formControls}
      columns={partnerColumns}
    />
  );
};

export const PartnerCreateModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PartnerCreateOrEditModal
        header="Create New Partner"
        columns={partnerColumns}
        type={"create"}
        isOpenState={[isOpen, setIsOpen]}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block rounded-lg bg-sky-600 px-4 py-2 font-medium text-white duration-150 hover:bg-sky-500 active:bg-sky-700 md:text-sm"
      >
        Add partner
      </button>
    </>
  );
};

export const PartnerEditModalButton = ({ data }: { data?: Partner }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PartnerCreateOrEditModal
        data={data}
        header="Edit Partner Details"
        columns={partnerColumns}
        type={"edit"}
        isOpenState={[isOpen, setIsOpen]}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg py-2 px-3 font-medium leading-none text-sky-600 duration-150 hover:bg-gray-50 hover:text-sky-500"
      >
        Edit
      </button>
    </>
  );
};

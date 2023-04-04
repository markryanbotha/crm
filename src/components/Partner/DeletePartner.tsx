import { useState } from "react";
import { api } from "~/utils/api";
import {
  type BaseDeleteModalProps,
  DeleteModalButton,
} from "../Table/DeleteModal";

export const PartnerDeleteModalButton = ({
  id,
  name,
}: BaseDeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useContext();
  const deletePartner = api.partner.deletePartner.useMutation({
    onMutate: async (id) => {
      await utils.partner.getAllPartners.cancel();
      return id;
    },
    onSettled: async () => {
      await utils.partner.getAllPartners.invalidate();
    },
  });

  const handleDelete = (id: string | undefined) => {
    if (!id) {
      throw new Error("The ID was not defined for the Partner");
    }
    deletePartner.mutate(id);
    setIsOpen(false);
  };

  return (
    <DeleteModalButton
      isOpenState={[isOpen, setIsOpen]}
      id={id}
      name={name}
      handleDelete={() => handleDelete(id)}
    />
  );
};

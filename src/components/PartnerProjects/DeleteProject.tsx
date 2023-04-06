import { useState } from "react";
import { api } from "~/utils/api";
import {
  type BaseDeleteModalProps,
  DeleteModalButton,
} from "../Table/DeleteModal";

export const ProjectDeleteModalButton = ({
  id,
  name,
}: BaseDeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useContext();
  const deleteProject = api.project.deletePartnerProject.useMutation({
    onMutate: async (id) => {
      await utils.project.getAllProjectsForUser.cancel();
      return id;
    },
    onSettled: async () => {
      await utils.project.getAllProjectsForUser.invalidate();
    },
  });

  const handleDelete = (id: string | undefined) => {
    if (!id) {
      throw new Error("The ID was not defined for the Project");
    }
    deleteProject.mutate(id);
    setIsOpen(false);
  };

  return (
    <DeleteModalButton
      isOpenState={[isOpen, setIsOpen]}
      name={name} // TODO, this will need to be made generic
      handleDelete={() => handleDelete(id)}
      deleteType="project"
    />
  );
};

import { useState } from "react";
import { api } from "~/utils/api";
import {
  type BaseDeleteModalProps,
  DeleteModalButton,
} from "../Table/DeleteModal";

// This is button that is used to delete a project, and it includes a confirmation modal
export const ProjectDeleteModalButton = ({ id }: BaseDeleteModalProps) => {
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
      handleDelete={() => handleDelete(id)}
      deleteType="project"
    />
  );
};

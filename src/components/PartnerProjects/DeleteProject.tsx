import { useState } from "react";
import { api } from "~/utils/api";
import {
  type BaseDeleteModalProps,
  DeleteModalButton,
} from "../Table/DeleteModal";
import { useSession } from "next-auth/react";

// This is button that is used to delete a project, and it includes a confirmation modal
export const ProjectDeleteModalButton = ({ id }: BaseDeleteModalProps) => {
  const { data: sessionData } = useSession();
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

  // Only admin users can delete projects
  return sessionData?.user.role === "Admin" ? (
    <DeleteModalButton
      isOpenState={[isOpen, setIsOpen]}
      handleDelete={() => handleDelete(id)}
      deleteType="project"
    />
  ) : null;
};

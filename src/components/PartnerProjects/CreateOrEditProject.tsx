import { zodResolver } from "@hookform/resolvers/zod";
import type { PartnerProject } from "@prisma/client";
import { type BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { partnerProjectSchema } from "~/server/types";
import { api } from "~/utils/api";
import {
  type BaseModalProps,
  CreateOrEditModal,
} from "../Table/CreateOrEditModal";
import { projectColumns } from "./ProjectTable";

export const ProjectCreateOrEditModal = ({
  header,
  data,
  isOpenState,
  type,
}: BaseModalProps<PartnerProject>) => {
  const [, setIsOpen] = isOpenState;
  const utils = api.useContext();

  const formControls = useForm({
    defaultValues: data,
    resolver: zodResolver(partnerProjectSchema),
  });

  const createOrEditProject =
    type === "edit"
      ? api.project.updatePartnerProject
      : api.project.createPartnerProject;

  const upsertProject = createOrEditProject.useMutation({
    async onMutate(project) {
      await utils.project.getAllProjectsForUser.cancel();
      return project;
    },
    async onSettled() {
      await utils.project.getAllProjectsForUser.invalidate();
      formControls.reset();
    },
  });

  const onSubmit = async (data: PartnerProject, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    upsertProject.mutate(data);
    await utils.invalidate();
    setIsOpen(false);
  };

  return (
    <CreateOrEditModal
      header={header}
      type={type}
      isOpenState={isOpenState}
      onSubmit={onSubmit}
      formControls={formControls}
      columns={projectColumns}
    />
  );
};

export const ProjectCreateModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ProjectCreateOrEditModal
        header="Create New Project"
        columns={projectColumns}
        type={"create"}
        isOpenState={[isOpen, setIsOpen]}
      />
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block rounded-lg bg-sky-600 px-4 py-2 font-medium text-white duration-150 hover:bg-sky-500 active:bg-sky-700 md:text-sm"
      >
        Create Project
      </button>
    </>
  );
};

export const ProjectEditModalButton = ({ data }: { data?: PartnerProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ProjectCreateOrEditModal
        data={data}
        header="Edit Project Details"
        columns={projectColumns}
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

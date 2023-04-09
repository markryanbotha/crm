import type { PartnerProject } from "@prisma/client";
import { api } from "~/utils/api";
import { Table } from "~/components/Table";
import type { ColumnDefinitionType } from "~/components/Table";

import { Loading } from "../common";
import {
  ProjectCreateModalButton,
  ProjectEditModalButton,
} from "./CreateOrEditProject";
import { ProjectDeleteModalButton } from "./DeleteProject";
import { PartnerSelect } from "./PartnerSelect";
import { TPMSelect } from "./TpmSelect";

export const projectColumns: ColumnDefinitionType<
  PartnerProject,
  keyof PartnerProject
>[] = [
  { key: "deviceType", header: "Device Type" },
  { key: "jiraProject", header: "Jira Project" },
  {
    key: "partnerId",
    header: "Partner",
    customInputField: <PartnerSelect />,
    path: "partner.name",
  },
  {
    key: "tpmId",
    header: "Principal TPM",
    customInputField: <TPMSelect />,
    path: "tpm.email",
  },
];

const ProjectTable = () => {
  const { data, isLoading, isError } =
    api.project.getAllProjectsForUser.useQuery();

  if (isLoading) return <Loading />;

  if (isError) return <p>There was an error</p>;

  return (
    <Table
      heading={"Projects"}
      subheading={" The information about each project is shown below"}
      columns={projectColumns}
      data={data}
      createModalButton={<ProjectCreateModalButton />}
      editModalButton={<ProjectEditModalButton />}
      deleteModalButton={<ProjectDeleteModalButton deleteType="project" />}
    />
  );
};

export default ProjectTable;

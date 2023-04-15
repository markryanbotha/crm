import type { Partner } from "@prisma/client";
import { api } from "~/utils/api";
import { Table } from "~/components/Table";
import type { ColumnDefinitionType } from "~/components/Table";
import {
  PartnerCreateModalButton,
  PartnerEditModalButton,
} from "./CreateOrEditPartner";
import { PartnerDeleteModalButton } from "./DeletePartner";
import Link from "next/link";

type PartnerLinkProps = { data?: Partner };
const PartnerLink = ({ data }: PartnerLinkProps) => {
  if (!data) return null;

  const url = `/dashboard/partners/${data.id}`;
  if (url)
    return (
      <div className="m-0 my-auto text-center text-sky-600">
        <Link href={url}>{data?.name}</Link>
      </div>
    );
  return <p>{data?.name}</p>;
};

export const partnerColumns: ColumnDefinitionType<Partner, keyof Partner>[] = [
  { key: "name", header: "Name", customDisplayField: <PartnerLink /> },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone" },
  { key: "territory", header: "Territory" },
  { key: "summary", header: "Summary" },
];

const PartnerTable = () => {
  const partners = api.partner.getAllPartners.useQuery();
  const partnerData = partners?.data && partners.data;
  if (!partnerData) return null;
  return (
    <Table
      heading={"Partners"}
      subheading={" The information about each partner is shown below"}
      columns={partnerColumns}
      data={partnerData}
      createModalButton={<PartnerCreateModalButton />}
      editModalButton={<PartnerEditModalButton />}
      deleteModalButton={<PartnerDeleteModalButton deleteType="partner" />}
    />
  );
};

export default PartnerTable;

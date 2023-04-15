import { api } from "~/utils/api";
import Team from "./Team";
import { Loading } from "../common";
type ContactPartnerProps = {
  partnerId: string;
};
const ContactPartner = ({ partnerId }: ContactPartnerProps) => {
  const { data, isLoading, isError } =
    api.partner.getEmployeesInPartner.useQuery(partnerId);

  if (isLoading) return <Loading />;
  if (isError) return <p>There was an error</p>;
  if (!data) return <p>The Partner you are looking for does not exists</p>;

  const contactPartnerDescription = `The details for each partner employee in ${data.name} is available below.`;

  return (
    <Team
      header={`Contact ${data.name}`}
      description={contactPartnerDescription}
      users={data.employees}
    />
  );
};

export default ContactPartner;

import { api } from "~/utils/api";
import Team from "./Team";
import { Loading } from "../common";

const ContactUs = () => {
  const { data, isLoading, isError } = api.user.getAllAdminUsers.useQuery();

  if (isLoading) return <Loading />;
  if (isError) return <p>There was an error</p>;

  const contactUsDescription =
    "For assistance or inquiries, please reach out to a member of our team. You can find their contact information below. We're committed to providing you with the support and resources you need to succeed.";

  return (
    <Team header="Contact Us" description={contactUsDescription} users={data} />
  );
};

export default ContactUs;

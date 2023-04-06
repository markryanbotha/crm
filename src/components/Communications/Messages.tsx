import { api } from "~/utils/api";
import Cards from "./Cards";
import { Loading } from "../common";
import MessageNavigation, { type CommunicationType } from "./MessageNavigation";
import { useState } from "react";

type CommunicationCardProps = {
  communicationType: CommunicationType;
};

export const CommunicationCards = ({
  communicationType,
}: CommunicationCardProps) => {
  const all = api.communication.getAllMessages.useQuery();
  const received = api.communication.getReceivedMessages.useQuery();
  const sent = api.communication.getSentMessages.useQuery();

  if (communicationType === "Received") {
    if (received.isLoading) return <Loading />;
    if (received.isError)
      return <p>There was an error: {received.error.message}</p>;

    return <Cards data={received.data} />;
  }

  if (communicationType === "Sent") {
    if (sent.isLoading) return <Loading />;
    if (sent.isError) return <p>There was an error: {sent.error.message}</p>;

    return <Cards data={sent.data} />;
  }

  if (all.isLoading) return <Loading />;
  if (all.isError) return <p>There was an error: {all.error.message}</p>;

  return <Cards data={all.data} />;
};

const Messages = () => {
  const [communicationType, setCommunicationType] =
    useState<CommunicationType>("All");

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      <MessageNavigation
        communicationType={communicationType}
        setCommunicationType={setCommunicationType}
      />
      <div className="flex min-h-[100px] w-full flex-col items-center justify-center">
        <CommunicationCards communicationType={communicationType} />
      </div>
    </div>
  );
};
export default Messages;

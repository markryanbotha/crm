import {
  type Dispatch,
  type SetStateAction,
  type BaseSyntheticEvent,
  useState,
} from "react";
import { RecipientSelect } from "./RecipientSelect";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { communicationInputSchema } from "~/server/types";
import type { Communication } from "@prisma/client";
import { SelectArrow } from "../common";
import { ProjectSelect } from "./ProjectSelect";
import { api } from "~/utils/api";

type ContactFormProps = {
  isOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
  formState: UseFormReturn<Communication>;
};

const ContactForm = ({ isOpenState, formState }: ContactFormProps) => {
  const utils = api.useContext();
  const [isOpen, setIsOpen] = isOpenState;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = formState;

  const sendMessage = api.communication.sendMessage.useMutation({
    async onMutate(data) {
      await utils.communication.getAllMessages.cancel();
      return data;
    },
    async onSettled() {
      await utils.communication.getAllMessages.invalidate();
    },
  });

  const onSubmit = async (data: Communication, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const date = new Date();
    await sendMessage.mutateAsync({ ...data, date });
    reset();
    setIsOpen(false);
  };

  return isOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => setIsOpen(false)}
      />
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
          <div className="flex justify-end">
            <button
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-black"
          >
            <div className="flex flex-col items-center gap-y-5 gap-x-6 sm:flex-row [&>*]:w-full">
              <div>
                <label className="font-medium">Related Project</label>
                <ProjectSelect
                  register={register}
                  error={errors.partnerProjectId}
                />
              </div>
              <div>
                <label className="font-medium">Message Type</label>
                <div className="relative">
                  <SelectArrow />
                  <select
                    className={`w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-sky-600 ${
                      errors.type ? "border-red-500" : ""
                    }`}
                    {...register("type")}
                  >
                    <option>Email</option>
                    <option>Jira Ticket</option>
                    <option>Meeting Notes</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="font-medium">Recipient</label>
              <RecipientSelect register={register} error={errors.recipientId} />
            </div>
            <div>
              <label className="font-medium">Header</label>
              <input
                type="text"
                required
                className={`w-full appearance-none rounded-lg border bg-transparent py-2 px-3 shadow-sm outline-none focus:border-indigo-600 ${
                  errors.header ? "border-red-500" : ""
                }`}
                {...register("header")}
              />
            </div>
            <div>
              <label className="font-medium">Message</label>
              <textarea
                required
                className={`mt-2 h-36 w-full resize-none appearance-none rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-indigo-600 ${
                  errors.content ? "border-red-500" : ""
                }`}
                {...register("content")}
              ></textarea>
            </div>
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

const SendMessage = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const formState = useForm<Communication>({
    resolver: zodResolver(
      communicationInputSchema.omit({ date: true }) // Omitting Date as it will be filled in automatically
    ),
  });

  return (
    <>
      <ContactForm
        isOpenState={[isContactFormOpen, setIsContactFormOpen]}
        formState={formState}
      />
      <button
        onClick={() => setIsContactFormOpen(true)}
        className="mt-3 block rounded-lg bg-sky-600 px-4 py-2 text-center text-xs font-medium text-white duration-150 hover:bg-sky-500 active:bg-sky-700 sm:mt-0 md:text-sm"
      >
        Send Message
      </button>
    </>
  );
};

export default SendMessage;

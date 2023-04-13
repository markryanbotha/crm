import { signIn } from "next-auth/react";
import { type FC, type BaseSyntheticEvent, useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { api } from "~/utils/api";
import { type UserDetails, userDetails } from "~/server/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Loading, SelectArrow } from "~/components/common";

const SelectPartner: FC<{ register: UseFormRegister<UserDetails> }> = ({
  register,
}) => {
  const { data: partnerData } = api.partner.getAllPartnerNames.useQuery();

  if (!partnerData) return <Loading />;

  return (
    <div>
      <label className="font-medium">Company</label>
      <div className="relative">
        <SelectArrow />
        <select
          className="w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
          {...register("partner")}
        >
          {partnerData.map((name, index) => (
            <option key={index}>{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false); // The page is in a Sign in state if this is true, otherwise, it is in a Sign up state if it is false
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const signUp = api.user.signUp.useMutation();
  const { register, handleSubmit } = useForm<UserDetails>({
    resolver: zodResolver(
      userDetails.pick({ email: true, role: true, partner: true })
    ),
  });

  const router = useRouter();

  const onSubmit = async (
    { email, role, partner }: UserDetails,
    event?: BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    setLoading(true);
    if (!isSignIn) {
      const newUser = await signUp.mutateAsync({ email, role, partner });

      if (!newUser) {
        throw new Error("User could not sign up");
      }
    }

    await signIn("credentials", {
      callbackUrl: (router.query?.callbackUrl as string) ?? "/",
      email,
      role,
    });
  };

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-gray-600">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {isSignIn ? "Log in to your account" : "Sign up"}
            </h3>
            <p className="">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-sky-600"
              {...register("email", { required: true })}
            />
          </div>
          {!isSignIn ? (
            <div>
              <label className="font-medium">Role</label>
              <div className="relative">
                <SelectArrow />
                <select
                  className="w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-sky-600"
                  {...register("role", {
                    required: true,
                  })}
                  onChange={(e) => void setRole(e.currentTarget.value)}
                >
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>
            </div>
          ) : null}
          {role === "User" && !isSignIn ? (
            <SelectPartner register={register} />
          ) : null}
          <button
            className={`w-full rounded-lg px-4 py-2 font-medium text-white duration-150 ${
              loading
                ? "bg-gray-400 hover:bg-gray-300 active:bg-gray-400"
                : "bg-sky-600 hover:bg-sky-500 active:bg-sky-600"
            }`}
            disabled={loading}
          >
            {isSignIn ? "Sign in" : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;

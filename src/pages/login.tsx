import { signIn, useSession } from "next-auth/react";
import { type FC, type BaseSyntheticEvent, useState } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
import { api } from "~/utils/api";
import { type UserDetails, userDetails } from "~/server/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Loading, SelectArrow } from "~/components/common";
import { TRPCClientError } from "@trpc/client";

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
  const [loading, setLoading] = useState(false); // Custom loading state to determine if the page is waiting for a response from the server. It is used to disable the sign in/up button
  const { data: sessionData } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const routeAfterSignIn = () => {
    router.push(searchParams.get("callbackUrl") ?? "/");
    // There is an issue with the Next Router, and it occasionally does not route the user after sign-in, so also do a manual route to fix the issue
    window.location.href = searchParams.get("callbackUrl") ?? "/";
  };

  const signUp = api.user.signUp.useMutation({
    async onSettled(user) {
      if (user) {
        await signIn("credentials", {
          redirect: false,
          email: user.email,
        });
        return routeAfterSignIn();
      }
    },
  });

  // This determines what schema to use to validate the form, depending if it is in a sign in state or a sign up state
  // Sign in state only requires the email field, whereas the sign up state requires all user details
  const formValidation = isSignIn
    ? userDetails.pick({ email: true })
    : userDetails;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<UserDetails>({
    resolver: zodResolver(formValidation),
  });

  const onSubmit = async (
    { email, role, partner, name, jobTitle }: UserDetails,
    event?: BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    setLoading(true);
    // Prefetch the data in the page that we will reroute to
    router.prefetch(searchParams.get("callbackUrl") ?? "/");

    if (sessionData?.user) {
      return routeAfterSignIn();
    }

    try {
      // Sign-up
      if (!isSignIn) {
        const newUser = await signUp.mutateAsync({
          email,
          role,
          partner,
          name,
          jobTitle,
        });
        if (!newUser) {
          throw new Error("User could not sign up");
        }
      } else {
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email,
        });

        // Sign-in with details, or sign in with the newly created account from the sign-up above
        if (signInResponse) {
          const { error, ok } = signInResponse;

          if (error) {
            // If there is an error, update the input form state to display error to user
            setError("email", {
              type: "custom",
              message: error,
            });
            setLoading(false);
            return;
          }
          // If the sign-in is successful, redirect user to the home page, or to the page that they initially tried to visit
          if (ok) {
            setLoading(false);
            return routeAfterSignIn();
          } else {
            throw new Error("Signing in was not successful, please retry");
          }
        }
      }
    } catch (e) {
      // An error from TRPC will mean that the user is trying to create an account with an email address that already exists
      if (e instanceof TRPCClientError) {
        setError("email", {
          type: "custom",
          message:
            "That email address is already signed up, please sign in instead",
        });
        setLoading(false);
      } else {
        // Catch all error messages to display to user
        setError("email", {
          type: "custom",
          message: "An Error Occurred",
        });
        // Rethrow error message for debugging
        console.error(e);

        setLoading(false);
      }
    }
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
                onClick={() => {
                  setIsSignIn(!isSignIn);
                  clearErrors();
                }}
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
            <br />
            {errors.email ? (
              <label className="text-xs text-red-500">
                {errors.email.message}
              </label>
            ) : null}
            <input
              type="email"
              required
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-sky-600"
              {...register("email", { required: true })}
            />
          </div>
          {!isSignIn ? (
            <>
              <div>
                <label className="font-medium">Name</label>
                <br />
                {errors.name ? (
                  <label className="text-xs text-red-500">
                    {errors.name.message}
                  </label>
                ) : null}
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-sky-600"
                  {...register("name", { required: true })}
                />
                <div>
                  <label className="font-medium">Job Title</label>
                  <br />
                  {errors.jobTitle ? (
                    <label className="text-xs text-red-500">
                      {errors.jobTitle.message}
                    </label>
                  ) : null}
                  <input
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-sky-600"
                    {...register("jobTitle")}
                  />
                </div>
              </div>
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
            </>
          ) : null}
          {role === "User" && !isSignIn ? (
            <SelectPartner register={register} />
          ) : null}
          <button
            type="submit"
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

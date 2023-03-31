import { signIn } from "next-auth/react";
import { type BaseSyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { userDetails, type UserDetails } from "~/server/types";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true); // The page is in a Sign in state if this is true, otherwise, it is in a Sign up state if it is false
  const signUp = api.user.signUp.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>({
    resolver: zodResolver(userDetails.partial()),
  });
  console.log(errors);

  // TODO error handling and validation
  const onSubmit = async (
    { email, role }: UserDetails,
    event?: BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    console.log("I ran");
    if (!isSignIn) {
      signUp.mutate({ email, role });
    }
    await signIn("credentials", {
      callbackUrl: "/",
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
              Log in to your account
            </h3>
            <p className="">
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
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
              className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              {...register("email", { required: true })}
            />
          </div>
          {!isSignIn ? (
            <div>
              <label className="font-medium">Role</label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 right-2.5 my-auto h-6 w-6 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <select
                  className="w-full appearance-none rounded-md border bg-white p-2.5 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
                  {...register("role", {
                    required: true,
                  })}
                >
                  <option>Admin</option>
                  <option>User</option>
                </select>
              </div>
            </div>
          ) : null}
          <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600">
            {isSignIn ? "Sign in" : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
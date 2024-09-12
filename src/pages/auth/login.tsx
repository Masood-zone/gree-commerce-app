import { Eye, EyeOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { storeApi } from "../../redux/api";
import { toast } from "react-toastify";
import { useDispatch } from "../../redux/store";
import { userActions } from "../../redux/user.slice";
import { useState } from "react";

type LoginData = {
  username: string;
  password: string;
};

function Login({
  onModal,
  setType,
}: {
  onModal: () => void;
  setType: (type: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [LoginUser, { isLoading }] = storeApi.useUserLoginMutation({});
  const dispatch = useDispatch();
  const { setUser } = userActions;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      const response = await LoginUser(data).unwrap();
      if (response) {
        dispatch(setUser({ data, token: response.token }));
        toast.success("Login successful!");
        onModal();
        reset();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      reset();
      toast.error(error.data);
    }
  };
  return (
    <>
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        {/* Header */}
        <div className="relative">
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-gray-500">
            Login to access all the features and products in your store
          </p>
          {/* Close button */}
          <button
            onClick={onModal}
            className="absolute top-0 right-2 text-2xl rounded-full border border-black"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input input-bordered"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="flex w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", { required: true })}
              />
              <span
                onClick={handleShowPassword}
                className="cursor-pointer absolute right-2 top-3"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <button
            type="submit"
            className="btn bg-black text-white border-none hover:bg-gray-900 rounded-full w-full"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Login"
            )}
          </button>
          <div className="flex items-center gap-2">
            <span>Don't have an account?</span>
            <button
              onClick={() => setType("signup")}
              className="hover:underline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

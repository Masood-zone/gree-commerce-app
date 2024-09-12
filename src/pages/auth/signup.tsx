import { X } from "lucide-react";

function Signup({
  onModal,
  setType,
}: {
  onModal: () => void;
  setType: (type: string) => void;
}) {
  const onSubmit = () => {
    onModal();
    console.log("Submitted");
  };
  return (
    <>
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <div className="relative">
          <h1 className="text-3xl font-semibold py-2">Create an account</h1>
          <p className="text-sm text-gray-500">
            Signup to get access to all the features and products in our store
          </p>
          {/* Close button */}
          <button
            onClick={onModal}
            className="absolute top-0 right-2 text-2xl rounded-full border border-black"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm">
              Email/Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Email/Username"
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Signup
          </button>
          <div className="flex items-center gap-2">
            <span>Already have an account?</span>
            <button
              onClick={() => setType("login")}
              className="hover:underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;

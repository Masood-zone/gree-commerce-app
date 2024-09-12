import { useState } from "react";
import { Edit2, X } from "lucide-react";
import { storeApi } from "../../../redux/api";

function EditUserModal({
  user,
  isOpen,
  onClose,
  onSave,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedUser: User) => void;
}) {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave(editedUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={editedUser.name.firstname}
              onChange={(e) =>
                setEditedUser((prevState) => ({
                  ...prevState,
                  name: { ...prevState.name, firstname: e.target.value },
                }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={editedUser.name.lastname}
              onChange={(e) =>
                setEditedUser((prevState) => ({
                  ...prevState,
                  name: { ...prevState.name, lastname: e.target.value },
                }))
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Profile() {
  const { data: user, isLoading, error } = storeApi.useGetUserInfoQuery({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading user information
      </div>
    );

  const handleSaveUser = (editedUser: User) => {
    console.log("Saving user:", editedUser);
  };

  return (
    <div className="w-full">
      <section className="flex-1 p-8">
        <div className="">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{`${user.name.firstname} ${user.name.lastname}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="font-semibold">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold">
                  {`${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EditUserModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
}

export default Profile;

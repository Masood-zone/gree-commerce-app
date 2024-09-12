import { useState } from "react";

function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmDelete = () => {
    // Handle the delete account logic here
    console.log("Account deleted!");
    setIsModalOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
        Delete Account
      </h1>
      <p className="text-center text-lg text-gray-700 mb-8">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleDeleteClick}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-red-600 text-center mb-4">
              Confirm Account Deletion
            </h2>
            <p className="text-center text-gray-700 mb-8">
              Are you sure you want to delete your account? This action is
              irreversible.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Confirm Delete
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;

import Login from "./login";
import Signup from "./signup";

function Auth({
  onModal,
  type,
  setType,
}: {
  onModal: () => void;
  type: string;
  setType: (type: string) => void;
}) {
  return (
    <section>
      {/* Signup and Login */}
      {type === "signup" ? (
        <Signup onModal={onModal} setType={setType} />
      ) : type === "login" ? (
        <Login onModal={onModal} setType={setType} />
      ) : null}
    </section>
  );
}

export default Auth;

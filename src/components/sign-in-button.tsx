"use client";

export default function SignIntButton({
  children,
  signIn,
}: {
  children?: React.ReactNode;
  signIn: () => void;
}) {
  return (
    <button
      onClick={() => {
        signIn();
      }}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
}

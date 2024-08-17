import { Toaster } from "react-hot-toast";

// (auth)/layout.jsx

export default function Layout({ children }) {
  return (
    <>
      <section className="bg-white">{children}</section>
      <Toaster position="top-right" />
    </>
  );
}

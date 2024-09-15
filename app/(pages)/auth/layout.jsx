export const metadata = {
  title: "Authentication",
  description: "Login / SignUp page",
};
export default function RootLayout({ children }) {
  return (
    <div className="absolute top-0 left-0  h-full w-full ">{children}</div>
  );
}

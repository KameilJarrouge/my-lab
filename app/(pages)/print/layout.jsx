export const metadata = {
  title: "Print Test",
  description: "Printing Test Result",
};
export default function RootLayout({ children }) {
  return (
    <div className="absolute top-0 left-0  h-full w-full bg-primary">
      {children}
    </div>
  );
}

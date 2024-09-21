export const BoxLayout = (props: { children: React.ReactNode }) => {
  return <div className="rounded-xl bg-white p-4 shadow-xl">{props.children}</div>;
};

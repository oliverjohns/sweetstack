export const Tooltip = ({
  message,
  children,
}: {
  message: string;
  children: React.ReactNode;
}) => (
  <div className="group relative w-fit">
    {children}
    <span className="absolute left-1/2 bottom-full -translate-y-2 -translate-x-1/2 scale-0 transform rounded bg-gray-600 p-2 text-xs text-white transition-all group-hover:scale-100">
      {message}
    </span>
  </div>
);

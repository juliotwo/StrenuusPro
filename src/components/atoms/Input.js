import { twJoin } from "tailwind-merge";

const Input = ({ className, disabled, error, ...rest }) => {
  return (
    <div>
      <input
        disabled={disabled}
        className={twJoin(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary focus:border-primary block w-full p-2.5",
          `${disabled && "opacity-50"}`,
          className
        )}
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;

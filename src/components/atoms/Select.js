import { twJoin } from 'tailwind-merge';

const Select = ({ options, className, disabled, error, ...rest }) => {
  return (
    <div>
      <select
        disabled={disabled}
        className={twJoin(
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary focus:border-primary block w-full p-2.5',
          `${disabled && 'opacity-50'}`,
          className
        )}
        {...rest}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
    </div>
  );
};

export default Select;

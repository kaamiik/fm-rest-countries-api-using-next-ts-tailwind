import { Loader } from 'react-feather';

export default function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Loader
        size={size}
        className="animate-spin text-blue-500 dark:text-white"
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

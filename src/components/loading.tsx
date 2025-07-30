// components/LoadingSpinner.tsx
interface Prop {
    title: string
}
export const LoadingSpinner = ({title}:Prop) => {
    return (
      <div className="flex flex-col justify-center items-center py-13">
        <p className="text-yellow-700 text-center py-4">Loading {title}...</p>
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
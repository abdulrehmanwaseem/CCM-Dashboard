const Spinner = () => {
  return (
    // <div className="fixed inset-0 z-50 dark:bg-black/20 backdrop-blur-xs">
    <div className="flex h-full w-full items-center justify-center ">
      <div className="relative h-20 w-20 ">
        {/* Gradient spinning ring */}
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin
        border-brand-500"
        ></div>
      </div>
    </div>
    // </div>
  );
};

export default Spinner;

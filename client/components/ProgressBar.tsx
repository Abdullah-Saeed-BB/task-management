function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full min-w-24 bg-gray-300 rounded-full h-2.5">
      <div
        className="bg-blue-400 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;

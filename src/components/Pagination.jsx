import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrevious,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="flex items-center px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-slate-200 hover:bg-white/20 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium"
      >
        <ChevronLeft size={20} />
        <span className="ml-1">Previous</span>
      </button>

      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur px-6 py-3 rounded-lg border border-white/20">
        <span className="text-slate-200 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center px-6 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-lg text-slate-200 hover:bg-white/20 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium"
      >
        <span className="mr-1">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

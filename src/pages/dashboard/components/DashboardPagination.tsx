import { ChevronLeft, ChevronRight } from "lucide-react";
import "./DashboardPagination.css";

interface DashboardPaginationProps {
  current: number;
  pageSize?: number;
  total?: number;
  onChange: (page: number) => void;
}

export default function DashboardPagination({ current, pageSize = 10, total = 0, onChange }: DashboardPaginationProps) {
  const size = Math.max(1, pageSize);
  const count = Math.max(0, total);
  const totalPages = Math.max(1, Math.ceil(count / size));
  const activePage = Math.min(Math.max(1, current), totalPages);
  const candidates = totalPages <= 7
    ? Array.from({ length: totalPages }, (_, index) => index + 1)
    : [1, activePage - 1, activePage, activePage + 1, totalPages].filter((page) => page >= 1 && page <= totalPages);
  const pages = [...new Set(candidates)].sort((first, second) => first - second);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== activePage) onChange(page);
  };

  return (
    <div className="dashboard-pagination">
      <p className="dashboard-pagination__summary">{count > 0 ? `Showing ${(activePage - 1) * size + 1}–${Math.min(activePage * size, count)} of ${count}` : "No results"}</p>
      <nav className="dashboard-pagination__controls" aria-label="Table pagination">
        <button type="button" className="dashboard-pagination__step" disabled={activePage === 1} onClick={() => goToPage(activePage - 1)} aria-label="Previous page"><ChevronLeft aria-hidden="true" /><span>Previous</span></button>
        <div className="dashboard-pagination__pages">
          {pages.map((page, index) => (
            <span className="dashboard-pagination__entry" key={page}>
              {index > 0 && page - pages[index - 1] > 1 && <span className="dashboard-pagination__gap" aria-hidden="true">…</span>}
              <button type="button" aria-label={`Page ${page}`} aria-current={activePage === page ? "page" : undefined} onClick={() => goToPage(page)}>{page}</button>
            </span>
          ))}
        </div>
        <span className="dashboard-pagination__mobile" aria-live="polite">Page {activePage} of {totalPages}</span>
        <button type="button" className="dashboard-pagination__step" disabled={activePage === totalPages} onClick={() => goToPage(activePage + 1)} aria-label="Next page"><span>Next</span><ChevronRight aria-hidden="true" /></button>
      </nav>
    </div>
  );
}

import "./pagination.css";
interface Props {
  currentPage: number;
  maxPageLimit: number;
  minPageLimit: number;
  totalPages: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageChange: (arg: number) => void;
}

const Pagination = (props: Props) => {
  const {
    currentPage,
    maxPageLimit,
    minPageLimit,
    onPrevClick,
    onNextClick,
    onPageChange,
    totalPages,
  } = props;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    onPrevClick();
  };
  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e: any) => {
    onPageChange(e.target.id);
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit + 1 && page > minPageLimit) {
      return (
        <li
          key={page}
          id={`${page}`}
          onClick={handlePageClick}
          className={`${currentPage === page ? "active" : null}`}
        >
          {page}
        </li>
      );
    }
  });

  // page ellipses
  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return (
    <div className="main">
      <ul className="pageNumbers">
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button
            type="button"
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

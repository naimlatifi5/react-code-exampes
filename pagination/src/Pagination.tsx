import styles from "./pagination.module.css";
import classNames from "classnames";
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
          className={classNames(
            `${currentPage === page ? styles.PageItemActive : null}`,
            styles.PaginationListItem
          )}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <ul className={styles.PaginationWrapper}>
      <li className={styles.PreviousButton}>
        <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
          Prev
        </button>
      </li>
      {minPageLimit >= 1 && <li onClick={handlePrevClick}>&hellip;</li>}
      {pageNumbers}
      {pages.length > maxPageLimit && (
        <li onClick={handleNextClick}>&hellip;</li>
      )}

      <li className={styles.NextButton}>
        <button
          type="button"
          onClick={handleNextClick}
          disabled={currentPage === pages[pages.length - 1]}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;

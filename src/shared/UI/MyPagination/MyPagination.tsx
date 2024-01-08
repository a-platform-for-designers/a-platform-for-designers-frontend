import "./MyPagination.scss";
import ArrowBack from "@/assets/icons/arrow-back.svg";
import ArrowForward from "@/assets/icons/arrow-forward.svg";

interface IProps {
  totalCases: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const MyPagination: React.FC<IProps> = ({ totalCases, setPage, page }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCases / 12); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        <button
          className={`pagination__arrow ${page === 1 ? "disabled" : ""}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <img src={ArrowBack} alt="" />
        </button>
        {pageNumbers.map((num) => (
          <li
            className={`pagination__num ${page === num ? "active" : ""}`}
            key={num}
            onClick={(e) => {
              const pageNumber = parseInt(e.currentTarget.innerText, 10);
              setPage(pageNumber);
            }}
          >
            {num}
          </li>
        ))}
        <button
          className={`pagination__arrow ${
            page === pageNumbers.length ? "disabled" : ""
          }`}
          onClick={() => setPage(page + 1)}
          disabled={page === pageNumbers.length}
        >
          <img src={ArrowForward} alt="" />
        </button>
      </ul>
    </div>
  );
};

export default MyPagination;

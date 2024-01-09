import "./MyPagination.scss";
import MyArrowBack from "@/shared/UI/MyArrowBack/MyArrowBack";
import MyArrowForward from "@/shared/UI/MyArrowForward/MyArrowForward";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";

interface IProps {
  totalItems: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const MyPagination: React.FC<IProps> = ({
  totalItems,
  setPage,
  page,
  limit,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / limit); i++) {
    pageNumbers.push(i);
  }

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Stack className="pagination">
        <Pagination
          page={page}
          count={pageNumbers.length}
          onChange={handleChange}
          style={{
            backgroundColor: "white",
            color: "black",
          }}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: MyArrowBack, next: MyArrowForward }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default MyPagination;

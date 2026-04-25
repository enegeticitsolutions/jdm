import Link from "next/link";
export default function Pagination({
  prev,
  currentPage,
  getPaginationGroup,
  next,
  pages,
  handleActive,
}) {
  return (
    <>
      <ul className="pagination justify-content-center">
        {getPaginationGroup.length <= 0 ? null : (
          <li onClick={prev} className="next_link page-item">
            {currentPage === 1 ? null : (
              <Link>
                <i className="fa fa-arrow-left" />
              </Link>
            )}
          </li>
        )}

        {getPaginationGroup.map((item, index) => {
          return (
            <li
              onClick={() => handleActive(item)}
              key={index}
              className={
                currentPage === item ? "page-item active" : "page-item"
              }
            >
              <Link className="page-link">{item}</Link>
            </li>
          );
        })}

        {getPaginationGroup.length <= 0 ? null : (
          <li onClick={next} className="next_link page-item">
            {currentPage >= pages ? null : (
              <Link>
                <i className="fa fa-arrow-right" />
              </Link>
            )}
          </li>
        )}
      </ul>
    </>
  );
}

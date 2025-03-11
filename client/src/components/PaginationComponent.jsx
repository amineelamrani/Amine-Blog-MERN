export default function PaginationComponent({
  currentPage,
  setCurrentPage,
  length,
}) {
  let displayedItems = [];
  for (let i = 0; i < Math.ceil(length / 6); i++) {
    displayedItems.push(
      <button
        className={`join-item btn ${currentPage === i + 1 ? "btn-active" : ""}`}
        onClick={(e) => setCurrentPage(e.target.innerHTML * 1)}
        key={i}
      >
        {i + 1}
      </button>
    );
  }

  return <div className="join">{length > 0 && displayedItems}</div>;
}

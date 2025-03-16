export default function GraphSection() {
  return (
    <div
      id="graphs-section"
      className="flex flex-wrap w-full h-full border-black border-2"
    >
      <div className="w-1/3 h-1/3 text-center border-black border-r-2">
        Users Evolution
      </div>
      <div className="w-1/3 h-1/3 text-center border-black border-r-2 ">
        Articles evolution
      </div>
      <div className="w-1/3 h-1/3 text-center border-black ">
        Comments evolution
      </div>
      <div className="w-3/5 h-1/3 text-center border-black border-r-2 border-t-2">
        Articles distribution by Category
      </div>
      <div className="w-2/5 h-1/3 text-center border-black border-t-2">
        Comments Leaderboard
      </div>
      <div className="w-1/3 h-1/3 text-center border-black border-r-2 border-t-2">
        users Leaderboard
      </div>
      <div className="w-2/3 h-1/3 text-center border-black border-t-2">
        Articles leaderboard
      </div>
    </div>
  );
}

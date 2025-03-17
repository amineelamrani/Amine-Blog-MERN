export default function HighlightComp({ text, item, image, period }) {
  return (
    <div className="flex flex-col w-full md:w-1/3 lg:w-1/6 p-2 h-full">
      <div className="bg-primary-content rounded-xl flex items-start gap-2 p-2">
        <img
          src={image}
          alt=""
          className="w-10 h-10 rounded-full bg-white p-1"
        />
        <div className="flex flex-col items-start">
          <h1 className="">{text}</h1>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{item}</h2>
            {period && (
              <p className="text-sm text-primary">
                This {period === 7 ? "week" : "month"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

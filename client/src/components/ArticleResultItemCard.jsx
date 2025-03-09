import { Link } from "react-router";

export default function ArticleResultItemCard({ article }) {
  let categories = <></>;

  if (article) {
    categories = article.category.map((item, index) => {
      if (index < 3) {
        return (
          <li key={index} className="badge badge-outline">
            {item}
          </li>
        );
      }
    });
  }

  return (
    <>
      {article && (
        <div className="w-full md:w-1/2 lg:w-1/3 p-5">
          <div className="p-5 shadow-2xl flex flex-col gap-3 h-full">
            <Link to={`/article/read/${article._id}`}>
              <img src={article.image} alt="article image" className="" />
            </Link>

            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-3">
                <ul className="flex gap-1 flex-wrap">{categories}</ul>
                <Link to={`/article/read/${article._id}`}>
                  <h1 className="font-black text-xl capitalize">
                    {article.title}
                  </h1>
                </Link>
                <p>{article.summary}</p>
              </div>

              <div id="author-section" className="flex gap-2 items-center ">
                <img
                  src={article.author.profilePicture}
                  alt="Author profile picture"
                  className="w-10 h-10 border bg-white rounded-full"
                />
                <div className="">
                  <h2 className="text-lg font-bold">{article.author.name}</h2>
                  <p className="flex items-center gap-1">
                    {new Date(article.createdAt)
                      .toDateString()
                      .split(" ")
                      .slice(1)
                      .join(" ")}{" "}
                    - {article.timesLiked}{" "}
                    <span className="font-bold text-xl">&#9829;</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

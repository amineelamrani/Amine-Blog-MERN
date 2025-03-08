import { useEffect, useState } from "react";
import ArticleResultItemCard from "../components/ArticleResultItemCard";

export default function Home() {
  const [fetchedArticles, setFetchedArticles] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [displayedItems, setDisplayedItems] = useState([]);

  // let displayedItems = [];

  useEffect(() => {
    const fetchData = async (page, limit) => {
      const res = await fetch(`/api/v1/articles?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data && data.status === "success") {
        // console.log(data);
        setFetchedArticles(data.result);
      }
    };
    fetchData(pageIndex, 6);
  }, [pageIndex]);

  const handleClick = () => {
    const newPage = pageIndex + 1;
    setPageIndex(newPage);
  };

  if (fetchedArticles) {
    for (let i = 0; i < fetchedArticles.length; i++) {
      displayedItems.push(
        <ArticleResultItemCard
          article={fetchedArticles[i]}
          key={fetchedArticles[i]._id}
        />
      );
    }
  }
  console.log(displayedItems);

  // if (fetchedArticles) {
  //   console.log(displayedItems);
  //   displayedItems = fetchedArticles.map((article, index) => {
  //     displayedItems.push(
  //       <ArticleResultItemCard article={article} key={index} />
  //     );
  //   });
  // }

  return (
    <>
      {fetchedArticles !== null && (
        <div className="flex flex-col container mx-auto w-full">
          <div
            id="search-section"
            className="prose lg:prose-xl py-10 flex flex-col items-center mx-auto "
          >
            <h3>Welcome to My Blog</h3>
            <h1 className="">Amine&apos;s Code Chronicles</h1>
            <p className="text-center pb-3">
              Here you&apos;ll find a variety of articles and tutorials on
              topics such as web development, software engineering, and
              programming languages.
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="text" className="grow" placeholder="Search" />
            </label>
          </div>

          <div id="articles-section">
            <div id="First-article-section" className="px-5">
              <img src={fetchedArticles[0].image} alt="" />
            </div>

            <div
              id="articles-display-section"
              className="w-full flex flex-wrap py-5 items-stretch"
            >
              {displayedItems}
            </div>
          </div>
          <button onClick={handleClick}>Load More</button>
        </div>
      )}
    </>
  );
}

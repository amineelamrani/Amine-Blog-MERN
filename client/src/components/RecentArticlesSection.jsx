import { useEffect, useState } from "react";
import ArticleResultItemCard from "./ArticleResultItemCard";

export default function RecentArticlesSection() {
  const [fetchedArticles, setFetchedArticles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/v1/articles?page=1&limit=3`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data && data.status === "success") {
        setFetchedArticles(data.result);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      id="recent-articles-section"
      className="flex flex-col items-center w-full gap-5"
    >
      <h1 className="text-2xl">Recent Articles</h1>

      {fetchedArticles && (
        <div className="w-full flex flex-wrap py-5 items-stretch">
          {fetchedArticles.map((article, index) => (
            <ArticleResultItemCard article={article} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

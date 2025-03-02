import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import Markdown from "react-markdown";

export default function ReadArticle() {
  const [articleData, setArticleData] = useState(null);
  let params = useParams();
  const articleId = params.articleId;
  const badgeTypes = ["neutral", "primary", "secondary", "accent"];

  useEffect(() => {
    // fetch data about the article

    const fetchData = async (id) => {
      const res = await fetch(`/api/v1/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data && data.status === "success") {
        setArticleData(data.result);
      }
    };

    fetchData(articleId);
  }, []);

  return (
    <div className="container">
      {articleData && (
        <div className="flex flex-col mx-auto w-full items-center py-14 lg:px-24">
          <div id="header-section" className="flex flex-col gap-3 items-center">
            <h3 className="text-primary font-bold">
              Published {articleData.createdAt}
            </h3>
            <h1 className="text-4xl font-bold text-center px-10">
              {articleData.title}
            </h1>
            <p className="text-center text-base-content">
              {articleData.summary}
            </p>
            <div className="flex gap-2">
              {articleData.category.map((element, index) => (
                <div
                  className={`badge badge-${badgeTypes[index % 4]}`}
                  key={index + 10000}
                >
                  {element}
                </div>
              ))}
            </div>
          </div>

          <div id="cover-image" className="mx-auto mt-14 relative">
            <img src={articleData.image} alt="" className="" />
            <div className="absolute top-2 right-2 bg-transparent flex flex-row items-center text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current hover:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <div className="stat-value">{articleData.timesLiked}</div>
            </div>
          </div>

          <div id="article-content" className=" prose max-w-none">
            {/* Now I have a content as a markdown and need to translate it to html */}
            <Markdown>{articleData.content}</Markdown>
          </div>
          <div id="author-like-section">
            author section and like the article section
          </div>
          <div id="article-comments-section">
            here the list of the article comments
          </div>
          <div id="recent-articles-section">
            here a list of the 3 recent articles or articles with the same
            category (we will see)
          </div>
        </div>
      )}
    </div>
  );
}

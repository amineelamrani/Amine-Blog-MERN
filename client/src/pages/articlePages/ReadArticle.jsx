import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import ArticleCommentsSections from "../../components/ArticleCommentsSections";
import { useSelector } from "react-redux";
import ArticleAuthorSection from "../../components/ArticleAuthorSection";
import RecentArticlesSection from "../../components/RecentArticlesSection";

export default function ReadArticle() {
  const [articleData, setArticleData] = useState(null);
  const [isArticleLiked, setIsArticleLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const { theme } = useSelector((state) => state.user);
  let params = useParams();
  const articleId = params.articleId;
  const badgeTypes = [
    "badge-neutral",
    "badge-primary",
    "badge-secondary",
    "badge-accent",
  ];

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
  }, [isArticleLiked]);

  useEffect(() => {
    // this to fetch if the user is already liking the article
    // to add a backend endpoint to check if the article is liked by the currentUser
    const fetchData = async (id) => {
      const res = await fetch(`/api/v1/articles/${id}/checkLiked`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data && data.status === "success") {
        setUserId(data.user);
        setIsArticleLiked(true);
      } else {
        setUserId(data.user);
        setIsArticleLiked(false);
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
              Published{" "}
              {new Date(articleData.createdAt)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </h3>
            <h1 className="text-4xl font-bold text-center px-10 capitalize">
              {articleData.title}
            </h1>
            <p className="text-center text-base-content">
              {articleData.summary}
            </p>
            <div className="flex gap-2">
              {articleData.category.map((element, index) => (
                <div
                  className={`badge ${badgeTypes[index % 4]}`}
                  key={index + 10000}
                >
                  {element}
                </div>
              ))}
            </div>
          </div>

          <div id="cover-image" className="mx-auto mt-14 relative">
            <img src={articleData.image} alt="" className="" />
            <div className="absolute left-6 -bottom-7">
              <h1
                className={`text-${
                  theme === "dark" ? "white" : "black"
                } font-bold text-xl`}
              >
                👋 Liked by {articleData.timesLiked} person
                {articleData.timesLiked > 1 && "s"}
              </h1>
            </div>
          </div>

          <div id="article-content" className=" prose max-w-none py-10">
            {/* Now I have a content as a markdown and need to translate it to html */}
            <Markdown>{articleData.content}</Markdown>
          </div>

          <ArticleAuthorSection
            articleId={articleId}
            author={articleData.author}
            isArticleLiked={isArticleLiked}
            setIsArticleLiked={setIsArticleLiked}
          />

          <ArticleCommentsSections articleId={articleId} userId={userId} />

          <RecentArticlesSection />
        </div>
      )}
    </div>
  );
}

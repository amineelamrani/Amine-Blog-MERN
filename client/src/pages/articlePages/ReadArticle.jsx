import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Markdown from "react-markdown";
import ArticleCommentsSections from "../../components/ArticleCommentsSections";
import { useSelector } from "react-redux";
import ArticleAuthorSection from "../../components/ArticleAuthorSection";
import RecentArticlesSection from "../../components/RecentArticlesSection";
import PageTitle from "../../components/utils/PageTitle";

export default function ReadArticle() {
  const [articleData, setArticleData] = useState(null);
  const [isArticleLiked, setIsArticleLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const { theme } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.comment);
  let params = useParams();
  const articleId = params.articleId;
  const badgeTypes = [
    "badge-neutral",
    "badge-primary",
    "badge-secondary",
    "badge-accent",
  ];
  useEffect(() => {
    // this to got back when going from route to route with the same ancestor
    document.documentElement.scrollTo(0, 0);
  }, [articleId]);

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
  }, [isArticleLiked, articleId]);

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
  }, [articleId]);

  return (
    <div className="container">
      <PageTitle
        title={`${
          articleData ? articleData.title : "Loading..."
        } | Amine's Code Chronicles`}
      />
      {!articleData && (
        <div className="flex w-full justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {articleData && (
        <div className="flex flex-col mx-auto w-full items-center py-14 lg:px-24">
          {error.error && (
            <div className="toast z-50">
              <div className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{error.message} </span>
              </div>
            </div>
          )}

          <div id="header-section" className="flex flex-col gap-3 items-center">
            <h3 className="text-primary font-bold text-sm md:text-base">
              Published{" "}
              {new Date(articleData.createdAt)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </h3>
            <h1 className="text-2xl md:text-4xl font-bold text-center px-10 capitalize">
              {articleData.title}
            </h1>
            <p className="text-center text-sm md:text-base text-base-content">
              {articleData.summary}
            </p>
            <div className="flex gap-2 flex-wrap items-center justify-center">
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
                } font-bold text-base md:text-xl`}
              >
                👋 Liked by {articleData.timesLiked} person
                {articleData.timesLiked > 1 && "s"}
              </h1>
            </div>
          </div>

          <div id="article-content" className="prose max-w-full py-10">
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

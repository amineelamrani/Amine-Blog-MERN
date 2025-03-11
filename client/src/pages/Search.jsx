import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ArticleResultItemCard from "../components/ArticleResultItemCard";

// /!\ To display only 6 articles and add pagination bro

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedArticles, setFetchedArticles] = useState(null);
  const [go, setGo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchData, setSearchData] = useState({
    searchTerm: searchParams.get("searchTerm") || "",
    category: searchParams.get("category") || "uncategorized",
    sort: searchParams.get("sort") || "latest",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `/api/v1/articles/search?searchTerm=${searchData.searchTerm}&category=${searchData.category}&sort=${searchData.sort}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log(data);
        if (data && data.status === "success") {
          setIsLoading(false);
          setError(false);
          setFetchedArticles(data.result);
        } else {
          setFetchedArticles(null);
          setIsLoading(false);
          setError(true);
        }
      } catch (err) {
        console.log(err);
        setFetchedArticles(null);
        setIsLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [go]);

  const handleChangeToggle = (e) => {
    console.log(e.target.checked);
    // setSearchData(e.target.checked ? "latest" : "oldest");
    setSearchData({
      ...searchData,
      ["sort"]: e.target.checked ? "latest" : "oldest",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGo((st) => !st);
    setSearchParams(searchData);
  };

  return (
    <div className="flex flex-col w-full">
      {error && (
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
            <span>An error happened while trying to go to the server!</span>
          </div>
        </div>
      )}
      <div
        id="search-placeholder"
        className="flex flex-col items-center w-full py-10 gap-10 border-b-2"
      >
        <h1 className="text-5xl font-bold">Search Articles</h1>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <label className="input input-bordered flex items-center gap-2 md:w-96">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) =>
                setSearchData({ ...searchData, ["searchTerm"]: e.target.value })
              }
              value={searchData.searchTerm}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 opacity-70 hover:cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <div className="flex w-full mx-auto justify-center gap-5 items-center py-5">
            <select
              className="select select-bordered select-ghost w-full max-w-xs"
              value={searchData.category}
              onChange={(e) =>
                setSearchData({ ...searchData, ["category"]: e.target.value })
              }
            >
              <option value="uncategorised">Uncategorised</option>
              <option value="Testig">testig</option>
              <option value="Next.js">Next.js</option>
              <option value="React.js">React.js</option>
              <option value="Node.js">Node.js</option>
              <option value="Express.js">Express.js</option>
              <option value="Mongoose">Mongoose</option>
              <option value="Javascript">Javascript</option>
              <option value="MERN">MERN</option>
              <option value="full-stack">full-stack</option>
              <option value="front-end">front-end</option>
              <option value="back-end">back-end</option>
              <option value="Web-dev">Web-dev</option>
            </select>

            <div className="form-control">
              <label className="label cursor-pointer gap-3">
                <span className="label-text">Sort by Latest </span>
                <input
                  type="checkbox"
                  className="toggle"
                  defaultChecked
                  onChange={handleChangeToggle}
                />
              </label>
            </div>
          </div>
          <button className="btn" type="submit">
            Search
          </button>
        </form>
      </div>

      <div id="result-placeholder" className="flex flex-col py-10 gap-5">
        <h1 className="text-3xl">Search Results :</h1>
        {isLoading && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-warning">
              <span className="loading loading-spinner loading-xs"></span>
              <span>Searching for results ... </span>
            </div>
          </div>
        )}
        <div className="w-full flex flex-wrap py-5 items-stretch">
          {fetchedArticles !== null &&
            fetchedArticles.map((article, index) => {
              return <ArticleResultItemCard article={article} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

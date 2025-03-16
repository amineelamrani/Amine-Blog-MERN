import { useEffect, useState } from "react";
import HighlightComp from "./HighlightComp";
import usersSvg from "/users-svgrepo-com.svg";
import userSvg from "/user-svgrepo-com.svg";
import articlesSvg from "/articles-svgrepo-com.svg";
import articleSvg from "/article-2-svgrepo-com.svg";
import commentsSvg from "/comments-svgrepo-com.svg";
import commentSvg from "/comment-svgrepo-com.svg";

export default function HighlightSection() {
  const [fetchedHighlights, setFetchedHighlights] = useState(null);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await fetch(`/api/v1/users/admin/highlights/7`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data = await res.json();
        if (data && data.status === "success") {
          setFetchedHighlights(data.result);
        } else {
          setFetchedHighlights(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <div id="highlights-section">
      {fetchedHighlights && (
        <div className="flex justify-between flex-wrap items-stretch">
          <HighlightComp
            item={fetchedHighlights.numberUsers}
            text="Total Users"
            image={usersSvg}
          />
          <HighlightComp
            item={fetchedHighlights.numberArticles}
            text="Total Articles"
            image={articlesSvg}
          />
          <HighlightComp
            item={fetchedHighlights.numberComments}
            text="Total Comments"
            image={commentsSvg}
          />
          <HighlightComp
            item={fetchedHighlights.weeklyUsersNumber}
            text="New Users"
            image={userSvg}
          />
          <HighlightComp
            item={fetchedHighlights.weeklyArticlesNumber}
            text="New Articles"
            image={articleSvg}
          />
          <HighlightComp
            item={fetchedHighlights.weeklyCommentsNumber}
            text="New Comments"
            image={commentSvg}
          />
        </div>
      )}
    </div>
  );
}

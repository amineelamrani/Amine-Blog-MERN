import { useEffect } from "react";

export default function PageTitle({ title }) {
  useEffect(() => {
    document.title = title.charAt(0).toUpperCase() + title.slice(1);
    // document.title = title;
  }, [title]);

  return null; // This component doesn't render anything
}

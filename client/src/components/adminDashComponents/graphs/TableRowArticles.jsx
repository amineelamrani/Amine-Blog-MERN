import { Link } from "react-router";

export default function TableRowArticles({
  ind,
  title,
  image,
  summary,
  likes,
  id,
}) {
  return (
    <tr>
      <td className="font-bold">
        <Link to={`/admin/articleInfo/${id}`}>{ind}</Link>
      </td>
      <td className="font-bold">{title}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-8 w-8">
              <img src={image} alt="Avatar " className="bg-white" />
            </div>
          </div>
        </div>
      </td>
      <td>{summary}</td>
      <td>{likes}</td>
    </tr>
  );
}

import React from "react";
import { Link } from "react-router";
export default function TableRowComments({
  ind,
  name,
  image,
  content,
  id,
  likes,
}) {
  return (
    <tr>
      <td className="font-bold">
        <Link to={`/admin/commentInfo/${id}`}>{ind}</Link>
      </td>
      <td className="font-bold">{name}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-8 w-8">
              <img src={image} alt="Avatar " className="bg-white" />
            </div>
          </div>
        </div>
      </td>
      <td>{content}</td>
      <td>{likes}</td>
    </tr>
  );
}

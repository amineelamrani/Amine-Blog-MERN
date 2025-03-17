import { Link } from "react-router";

export default function TableRowUsers({
  image,
  name,
  email,
  interactions,
  id,
}) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-8 w-8">
              <Link to={`/admin/userInfo/${id}`}>
                <img src={image} alt="Avatar " className="bg-white" />
              </Link>
            </div>
          </div>
        </div>
      </td>
      <td className="font-bold">{name}</td>
      <td>{email}</td>
    </tr>
  );
}

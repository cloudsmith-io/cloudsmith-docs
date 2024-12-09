import { MenuItem } from "@/lib/menu/types";
import Link from "next/link";

const Item = ({ data }: { data: MenuItem }) => {
  let subList = null;
  if (data.children) {
    subList = (
      <ul>
        {data.children.map((child) => (
          <li key={child.title}>
            <Item data={child} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      {data.path ? <Link href={data.path}>{data.title}</Link> : data.title}
      {subList}
    </div>
  );
}

export default Item;
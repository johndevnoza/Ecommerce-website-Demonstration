import { useParams } from "react-router-dom";

export default function Category() {
  let {id} = useParams();
  console.log(id);

  return <div>{id}</div>;
}

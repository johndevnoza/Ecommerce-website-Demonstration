import { Link } from "react-router-dom";

const FooterList = (desc: string) => {
  return (
      <li>
        <Link to={desc}>{desc}</Link>
      </li>
  );
};

export default FooterList;

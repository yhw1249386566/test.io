import React from 'react';
import { Link } from 'umi';

interface Props {
  data: { label: React.ReactNode; link: string }[];
}

const Navigation = (props: Props) => {
  const { data } = props;
  console.log(data);

  return (
    <div>
      {data.map((item) => {
        const { label, link } = item;

        return <Link to={`/${link}`}>{label}</Link>;
      })}
    </div>
  );
};

export default Navigation;

import React, { useState } from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { useHistory, Link } from 'umi';
import { Navigation } from '../../component';
import { RouteName, RouteLink } from '../../constant';
import style from './index.less';
const { Header } = Layout;
const { TabPane } = Tabs;
const { Item } = Menu;

const DefaultHeader = () => {
  const [tab, setTab] = useState(['1']);
  const history = useHistory();
  const handleBarClick = (e) => {
    setTab([e.key]);
  };

  return (
    <div>
      <div className={style.title} onClick={() => history.push('/index')}>
        青芽
      </div>
      <Navigation
        data={[
          { label: RouteName.Index, link: RouteLink.Index },
          { label: RouteName.Type, link: RouteLink.Type },
          { label: RouteName.Mood, link: RouteLink.Mood },
          { label: RouteName.About, link: RouteLink.About },
        ]}
      />
    </div>
  );
};

export default DefaultHeader;

{
  /* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} selectedKeys={tab}>
{
    tabTitle.map((v, i) => {
        const key = i;
        return (
            <Item key={key} onClick={(e) => handleBarClick(e)}>
                {v.title}
            </Item>
        )
    })
}
</Menu> */
}

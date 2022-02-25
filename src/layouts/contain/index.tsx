import { Layout, Menu, Breadcrumb } from 'antd';
import { useState } from 'react';
import { Link, history } from 'umi';

import style from "./index.less";
import Footer from "../footer";
import Hedaer from "../header";

const { Content } = Layout;

const tabTitle = [
    { title: '首页' },
    { title: '分类' },
    { title: '心情' },
    { title: '关于' },
]

const Contain = (props) => {
    console.log('props', props)
    const [tab, setTab] = useState(["1"])

    const handleBarClick = (e) => {
        setTab([e.key])
    }

    return (
        <Layout className="layout">

            <Hedaer />
            {/* 
            <Content style={{ padding: '0 50px' }}>
                {tab}
            </Content> */}
            {props.children}

            <Footer />

        </Layout>
    )
}

export default Contain
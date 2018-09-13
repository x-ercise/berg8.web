import React from 'react';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import MyTaskComponent from '../../components/MyTask/MyTaskComponent';
import { Menu,Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const WaitingPageSidebar = () => {
    return (
        <Menu theme="light" defaultOpenKeys={['1','2']} mode="inline" triggerSubMenuAction="click">
            <SubMenu
                key="1"
                title={<span><Icon type="team" /><span>My Task</span></span>}
            >
                <MyTaskComponent></MyTaskComponent>
            </SubMenu>
            <SubMenu
                key="2"
                title={<span><Icon type="team" /><span>Filter</span></span>}
            >
                <FilterComponent></FilterComponent>
            </SubMenu>
        </Menu>
    );
}

export default WaitingPageSidebar;
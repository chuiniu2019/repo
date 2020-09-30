import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  // DesktopOutlined,
  // PieChartOutlined,
  // FileOutlined,
  // TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Route } from 'react-router-dom'
import routers from '@/libs/router'
import history from 'src/libs/history';

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default class SiderDemo extends React.Component {
  constructor(props) {
    super()
    let { location, routes } = props
    let route = routes.find((f) => f.path === location.pathname)
    this.state = {
      collapsed: false,
      route: route,
      routers: routers
    }
  }
  // state = {
  //   collapsed: false,
  // }
  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  mapRoute (item) {
    if (item instanceof Array) {
      let re = item.map((it) => {
        return this.mapRoute(it) // 第一次循环就返回了
      })
      if (re) return re
    } else {
      if (!item.exact) {
        if (item.routes) {
          return (
            <SubMenu key={item.path} icon={<UserOutlined />} title={item.name}>
              {
                item.routes.map((i) => {
                  return this.mapRoute(i)
                })
              }
            </SubMenu>
          )
        } else {
          return <Menu.Item key={item.path} onClick={this.routePush}>{item.name}</Menu.Item>
        }
      }
    }
  }
  routePush(){
    history.push('../beef/sirloin')
  }
  render () {
    let abc = this.mapRoute(routers).filter(i => i)

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {abc}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>weiwei</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Route routes={this.state.route} component={this.state.route.component} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

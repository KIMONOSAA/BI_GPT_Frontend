export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/', redirect: '/home' },
  // { path: '/add_chart', name : "智能分析同步", icon: 'BarChartOutlined', component: './AddChart' },
  { path: '/add_chart_async', name : "智能分析异步", icon: 'BarChartOutlined', component: './AddChartAsync' },
  { path: '/my_chart', name: '我的图表', icon: 'PieChartOutlined', component: './MyChart' },
  { path: '/home', name: '首页', icon: 'PieChartOutlined', component: './Home' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
  
];

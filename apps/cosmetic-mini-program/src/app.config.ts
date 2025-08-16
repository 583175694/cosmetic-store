export default defineAppConfig({
  pages: [
    // 主要页面
    'pages/home/index',
    'pages/services/index',
    'pages/portfolio/index',
    'pages/profile/index',
    
    // 服务相关页面
    'pages/services/detail/index',
    'pages/services/category/index',
    
    // 化妆师相关页面
    'pages/artists/index',
    'pages/artists/detail/index',
    
    // 作品相关页面
    'pages/portfolio/detail/index',
    
    // 用户相关页面
    'pages/profile/edit/index',
    'pages/profile/coupons/index',
    'pages/profile/reviews/index',
    'pages/profile/about/index',
    
    // 支付相关页面
    'pages/payment/index',
    'pages/payment/result/index',
    
    // 其他页面
    'pages/search/index',
    'pages/webview/index'
  ],
  
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#F5F1EB',
    navigationBarTitleText: '化妆工作室',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F5F1EB'
  },
  
  // TabBar 配置 - 需要添加图标文件后启用
  // tabBar: {
  //   color: '#757575',
  //   selectedColor: '#D4AF37',
  //   backgroundColor: '#FEFEFE',
  //   borderStyle: 'white',
  //   list: [
  //     {
  //       pagePath: 'pages/home/index',
  //       text: '首页',
  //       iconPath: 'assets/icons/home.png',
  //       selectedIconPath: 'assets/icons/home-active.png'
  //     },
  //     {
  //       pagePath: 'pages/services/index',
  //       text: '服务',
  //       iconPath: 'assets/icons/services.png',
  //       selectedIconPath: 'assets/icons/services-active.png'
  //     },
  //     {
  //       pagePath: 'pages/portfolio/index',
  //       text: '作品',
  //       iconPath: 'assets/icons/portfolio.png',
  //       selectedIconPath: 'assets/icons/portfolio-active.png'
  //     },
  //     {
  //       pagePath: 'pages/profile/index',
  //       text: '我的',
  //       iconPath: 'assets/icons/profile.png',
  //       selectedIconPath: 'assets/icons/profile-active.png'
  //     }
  //   ]
  // },
  
  // 分包配置
  subPackages: [
    {
      root: 'pages/booking',
      name: 'booking',
      pages: [
        'select-artist/index',
        'select-time/index',
        'fill-info/index',
        'confirm/index',
        'success/index'
      ]
    },
    {
      root: 'pages/orders',
      name: 'orders',
      pages: [
        'index',
        'detail/index'
      ]
    }
  ],
  
  // 预加载分包
  preloadRule: {
    'pages/home/index': {
      network: 'all',
      packages: ['booking']
    }
  },
  
  // 权限配置
  permission: {
    'scope.userLocation': {
      desc: '您的位置信息将用于为您推荐附近的门店'
    }
  }
})

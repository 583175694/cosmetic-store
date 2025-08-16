# 化妆工作室小程序设计文档

## 概述

基于Taro + React + TypeScript + Taroify的化妆工作室小程序，采用奶油风格配浅蓝色调的设计语言，实现简约轻奢专业的用户体验。小程序将提供完整的服务预约流程、作品展示、化妆师介绍和用户管理功能。

## 架构设计

### 技术架构

```
┌─────────────────────────────────────────┐
│                 UI Layer                │
│  ┌─────────────┐ ┌─────────────────────┐ │
│  │   Pages     │ │    Components       │ │
│  │             │ │                     │ │
│  │ - Home      │ │ - ServiceCard       │ │
│  │ - Services  │ │ - PortfolioGrid     │ │
│  │ - Portfolio │ │ - ArtistCard        │ │
│  │ - Profile   │ │ - BookingFlow       │ │
│  └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│              Business Layer             │
│  ┌─────────────┐ ┌─────────────────────┐ │
│  │   Hooks     │ │      Services       │ │
│  │             │ │                     │ │
│  │ - useAuth   │ │ - BookingService    │ │
│  │ - useOrder  │ │ - PaymentService    │ │
│  │ - useUser   │ │ - UserService       │ │
│  └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│               Data Layer                │
│  ┌─────────────┐ ┌─────────────────────┐ │
│  │   Store     │ │       API           │ │
│  │             │ │                     │ │
│  │ - UserStore │ │ - RESTful API       │ │
│  │ - OrderStore│ │ - WeChat API        │ │
│  │ - AppStore  │ │ - Payment API       │ │
│  └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────┘
```

### 目录结构设计

```
src/
├── app.ts                    # 应用入口
├── app.config.ts            # 应用配置
├── app.scss                 # 全局样式
├── pages/                   # 页面
│   ├── home/               # 首页
│   ├── services/           # 服务页面
│   ├── portfolio/          # 作品页面
│   ├── artists/            # 化妆师页面
│   ├── booking/            # 预约流程页面
│   ├── profile/            # 个人中心
│   └── order/              # 订单相关页面
├── components/             # 公共组件
│   ├── common/            # 通用组件
│   ├── business/          # 业务组件
│   └── layout/            # 布局组件
├── hooks/                 # 自定义Hooks
├── services/              # API服务
├── store/                 # 状态管理
├── utils/                 # 工具函数
├── types/                 # TypeScript类型定义
├── constants/             # 常量定义
└── assets/               # 静态资源
    ├── images/
    ├── icons/
    └── styles/
```

## 组件设计

### 核心组件架构

#### 1. 布局组件 (Layout Components)

**TabLayout** - 底部导航布局
- 使用Taroify的Tabbar组件
- 四个Tab：首页、服务、作品、我的
- 支持路由切换和状态管理

**PageLayout** - 页面通用布局
- 统一的页面容器
- 加载状态处理
- 错误边界处理

#### 2. 业务组件 (Business Components)

**ServiceCard** - 服务卡片
```typescript
interface ServiceCardProps {
  service: {
    id: string
    name: string
    image: string
    description: string
    duration: number
    price: number
  }
  onBook: (serviceId: string) => void
}
```

**PortfolioGrid** - 作品网格
```typescript
interface PortfolioGridProps {
  portfolios: Portfolio[]
  columns?: number
  onItemClick: (portfolio: Portfolio) => void
}
```

**ArtistCard** - 化妆师卡片
```typescript
interface ArtistCardProps {
  artist: {
    id: string
    name: string
    avatar: string
    title: string
    experience: number
    specialties: string[]
    rating: number
  }
  onSelect: (artistId: string) => void
}
```

**BookingFlow** - 预约流程组件
```typescript
interface BookingFlowProps {
  serviceId: string
  onComplete: (booking: BookingData) => void
  onCancel: () => void
}
```

#### 3. 通用组件 (Common Components)

**ImageUploader** - 图片上传
**DateTimePicker** - 日期时间选择器
**RatingStars** - 评分星级
**LoadingSpinner** - 加载动画
**EmptyState** - 空状态页面

## 数据模型

### 核心数据结构

```typescript
// 用户模型
interface User {
  id: string
  openId: string
  nickname: string
  avatar: string
  phone?: string
  memberLevel: 'normal' | 'silver' | 'gold' | 'diamond'
  points: number
  createdAt: Date
}

// 服务模型
interface Service {
  id: string
  name: string
  category: 'makeup' | 'tutorial' | 'tattoo' | 'eyelash'
  description: string
  images: string[]
  duration: number // 分钟
  price: number
  deposit: number // 定金
  isActive: boolean
  tags: string[]
}

// 化妆师模型
interface Artist {
  id: string
  name: string
  avatar: string
  title: string
  description: string
  experience: number
  specialties: string[]
  rating: number
  reviewCount: number
  certificates: string[]
  portfolios: string[]
  workingHours: WorkingHour[]
}

// 工作时间模型
interface WorkingHour {
  dayOfWeek: number // 0-6, 0为周日
  startTime: string // HH:mm
  endTime: string // HH:mm
  isAvailable: boolean
}

// 预约模型
interface Booking {
  id: string
  userId: string
  serviceId: string
  artistId: string
  appointmentTime: Date
  duration: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
  depositPaid: number
  remainingPrice: number
  notes?: string
  createdAt: Date
}

// 作品模型
interface Portfolio {
  id: string
  title: string
  description: string
  images: string[]
  video?: string
  artistId: string
  serviceId: string
  tags: string[]
  likes: number
  createdAt: Date
}

// 评价模型
interface Review {
  id: string
  userId: string
  bookingId: string
  artistId: string
  serviceId: string
  rating: number
  comment: string
  images?: string[]
  createdAt: Date
}

// 优惠券模型
interface Coupon {
  id: string
  name: string
  type: 'discount' | 'cash' | 'newUser'
  value: number // 折扣值或现金值
  minAmount?: number // 最小使用金额
  validFrom: Date
  validTo: Date
  isUsed: boolean
  usedAt?: Date
}
```

## 界面设计

### 设计系统

#### 色彩方案 (奶油风 + 浅蓝色调)
```scss
// 主色调
$primary-cream: #F5F1EB;      // 奶油白
$primary-blue: #E8F4F8;       // 浅蓝色
$accent-gold: #D4AF37;        // 金色点缀
$accent-rose: #F4C2C2;        // 玫瑰粉

// 中性色
$neutral-100: #FEFEFE;        // 纯白
$neutral-200: #F8F8F8;        // 浅灰
$neutral-300: #E5E5E5;        // 中灰
$neutral-400: #BDBDBD;        // 深灰
$neutral-500: #757575;        // 文字灰
$neutral-600: #424242;        // 深文字

// 功能色
$success: #4CAF50;            // 成功绿
$warning: #FF9800;            // 警告橙
$error: #F44336;              // 错误红
$info: #2196F3;               // 信息蓝
```

#### 字体系统
```scss
// 字体大小
$font-size-xs: 24rpx;         // 12px
$font-size-sm: 28rpx;         // 14px
$font-size-base: 32rpx;       // 16px
$font-size-lg: 36rpx;         // 18px
$font-size-xl: 40rpx;         // 20px
$font-size-2xl: 48rpx;        // 24px
$font-size-3xl: 56rpx;        // 28px

// 字重
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
```

#### 间距系统
```scss
$spacing-xs: 8rpx;            // 4px
$spacing-sm: 16rpx;           // 8px
$spacing-base: 32rpx;         // 16px
$spacing-lg: 48rpx;           // 24px
$spacing-xl: 64rpx;           // 32px
$spacing-2xl: 96rpx;          // 48px
```

### 页面设计规范

#### 首页设计
- **顶部Banner**: 使用Taroify的Swiper组件，高度300rpx
- **服务入口**: 2x2网格布局，每个入口120rpx高度
- **作品推荐**: 瀑布流布局，使用虚拟滚动优化性能
- **化妆师推荐**: 横向滚动卡片列表

#### 服务页面设计
- **分类Tab**: 使用Taroify的Tabs组件
- **服务卡片**: 统一卡片样式，包含图片、标题、价格、时长
- **筛选功能**: 价格区间、服务时长、化妆师筛选

#### 预约流程设计
- **步骤指示器**: 使用Taroify的Steps组件
- **日历选择**: 自定义日历组件，突出可选日期
- **时间选择**: 时间轴样式，已预约时间置灰
- **信息填写**: 表单验证，支持备注输入

## 错误处理

### 错误类型定义
```typescript
enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  BUSINESS_ERROR = 'BUSINESS_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

interface AppError {
  type: ErrorType
  message: string
  code?: string
  details?: any
}
```

### 错误处理策略
1. **网络错误**: 显示重试按钮，支持离线缓存
2. **认证错误**: 自动跳转登录页面
3. **业务错误**: 显示具体错误信息和解决方案
4. **表单验证**: 实时验证，友好提示

## 测试策略

### 单元测试
- 使用Jest + React Testing Library
- 覆盖核心业务逻辑和工具函数
- 组件渲染和交互测试

### 集成测试
- API接口测试
- 页面跳转流程测试
- 支付流程端到端测试

### 性能测试
- 页面加载时间监控
- 图片懒加载效果验证
- 内存泄漏检测

## 部署与发布

### 构建配置
- 开发环境：支持热重载，详细错误信息
- 测试环境：模拟生产环境，性能监控
- 生产环境：代码压缩，错误上报

### 版本管理
- 使用语义化版本号
- 支持灰度发布
- 回滚机制

### 监控与分析
- 用户行为分析
- 性能监控
- 错误日志收集
- 业务数据统计
import React, { Component, ReactNode } from 'react'
import { View } from '@tarojs/components'
import { EmptyState } from '../../common'
import Taro from '@tarojs/taro'
import './index.scss'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: any
}

interface ErrorBoundaryProps {
  children: ReactNode
  /** 自定义错误页面 */
  fallback?: (error: Error, errorInfo: any) => ReactNode
  /** 错误回调 */
  onError?: (error: Error, errorInfo: any) => void
  /** 自定义类名 */
  className?: string
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // 调用错误回调
    this.props.onError?.(error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // 在开发环境下显示详细错误信息
    if (process.env.NODE_ENV === 'development') {
      Taro.showModal({
        title: '组件错误',
        content: `${error.message}\n\n${error.stack}`,
        showCancel: false
      })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleReload = () => {
    Taro.reLaunch({ url: '/pages/home/index' })
  }

  render() {
    const { hasError, error } = this.state
    const { children, fallback, className = '' } = this.props

    if (hasError && error) {
      // 使用自定义错误页面
      if (fallback) {
        return fallback(error, this.state.errorInfo)
      }

      // 默认错误页面
      return (
        <View className={`error-boundary ${className}`}>
          <EmptyState
            title="页面出错了"
            description={process.env.NODE_ENV === 'development' ? error.message : '抱歉，页面遇到了一些问题'}
            buttonText="重新加载"
            onButtonClick={this.handleReload}
          />
          
          {process.env.NODE_ENV === 'development' && (
            <View className="error-boundary__debug">
              <View className="error-boundary__debug-title">调试信息：</View>
              <View className="error-boundary__debug-content">
                {error.stack}
              </View>
            </View>
          )}
        </View>
      )
    }

    return children
  }
}

export default ErrorBoundary
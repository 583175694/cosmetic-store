import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { Uploader } from '@taroify/core'
import { Plus, Close } from '@taroify/icons'
import Taro from '@tarojs/taro'
import './index.scss'

interface ImageFile {
  url: string
  name?: string
  size?: number
}

interface ImageUploaderProps {
  /** 已上传的图片列表 */
  value?: ImageFile[]
  /** 最大上传数量 */
  maxCount?: number
  /** 是否多选 */
  multiple?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 上传回调 */
  onChange?: (files: ImageFile[]) => void
  /** 自定义上传函数 */
  onUpload?: (file: File) => Promise<string>
  /** 自定义类名 */
  className?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value = [],
  maxCount = 9,
  multiple = true,
  disabled = false,
  onChange,
  onUpload,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false)

  const handleChooseImage = async () => {
    if (disabled || uploading) return
    
    try {
      const res = await Taro.chooseImage({
        count: multiple ? Math.min(maxCount - value.length, 9) : 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      setUploading(true)
      
      const newFiles: ImageFile[] = []
      
      for (const tempFilePath of res.tempFilePaths) {
        if (onUpload) {
          // 自定义上传逻辑
          const url = await onUpload(tempFilePath as any)
          newFiles.push({ url })
        } else {
          // 默认使用临时路径
          newFiles.push({ url: tempFilePath })
        }
      }
      
      const updatedFiles = [...value, ...newFiles]
      onChange?.(updatedFiles)
    } catch (error) {
      console.error('选择图片失败:', error)
      Taro.showToast({
        title: '选择图片失败',
        icon: 'error'
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange?.(newFiles)
  }

  const canAddMore = value.length < maxCount

  return (
    <View className={`image-uploader ${className}`}>
      <View className="image-uploader__list">
        {value.map((file, index) => (
          <View key={index} className="image-uploader__item">
            <Image 
              src={file.url} 
              className="image-uploader__image"
              mode="aspectFill"
            />
            {!disabled && (
              <View 
                className="image-uploader__remove"
                onClick={() => handleRemoveImage(index)}
              >
                <Close size={16} />
              </View>
            )}
          </View>
        ))}
        
        {canAddMore && !disabled && (
          <View 
            className={`image-uploader__add ${uploading ? 'image-uploader__add--loading' : ''}`}
            onClick={handleChooseImage}
          >
            <Plus size={24} />
            <View className="image-uploader__add-text">
              {uploading ? '上传中...' : '添加图片'}
            </View>
          </View>
        )}
      </View>
      
      {maxCount > 1 && (
        <View className="image-uploader__count">
          {value.length}/{maxCount}
        </View>
      )}
    </View>
  )
}

export default ImageUploader
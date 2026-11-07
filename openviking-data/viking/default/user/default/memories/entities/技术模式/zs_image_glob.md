# zs-image 弃用字符串拼接改用 glob 映射
zs-image 原依赖运行时 /static/... 字符串拼接加载本地图易失效，改用 import.meta.glob 建立 staticUrlMap。

## 问题根因
- zs-image 原依赖运行时 /static/... 字符串拼接加载本地图易失效

## 解决方案
- 在 src/components/zs-image/zs-image.vue 使用 import.meta.glob 建立 staticUrlMap
- resolvedSrc 优先返回映射 URL

## 验证与归属
- 所属项目：H5
- 验证证据：extracted source=cursor project=H5
- 验证证据：src=H5/001.md
- 涉及文件：src/components/zs-image/zs-image.vue
- 来源会话：3210cab9-2079-4e56-bb7d-c9763b228c00；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_image_glob",
  "source_extraction_id": "4912fc41379d43e8b448ed8171c58129",
  "version": 1,
  "memory_type": "entities"
}
-->
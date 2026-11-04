# H5 zs-image 用 import.meta.glob 静态映射本地图片
H5 项目修改 zs-image.vue，不再依赖运行时 /static/... 字符串拼接加载本地图片，改用 import.meta.glob 构建静态映射表。

## 问题根因
- 旧实现依赖运行时字符串拼接 /static/... 加载本地图片，易出错且路径不可靠

## 解决方案
- 在 src/components/zs-image/zs-image.vue 用 import.meta.glob 对 src/static/** 建立静态映射表 staticUrlMap
- resolvedSrc 命中映射优先返回构建后的正确 URL
- 传入 src 为 images/house_szf.png、svg/vote_1.svg 等形式时可直接命中

## 验证与归属
- 验证证据：extracted source=cursor project=H5
- 涉及文件：src/components/zs-image/zs-image.vue、src/pages_owner/decision/index.vue
- 来源会话：3210cab9-2079-4e56-bb7d-c9763b228c00；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_zsimage_static_glob",
  "source_extraction_id": "18b10a22986c4cf9b78c51c8d85f5db8",
  "version": 1,
  "memory_type": "entities"
}
-->
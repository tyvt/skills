# ZsImage组件H5相对路径改造
ZsImage.vue已改为H5端图片使用相对路径，不再依赖IMAGE_BASE或VITE_*环境变量，兼容/sz/等二级路由。

## H5端改动
- 本地图（local=true）：使用 static/xxx，如 static/svg/bell.svg，部署在/sz/下解析为/sz/static/svg/bell.svg
- 服务端图（local=false）：已是http(s)://、data:、blob:则原样使用；以/开头加.前缀如./api/file/1.jpg；其它原样
- 加载失败兜底：走 static/${fallBackSrc}

## 微信小程序
- 仍使用 @/env/mp.js 的 IMAGE_BASE，行为与改前一致

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：src/components/ZsImage/ZsImage.vue、src/env/mp.js、vite.config.ts
- 来源会话：c7f8cfb5-52f7-44a5-a4bf-81cfbf4e58af
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zsimage_relative_path",
  "source_extraction_id": "b152b5befc5a42e3af934b208fbec5c4",
  "version": 1,
  "memory_type": "entities"
}
-->
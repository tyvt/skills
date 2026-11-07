# ZsImage在H5子路径部署下的路径规则
zhi2-mobile-admin-h5-c-unlimited部署在/sz/等二级路由且vite base为'./'时，ZsImage.vue在H5端走相对路径，小程序仍用IMAGE_BASE。

## H5端路径规则
- local图用static/xxx，随当前页解析为/sz/static/xxx
- 服务端路径以/开头则加./前缀（如/api/file/1.jpg→./api/file/1.jpg）
- http(s)/data/blob原样透传
- 失败兜底同样使用static/${fallBackSrc}

## 小程序分支
- 微信小程序分支仍使用@/env/mp.js的IMAGE_BASE，行为与改前一致
- 落地点在ZsImage单组件，与全项目相对路径约定一致

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 验证证据：会话c7f8cfb5用户要求ZsImage改相对路径、不写死环境变量，结论给出H5/小程序分支与路径对照表
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/components/ZsImage/ZsImage.vue、vite.config.ts、src/env/mp.js
- 所属项目：无锡市区小程序嵌入H5；来源会话ID：c7f8cfb5-52f7-44a5-a4bf-81cfbf4e58af；代码基线：7a2a29b

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zsimage_path_rules",
  "source_extraction_id": "15d4ef385e484d06ad824eb7386927bc",
  "version": 1,
  "memory_type": "entities"
}
-->
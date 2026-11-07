# Vite须用VITE_前缀替代VUE_APP_变量
苏州市房地产监测V3 中 Vite 构建无法识别 Webpack 风格 VUE_APP_ 变量，须重命名为 VITE_ 前缀。

## 问题根因
- Vite 构建无法识别 Webpack 风格 VUE_APP_Place_URL 变量
- zhi2-web-admin/src/utils/placeDmsp.js 读取该变量进行白名单校验，IframePage/index.vue 承载 /landName/* 菜单

## 修复方案
- 将 VUE_APP_Place_URL 重命名为 VITE_APP_Place_URL
- 写入 env/ 各环境文件，确保 Vite 可读取

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/037.md
- 涉及文件：IframePage/index.vue、vite.config.js、placeApproval/index.vue、placeManage/index.vue、announcement/index.vue、runbook/index.vue、路由信息.json、package.json
- 所属项目：苏州市房地产监测V3；来源会话：2babe7dd-0254-4d05-849d-9a99a05365df；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "Vite变量前缀误用VUE_APP",
  "source_extraction_id": "d1fd2d535d084329aeea42aa9e091a66",
  "version": 1,
  "memory_type": "entities"
}
-->
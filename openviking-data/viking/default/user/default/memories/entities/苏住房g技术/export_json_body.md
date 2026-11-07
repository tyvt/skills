# 复制页导出按钮须对齐正常页 JSON 请求体
同源复制的物业管理区域导出页把入参按 query 串发送，而同一后端接口实际按 JSON body 取值，须以正常页格式为准收敛到 API 层。

## 问题背景
- 场景：物业管理区域(property/complex) 导出按钮报入参格式不对，而公共查询(publicQuery/complex) 导出正常，两者同一后端接口。
- 根因：复制页把导出入参按 query/表单串发送，该导出接口实际按 JSON 请求体取值（正常页即如此），后端读不到参数判格式错误。

## 解决方案
- 遇到「同一接口一处正常一处不正常」先做请求对比（network/控制台看 payload 结构），以正常页面的 formats 为准。
- 改造时把请求体格式收敛到 API 层/公共封装一处，页面只传业务参数，避免同一接口两张页面两种请求形态。

## 验证与归属
- 验证：会话 061bf7eb 用户反馈导出入参格式不对，公共查询正常；提交 c90a9f521 fix(complex): 物业管理区域导出改用 JSON 请求格式。
- 涉及文件：zhi2-web-admin/src/views/property/complex/index.vue；zhi2-web-admin/src/api/index.js；zhi2-web-admin/src/mixins/table.js；zhi2-web-admin/src/mixins/listMixins.js
- 所属项目：苏住房G；来源会话ID：061bf7eb-b67b-4c62-8a6a-f376866b9887；代码基线：415629d

## 差异提示
- 与 #169/#320/#493（删除接口裸数组/{ids}）及 #745（/list→/page 迁移）无关；本条说「导出接口请求体编码形态(JSON body)」需在复制页面对齐，并给请求对比排查法。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "export_json_body",
  "source_extraction_id": "380f4b3087884e7bb7b69fd6773f6451",
  "version": 1,
  "memory_type": "entities"
}
-->
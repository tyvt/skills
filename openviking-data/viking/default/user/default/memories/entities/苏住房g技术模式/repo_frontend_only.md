# 苏住房G仓库仅含前端代码
苏住房G(d:\repository\苏住房G) 仓库仅包含前端子模块 zhi2-web-admin，无 Java/Kotlin 后端代码，后端服务部署在远端。

## 关键结论
- 仓库未找到任何 Java/Kotlin 后端代码，仅含前端子模块 zhi2-web-admin（见 .gitmodules）
- 后端服务部署在远端，env/.env 指向 https://szf.szzfcjj.cn/test
- Controller/Service 层保存/更新权限校验、待提交状态字段白名单无法在本仓库直接定位

## 接口契约推断
- 从前端调用链反推接口契约与权限行为（如 property/complex 备案详情/列表、complexChange 变更详情、楼幢范围子表）
- 相关前端文件：property/complex/detail.vue、index.vue、complexChange/detail.vue、complex/components/rangeTable.vue

## 涉及与归属
- 所属项目：苏住房G；来源会话：231da5b0-82db-4a83-819f-b9b0376ce290

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术模式",
  "name": "repo_frontend_only",
  "source_extraction_id": "7fa17d8bd2df458083f43c28cf14a90a",
  "version": 1,
  "memory_type": "entities"
}
-->

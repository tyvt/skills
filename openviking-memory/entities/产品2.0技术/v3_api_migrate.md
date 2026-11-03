# zhi2-web-admin V3 接口规范化批量迁移
对 zhi2-web-admin 的 src/api 与 views 做 V2 REST → V3 全 POST 动作式的脚本化三轮迁移，并定死边缘场景验收口径。

## 背景与目标
- 整个 zhi2-web-admin 需从 V2 REST 风格改为 V3 全 POST 动作式，涉及 src/api 与 views 大量手写 $get/$post/$put/$del，逐个人工改不现实
- 只靠 request.js 拦截器兜底会留边缘写法不可控（拦截器按路径段数推断动作，跨资源/列表动作会误判），须在调用点先批量收敛

## 三轮脚本分治
- 第一轮（migrate-api-v3.mjs，59/63 文件）：api 文件层 list 的 GET+params → POST+data，CRUD 路径全量改 V3 动作
- 第二轮（migrate-views-v3.mjs，22 个 vue 文件）：$del 路径删除 → $post …/delete
- 第三轮补漏（migrate-views-v3-pass2.mjs，28 个 vue 文件）：$put 根路径 → /update、$post 根路径 → /add、带额外参数的详情 → POST /detail
- 三轮共动约 22+28 个 vue 文件，跨 maintenance/property/building/evaluation/autonomy/benefit 多域

## 验收口径（边缘场景）
- 约 200 处 `$get(\`${…}\`)` 模板拼接属可保留项（跨资源路径如 /property/complex/${id} 或列表动作 /page、/listTree，拦截器按三段路径处理）
- 白名单（/file/*、附件）保持原协议不迁移；特殊 body（如 dict 字符串体）必须单独手改，不能吃通用规则
- 脚本改完必须抽查系统管理（菜单/角色/部门/字典）与各域曾报 400 的详情、删除页，Network 逐个确认是 POST

## 验证与归属
- 来源会话 88e83347：用户先报「接口不符合规范」，追问遗漏，要求按短/中/长期三步修改，最终落地三个迁移脚本并明确三类边缘场景
- 涉及文件：src/api/index.js、src/utils/request.js、src/views/system/menu/index.vue、src/config/security.js
- 所属项目：产品2.0；代码基线：adc516a

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "v3_api_migrate",
  "source_extraction_id": "ff13169b04d14a4c8a6747f663e042e9",
  "version": 1,
  "memory_type": "entities"
}
-->
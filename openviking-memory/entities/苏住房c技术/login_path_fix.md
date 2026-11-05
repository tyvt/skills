# 登录页分包迁移路径修复
苏住房C 登录页分包迁移后旧路径跳转导致 page not found，已统一改为新路径。

## 问题根因
- 登录页从 pages/login 移到 pages_main/login，pages.json 注册为 pages_main/login/index
- 多处代码仍跳转旧路径 `/pages/login/index`，出现 MiniProgramError page not found

## 修复要点
- 统一将所有旧路径引用改为 `/pages_main/login/index`
- 涉及：src/utils/index.js（PAGES.login）、My_Suzhufang.vue、collectBtn.vue、FormLocal.vue/FormNonLocal.vue、ClassDetail.vue/OnlineCass.vue、stockHouse/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：pages_main/login、pages.json、src/utils/index.js、My_Suzhufang.vue、collectBtn.vue 等
- 来源会话ID：73f5531d-ca8f-4227-9e76-d2fa4b5c98a1
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "login_path_fix",
  "source_extraction_id": "6ad3f2ea4fc04335a74efe9f454748b7",
  "version": 1,
  "memory_type": "entities"
}
-->
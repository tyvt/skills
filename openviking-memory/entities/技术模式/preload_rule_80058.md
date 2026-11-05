# 微信preloadRule体积超限报错80058
苏住房C项目中因pages/index/project预加载分包总大小超2MB触发微信报错80058。

## 问题根因
- `pages/index/project`（苏找房Tab）预加载配置包含`pages_tab`和`pages_transaction`两个分包
- 两分包编译后合计约2686KB，超过微信单条`preloadRule`的2MB（2048KB）上限
- 报错码为`80058`

## 修复方案
- 已删除`pages/index/project`的预加载规则
- `pages_tab`由首页`pages/index/home`预加载覆盖，进入苏找房Tab通常已下载
- `pages_transaction`源码约2.3MB，体积大不适合与其他分包一起预加载
- 用户首次进入交易功能时按需加载分包，仅首次稍慢

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages.json、src/utils/menuNav.js、src/pages/redirect/index.vue、src/pages_owner/ownerCard/index.vue
- 来源会话ID：4a12fc00-b2b5-4a2f-9855-3ac716f228d9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "preload_rule_80058",
  "source_extraction_id": "2a80a42a743244f69072321e42dbe8b8",
  "version": 1,
  "memory_type": "entities"
}
-->
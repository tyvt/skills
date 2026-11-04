# 按钮显隐改由 getCustomConfig 配置控制
楼盘详情页按钮显隐需求应改为后端配置驱动，禁止用 projectId 写死判断。

## 问题背景
- 楼盘详情页「权利人信息同步」按钮原用 visible: ['wuguan'].includes(this.projectId) 按项目 ID 写死
- 换环境就要改代码，每次开关都要发版，无法跨环境复用

## 解决方案
- 页面加 isShowSycHouseObligeeBtn 状态（默认 false）
- created 里请求 /property/common/getCustomConfig，读 res.data.complex.isShowSycHouseObligeeBtn
- 用 parseCustomConfigBool 兼容 true/false、"1"/"0"、"true"/"false" 多种布尔形态后赋给 visible
- 按钮开关类需求优先走 getCustomConfig 配置位 + 布尔归一化函数，前端禁止用 projectId/环境值写死显隐

## 验证与归属
- 验证：会话 a89f37b2 中 property/complex/index.vue 将 visible 从 projectId includes 判断改为 getCustomConfig 返回的 isShowSycHouseObligeeBtn，parseCustomConfigBool 兼容三种布尔写法
- 涉及文件：src/views/property/complex/index.vue
- 所属项目：产品2.0；来源会话ID：a89f37b2-f922-4d18-a1d2-898f3a0c0db6；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "btn_visible_config",
  "source_extraction_id": "1dfa118ed8184c1497a5c2ba66117fa9",
  "version": 1,
  "memory_type": "entities"
}
-->
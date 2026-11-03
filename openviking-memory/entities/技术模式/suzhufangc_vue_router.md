# 苏住房C 小程序 vue-router 取参失效致按钮无响应
苏住房C 市民端因项目已移除 vue-router 依赖，页面用 useRoute() 取参会抛错使条件绑定的按钮渲染但无点击事件。

## 问题现象
- 添加房屋成功页「查看电子业主卡」点击无反应、控制台无接口请求，按钮看得见点不动
- 根因：onShow 里用 useRoute().query 读 isOwner，useRoute() 返回 undefined 抛 TypeError，isOwner 恒为 false
- uni-app 编译产物插槽内容始终渲染、仅点击事件按 isOwner 条件绑定，故按钮渲染但没挂 handler

## 修复做法
- 小程序页面一律在 onLoad(options) 取参并做布尔归一：isOwner = !(!options || !options.isOwner)
- 禁用 useRoute/useRouter，grep 全量清查 src 下 vue-router 引用（本批 7 个文件）全部改为 onLoad(options)
- 重新 build 并到 dist 产物确认已编译成 onLoad(e=>...) 再回归

## 排查思路
- 优先按「渲染无条件、绑定有条件 → 参数为 undefined → 取参用了不存在的 API」这条链查
- 编译期不报错、页面不白屏，仅表现为点击无反应

## 归属与验证
- 所属项目：苏住房C；来源会话：880c55cb-1f23-4014-9929-32b0c295f89a；代码基线：bb6d74a
- 验证：全局 grep 确认 src 下 vue-router 引用清零 + npm run build 通过 + 核对 dist/pages_owner/house/owner/success.js 产物
- 涉及文件：src/pages_owner/house/owner/success.vue、house/owner/input.vue、add.vue、pages_owner_extra/elevator/input.vue、addAlone.vue、page-query/managed-property-list.vue、immediate-list.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufangc_vue_router",
  "source_extraction_id": "a59756a24d99485f998a670e9881d6cd",
  "version": 1,
  "memory_type": "entities"
}
-->
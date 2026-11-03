# 门户 UnifiedLogin 页
门户白名单路由 `/UnifiedLogin` 的 UnifiedLogin.vue 组件，承载登录前落地页与操作指引。

## 页面结构与指引
- `UnifiedLogin.vue` 是唯一渲染「商品房 / 存量房 / 住房租赁」横向操作指引引导卡（`guideList` + `.guide-card`）的位置；登录后 `/index` 链（index-wrapper/index-new 等）不含这些字符串与 markup。
- 页眉主副标题非文本节点，而是 `public/assets/images/UnifiedLogin/text_2.svg`（平台名）与 `text_1.svg`（一网通办副标题），箭头为 `icon_guide_arrow.svg`。
- 改文案或换字体需换 SVG 或改组件结构，不能只在模板里改字。

## 代码校验要求
- `UnifiedLogin.vue` 的 ESLint 中断时 IDE 无报错致隐患遗漏，须执行 `npm run lint -- src/views/home/UnifiedLogin.vue` 校验公示区与 Tab 切换。

## 验证与归属
- 指引唯一性验证：子任务 sess_subagent_agent_1103d0f4 全库检索「This is the only place the three cards exist」，index-new/index-bak/index-wrapper 无对应文案。
- lint 要求来源：src=门户/006.md；会话 26652725-5aa2-4402-bcd5-3f757453c90c。
- 涉及文件：zhi2-web-admin/src/views/home/UnifiedLogin.vue、zhi2-web-admin/src/router/index.js、zhi2-web-admin/public/assets/images/UnifiedLogin/text_1.svg、text_2.svg、publicAnnouncement.js、externalInfo.js、login.vue、api/index.js、utils/request.js、package.json、utils/portalApiRewrite.js。
- 所属项目：门户；代码基线 dfee5a6 / none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unifiedlogin_page",
  "source_extraction_id": "79033622a7cb4a268c141fd5ce945446",
  "version": 1,
  "memory_type": "entities"
}
-->
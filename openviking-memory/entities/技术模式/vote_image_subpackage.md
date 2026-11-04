# Owner Vote List Image Subpackage
小程序的静态图片不能在子包之间访问，导致 house_szf.png 显示失败。

## 问题与修正
- 子包的静态图片不能在包之间访问，导致 house_szf.png 在投票列表中不可见
- 图片已复制到 src/pages_vote/static/images/
- DecisionList.vue 和 StepChoose.vue 明确指定了子包 pages_vote
- utils/index.js 更新了子包映射优先级

## 涉及的文件
- src/pages.json, src/utils/index.js
- src/pages_owner/decision/index.vue, components/DecisionList.vue
- src/store/menu.js
- src/pages_vote/decision/index.vue, components/DecisionList.vue, src/pages_vote/elect/index.vue

## 来源
- 来源会话: 5a891058-8e80-44d0-9a37-a7ff9e578ff9
- 所属项目: zhi2-mobile-shimin

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_image_subpackage",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "entities"
}
-->
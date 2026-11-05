# 首页待办改flowable/todo后TagsView双固定标签
首页换接口下发flowable/todo且保留静态/index时，affix被叠加三次导致出现两个固定「待办任务」标签。

## 问题根因
- 静态路由/index的meta.affix: true
- permission.js给接口路由flowable/todo也设affix: true
- TagsView对path === 'index'额外固定逻辑

## 解决方案
- 去掉静态/index的affix
- filterAffixTags里仅当路径与homeRoutePath一致时为flowable/todo固定一个标签
- 删除对path === 'index'的特殊分支

## 验证与归属
- 验证：用户反馈「tag里面有两个固定的待办任务」；改完无论落地/flowable/todo或回退/index只保留一个固定待办
- 涉及文件：src/router/index.js、src/store/modules/permission.js、src/layout/components/TagsView/index.vue、src/views/flowable/todo.vue、src/views/home/index-wrapper.vue
- 所属项目：园区公共收益；来源会话：3bcff305-97a0-45ac-a995-1878bd7ee92b；代码基线：f783ca2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tagsview_dual_affix",
  "source_extraction_id": "31fe75b5c4d544939feb0480b86197a7",
  "version": 2,
  "memory_type": "entities"
}
-->
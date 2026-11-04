# 门户中经纪人照片 URL 及页面布局的验证
Vue 审查发现未验证的经纪人照片 URL 以及布局残留。

## 问题
- 经纪人页面中的照片 URL 未经过验证
- 布局存在诸如废弃的 `nth-child` 之类的残留

## 已应用的解决方案
- `portalPersonPhoto.js` 新增 `isAllowedPersonPhotoUrl` 用于限制相对路径和 `http(s):`，并回退至默认图片
- 机构详情使用 `agencyFields.fullWidth` 配合两列网格，移除了 760px 断点规则
- 照片容器恢复 `aria-label`
- `record` 的监听收窄至 `id/code`

## 涉及的文件
- `BrokerPages.vue`, `public-portal-designs.ts`, `portal.scss`, `brokers.js`, `portalPersonPhoto.js`

## 验证与归属
- 验证证据: `src=门户/024.md`
- 所属项目: portal (门户)
- 会话: `5913f527-6905-47bc-8ed0-a0c22c08e59b`
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_broker_photo",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "entities"
}
-->
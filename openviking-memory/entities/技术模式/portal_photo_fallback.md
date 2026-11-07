# 门户照片回退
在租赁门户中使用 empty.svg 作为缺失人员照片的回退方案。

## 描述
- 房地产公司员工展示页面在缺少照片时不显示图片。
- 在 `portalPersonPhoto.js` 中添加了 `resolvePersonPhotoSrc`，以便在没有 photo/photoUrl/avatar/headPortrait 或加载失败时返回 `/assets/images/empty.svg`。
- 左侧的经纪人详情开始使用带边框的 `img`。
- 机构 logo 的占位符未更改。

## 文件
- `RentalDetailDialog.vue`, `BrokerPages.vue`, `PortalDialogHost.vue`, `RentalPages.vue`
- `tests/e2e/public-portal-interactions.spec.ts`, `mock/brokers.js`, `UnifiedLogin.vue`, `tests/e2e/fixtures/public-portal-designs.ts`

## 验证
- 原始会话: `5942ae9c-e4bd-4732-877f-0bca30cb992b`

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：5942ae9c-e4bd-4732-877f-0bca30cb992b


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_photo_fallback",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->

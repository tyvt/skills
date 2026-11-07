# 门户首页二级人员照片占位图统一
门户项目「首页二级」缺人员照片位置统一使用 empty.svg 占位，新增 resolvePersonPhotoSrc 回退逻辑。

## 覆盖范围
- 住房租赁 → 从业人员信息公示：列表点「基本信息」弹窗（RentalDetailDialog）
- 经纪机构 → 从业人员信息公示：经纪人基本信息页（BrokerPages broker-detail），含从机构「经纪人员」进入的同页

## 实现说明
- 新增 `portalPersonPhoto.js`：`resolvePersonPhotoSrc` 在无 photo/photoUrl/avatar/headPortrait 或图片加载失败时回退到缺省图
- 经纪人详情左侧原空白框改为带边框的 `<img>`，样式与租赁弹窗照片区一致
- E2E：经纪人「基本信息」流程增加 empty.svg 断言（租赁侧原有断言保留）
- 机构/门店详情里的「机构标志」仍用原占位，未改（非人员照片）

## 审查跟进（BrokerPages 布局复查）
- 新增 `portalPersonPhoto.js`：`isAllowedPersonPhotoUrl` 仅允许相对路径 `/…` 与 `http(s):`，非法则回退默认图（来源会话 5913f527）
- 机构详情改用 `agencyFields.fullWidth` + 双列 grid，并去掉 760px 断点里残留的 `nth-child` 标签宽度规则
- 经纪人照片容器恢复 `aria-label="人员照片"`
- `record` 的 `deep` 监听改为只监听 `record.id` / `record.code`，用于重置加载失败状态
- 此前参考稿已将 562px 左侧宽度、47px 固定行高改为约 32% 弹性左栏与 `minmax` 行高，本次无需再改
- 拆分 SFC、单测 URL 校验等未做（非阻塞）

## 涉及文件
- d:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- d:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue
- d:/repository/门户/zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- portalPersonPhoto.js（位于 publicPortal 相关目录）

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 所属项目：门户；来源会话：5942ae9c-e4bd-4732-877f-0bca30cb992b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "person_photo_placeholder_fix",
  "source_extraction_id": "d5bccc2cb1b14765bf4b4dd60f7526a1",
  "version": 2,
  "memory_type": "entities"
}
-->
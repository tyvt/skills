# 门户公开弹层主题色规则
公开门户弹层主题色集中在 portalTheme，由 portalSegment 与 resolvePortalAccent 共同决定。

## 配色规则
- 商品房段恒为 #3f669c（蓝）
- portal=houses 仅当 query.portalSegment=stock（PORTAL_SEGMENT_STOCK）时为 #12AD62（绿），否则为蓝
- PortalDialogHost 用 --portal-accent 驱动 portal.scss

## 实现要点
- UnifiedLogin 在商品房/存量菜单链分别挂 commercial/stock
- openPortal 写入 query，open 无 segment 时 delete portalSegment，close 清 segment 防脏 query
- 读取 segment 须规范化：重复 query 键可能为数组，用 Array.isArray(s)?s[0]:(s||'') 再与常量比较

## 风险与验证
- HIGH：houses 无 segment 深链误显商品房蓝头，外链/书签需带 portalSegment=stock 或产品层增加稳定区分
- MEDIUM：PortalDialogHost portalSegment 数组类型
- 文件：portalTheme.js、PortalDialogHost.vue；项目：门户；会话：b642c935-7aec-4bc3-b375-5091c39f01f7；基线：e1f8e0b

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：b642c935-7aec-4bc3-b375-5091c39f01f7


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "public_portal_accent",
  "source_extraction_id": "ebc898f91d76487682d9f8c6657d78bd",
  "version": 1,
  "memory_type": "entities"
}
-->

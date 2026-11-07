# 门户二级页顶层卡片间距归一化
门户二级页顶层卡片间距须以全量路由实测找唯一离群值再改，避免只改单页把离群值搬家。

## Description
- 现象：用户反馈「首页所有链接页面的间距保持一致，这个页面就间距过大了」，实际是合同备案日期查询页顶层卡片间距 75px，而门户其它二级页统一 30px。
- 根因：各页「顶层卡片」外间距若各自写死 margin-top 则无单一事实源，只改点名页等于把离群值搬家而非消灭。
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue；tests/e2e/public-portal-visual.spec.ts；src/views/home/publicPortal/README.md

## Solution
- 同视口（1920×1080、DPR2）实测全部 13 个门户二级路由顶层卡片间距，列分布表找唯一离群值（本批：楼盘/楼栋/房屋/预售许可/公告 30px、经纪机构/经纪人列表 31px、可售汇总/即时成交同级卡片 19px、合同备案日期查询 75px 唯一离群）。
- 只改离群项到统一值 30px，保持相邻区块间距总和稳定（按钮底边到结果文字空白 174px→125px，结果卡高 172px、字号 40px 不动）。
- 补结构断言将「卡间距 30px + 卡片高 172px + 结果文案」写进 public-portal-visual.spec.ts；README「设计覆盖与验证记录」写明偏离依据与实测数据。
- 用同款归一化 + pixelmatch 复算相似度（本批 96.796%，门槛 95%）决定要不要重拍基线。

## Verification
- 验证证据：会话 1ce12622-a06c-4fc8-b997-bae5eac68429 用户诉求「首页所有链接页面的间距保持一致，这个页面就间距过大了」；最终给 13 路由实测分布表与改后数值（表单卡 138–310→结果卡 340–512、间距 30px、卡高 172px）。
- 来源会话ID：1ce12622-a06c-4fc8-b997-bae5eac68429；代码基线：2785dd9；所属项目：门户

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_card_spacing",
  "source_extraction_id": "3c0ea417a4ea45d19c63c496e33ea242",
  "version": 1,
  "memory_type": "entities"
}
-->
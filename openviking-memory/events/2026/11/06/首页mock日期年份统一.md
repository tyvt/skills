# Summary
用户将统一登录首页相关 mock 中的日期时间统一为 2026 年。涉及文件：publicPortal/mock/notices.js（公告时间 2022-* → 2026-*）、publicPortal/mock/rental.js（信用公示日期、信息来源 2025-* → 2026-*）、publicPortal/mock/brokers.js（门店登记号 2025076466 → 2026076466）、publicPortal/pages/InformationPages.vue（合同编号 202604080296，备案日期 2026年10月4日）、publicPortal/components/PropertyDetailDialog.vue（建成日期、抵押起止改为 2026 年）、publicPortal/README.md。未改动部分：预售/证件等到期日仍为 2027、2028；「2016 版商品房买卖合同」PDF 与菜单文案仍为法规范本年份。接口公告失败时首页回退到 publicNotices。所属项目：门户；来源会话：5a79e058-ab01-4651-a329-93cfa63f858d。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】preference
【标题】首页mock数据的日期时间都改为2026年
【内容】已将统一登录首页相关 mock 中的日期时间统一为 **2026 年**，修改如下： | 文件 | 变更 | |------|------| | `publicPortal/mock/notices.js` | 公告时间 `2022-*` → `2026-*`（保留原月日与时分秒） | | `publicPortal/mock/rental.js` | 信用公示日期、信息来源 `2025-*` → `2026-*` | | `publicPortal/mock/brokers.js` | 门店登记号 `2025076466` → `2026076466` | | `publicPortal/pages/InformationPages.vue` | 合同编号 `202604080296`，备案日期 `2026年10月4日` | | `publicPortal/components/PropertyDetailDialog.vue` | 建成日期、抵押起止改为 2026 年 | | `publicPortal/README.md` | 与合同 mock 说明一致 | **未改动的部分（非展示用旧日期）：** 预售/证件等到期日仍为 `2027`、`2028`；「2016 版商品房买卖合同」PDF 与菜单文案仍为法规范本年份。 接口公告失败时首页会回退到 `publicNotices`
【验证证据】extracted source=cursor project=门户
【涉及文件】`publicPortal/mock/notices.js ; `publicPortal/mock/rental.js ; `publicPortal/mock/brokers.js ; `publicPortal/pages/InformationPages.vue
【所属项目】门户
【来源会话ID】5a79e058-ab01-4651-a329-93cfa63f858d
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "首页mock日期年份统一",
  "goal": "记录mock日期变更",
  "summary": "用户将统一登录首页相关 mock 中的日期时间统一为 2026 年。涉及文件：publicPortal/mock/notices.js（公告时间 2022-* → 2026-*）、publicPortal/mock/rental.js（信用公示日期、信息来源 2025-* → 2026-*）、publicPortal/mock/brokers.js（门店登记号 2025076466 → 2026076466）、publicPortal/pages/InformationPages.vue（合同编号 202604080296，备案日期 2026年10月4日）、publicPortal/components/PropertyDetailDialog.vue（建成日期、抵押起止改为 2026 年）、publicPortal/README.md。未改动部分：预售/证件等到期日仍为 2027、2028；「2016 版商品房买卖合同」PDF 与菜单文案仍为法规范本年份。接口公告失败时首页回退到 publicNotices。所属项目：门户；来源会话：5a79e058-ab01-4651-a329-93cfa63f858d。",
  "ranges": "11-17",
  "source_extraction_id": "4f25a1b4bb8f447d83394fd4c13b51d0",
  "version": 1,
  "memory_type": "events"
}
-->
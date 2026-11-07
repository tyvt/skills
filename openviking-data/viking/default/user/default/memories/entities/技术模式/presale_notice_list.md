
# UnifiedLogin 预售公告列表
门户 UnifiedLogin 接入的预售许可公告列表功能，涵盖免登录接口、注销过滤、空态与解析兼容等实现要点。

## 背景与问题
- presaleList 初始为 [] 且无 loading 标志，接口返回前误渲染「暂无预售许可公告」
- 列表只读 res.data，而同页其它列表用 extractPageRows，后端走 rows/records 会静默为空
- :key="item.applyCode" 在缺失或重复时不稳
- cancelFlag !== '1' 未覆盖数字 1，已注销项仍可能展示

## 实现与修复要点
- 新增 openNotice.js 的 GET /presale/open/notice/list，配置 noMessage 与 skipAuthDialog 实现免登录（UnifiedLogin）
- vue 挂载调用 loadPresaleNoticeList，过滤 cancelFlag 为 1 取前 4 条，映射 permitNo 等字段，空值显「—」
- 增加 loading 或「未首次加载完成」标志，仅请求结束且列表仍空时显示暂无
- 列表行统一 extractPageRows(res) 或多字段兜底，兼容 rows/records；key 用稳定复合键或 id
- 注销过滤用 String(cancelFlag) === '1' 或 == 1，先过滤注销再 slice(0, 4)；API 层免登录配置与现有门户公开接口一致

## 涉及文件
- zhi2-web-admin/src/api/presale/openNotice.js
- zhi2-web-admin/src/views/home/UnifiedLogin.vue
- zhi2-web-admin/src/utils/request.js
- zhi2-web-admin/src/api/index.js
- zhi2-web-admin/src/api/portal/publicAnnouncement.js
- zhi2-web-admin/src/api/portal/externalInfo.js
- zhi2-web-admin/src/utils/portalApiRewrite.js
- zhi2-web-admin/vite.config.js
- zhi2-web-admin/src/api/presale/houseInfo.js
- zhi2-web-admin/src/views/home/index-new.vue
- zhi2-web-admin/package.json

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：审查结论指出 presaleList 初始空且无 loading、解析只用 res.data、cancelFlag 未覆盖数字 1；另含 src=门户/033.md 与 cursor 会话提取
- 所属项目：门户；来源会话：074a72f3-331b-40b4-8c2f-331816b2d29d、6b002207-e45f-4242-836c-3b25c34bb174；代码基线：04586c4


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_notice_list",
  "source_extraction_id": "5492aad7d0ce437a9c142e7cf60496d6",
  "version": 2,
  "memory_type": "entities"
}
-->
# 经纪侧栏欢迎卡与常用功能对齐
broker 侧栏欢迎卡（HomeUserCard.vue）及右侧常用功能已对齐设计稿。

## 欢迎卡改动
- 固定比例：用 `aspect-ratio: 488 / 220` 替代 `min-height: 192px`，避免侧栏变窄时底图被纵向拉变形
- 日期排版：由三行改为两行——`今天是 yyyy年mm月dd日 星期x，` + `祝您工作愉快！`
- 底图路径：通过 `encodeURIComponent('切图 156.svg')` 生成背景 URL，避免中文/空格导致底图不加载

## 经纪侧栏常用功能
- `homeDataMixin.js` 中 `broker` 下侧栏固定使用配置里的 `SIDEBAR_QUICK_FUNCTIONS`（房屋档案、预售申请、网签备案、资金监管）
- 不再用接口 `commonFunctions` 的前 4 项，避免出现「合同查询」等与设计不一致的项
- 已去掉 `layoutVariant` 里硬编码的调试代码

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：zhi2-web-admin/src/views/home/components/HomeUserCard.vue、zhi2-web-admin/src/views/home/mixins/homeDataMixin.js
- 所属项目：门户；来源会话ID：2a30e4bd-5103-4309-bf91-2ec90aeb4857；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_user_card",
  "source_extraction_id": "52c39ff7d9024162adeec53c60ddde30",
  "version": 1,
  "memory_type": "entities"
}
-->
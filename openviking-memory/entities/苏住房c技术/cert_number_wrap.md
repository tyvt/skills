# flex-wrap致权证号折行改固定两行布局
苏住房C小程序权证号输入框因flex-wrap致“号”字折行，改为固定两行布局解决。

## 问题现象
- 权证号输入框在一行空间不足时“号”字被挤至下一行
- 影响页面：pages_owner/house/verify.vue、pages_transaction/publishHouse/verification.vue等

## 根因
- 使用flex-wrap布局，空间不足时换行
- placeholder维持22rpx字号需求

## 解决方案
- 改为固定两行布局：第一行“苏”+年份输入框，第二行“苏州市不动产权第”+编号输入框+“号”同行
- 保持placeholder为22rpx字号

## 涉及文件与归属
- 涉及：pages_owner/house/verify.vue、pages_transaction/publishHouse/verification.vue、styles/form2.scss、pages_transaction/publishHouse/ImgCode/index.vue、pages_owner/house/owner/addHouse.vue、pages_transaction/stockHouseSign/apply.vue、pages_my/setting/phone.vue、uni.scss
- 验证证据：苏住房C/026.md
- 来源会话ID：98b2613a-ff87-4511-9692-3d6fb3b49725
- 所属项目：苏住房C

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "cert_number_wrap",
  "source_extraction_id": "0303e6fbd99640a4aad5dc2a1e3e3234",
  "version": 1,
  "memory_type": "entities"
}
-->

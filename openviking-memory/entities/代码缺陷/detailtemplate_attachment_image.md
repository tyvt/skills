# DetailTemplate 附件字段须配 type:'image'
产品2.0 中 DetailTemplate 的附件字段若配成 type:'text' 仅渲染路径字符串、无法预览，须改为 type:'image'。

## 现象
- 房屋质量保证金-资金缴存详情页附件区只显示一串路径文本，无缩略图、不可点击、无法预览

## 根因
- 字段在 DetailTemplate 的 contentInfo 里被配成 type:'text'，走纯文本分支，不拼 URL、不渲染缩略图或可点击文件名
- 区别于已知「type:'link' 只认 item.link，附件 URL 必须用 type:'image'」：type:'text' 既不拼地址也不给预览入口，表现为「只有路径字符串」

## 修复做法
- 把附件字段改为 type:'image'：图片渲染缩略图并支持点击放大，PDF 渲染可点击文件名链接，自动拼完整访问地址
- 改在共享的 components/detail.vue 一处生效，资金缴存与资金支用两个详情页同时修好，无需逐页改

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 会话 151c21b4：用户报资金缴存详情页附件不能预览，根因 type:'text'，改 type:'image' 后两处详情同时生效
- 涉及文件：maintenance/guaranteeDeposit/components/detail.vue、guaranteeDeposit/detail.vue、guaranteeDeposit/deposit/detail.vue
- 所属项目：产品2.0；来源会话：151c21b4-932f-40b4-a857-68f078ae0b56；代码基线：414029f

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "detailtemplate_attachment_image",
  "source_extraction_id": "7d247f9850784ea7a807d834ba19fc05",
  "version": 1,
  "memory_type": "entities"
}
-->
# 附件配置业务码精确匹配
园区V0 附件弹窗左侧文件夹不显示并非配置失效，而是页面查询用的 busiCode 与配置不一致，且后端精确匹配无继承。

## 现象与根因
- 附件弹窗左侧文件夹来自 zs-atta 组件调用 FileUploadCfg 接口，按 basetheName 精确匹配查询
- 配置的 3003 与实际使用的业务码不一致，导致文件夹出不来
- 后端同样精确匹配，没有父级继承

## 涉及文件
- EstateManagement-Park/src/main/webapp/components/attachment.js
- mpfeChange/js/mpfe_MpfePublicPartsChangeDetail.js
- mpfeChange/js/mpfe_MpfePublicFacilitiesChangeDetail.js

## 归属
- 所属项目：园区V0；来源会话ID：a7c52e5a-626b-4cb7-b14d-348a9e7e6fe8；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区V0


<!-- MEMORY_FIELDS
{
  "category": "技术笔记",
  "name": "attachment_busicode",
  "source_extraction_id": "3b01b994d2274aec966ad5632121ebeb",
  "version": 1,
  "memory_type": "entities"
}
-->

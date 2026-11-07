# 合同详情页新增修改按钮
原 src/pages-iHome/my/contractDetail.vue 无编辑入口，信息不可编辑。

## 实现要点
- 新增"修改"按钮：文案用 $t('per.edit')（中文"编辑"），无翻译时回退为"修改"
- 按钮置于合同操作区首位（变更、撤销、终止、续期之前），灰色边框/文字与其它按钮区分
- onEdit 校验 detail.leaseContractId 存在，否则提示"合同信息异常"
- uni.navigateTo 跳转 /pages-rent/contractEdit?id=${detail.leaseContractId}
- contractEdit 页支持编辑：租赁信息（类型、项目/房号、租期、房间号、起止日期）、承租人信息（姓名、性别、手机、证件类型/号码、学历、生日）、合同基本信息、收费明细、随住人信息
- 编辑页接口与详情页一致（v2.0/indemnity/leaseContract/...）
- 原文件已有 lint 报错（$t、res.data 类型等）为历史问题，非本次改动引入

## 验证与归属
- 验证证据：extracted source=cursor project=0
- 涉及文件：src/pages-iHome/my/contractDetail.vue、pages-rent/contractEdit.vue；所属项目：0
- 来源会话：bdd38753-38c4-41b7-993d-61f3bc588407；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_edit_button",
  "source_extraction_id": "0122db327331431da25e9acf29cd5aa5",
  "version": 2,
  "memory_type": "entities"
}
-->
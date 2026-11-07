# 协议/开户表单网点主键靠名称反查
新增共管协议等表单提交需 bankBranchManageId，但账号详情接口只回 openbankName 等名称字段、无网点 ID，须经网点列表接口按名称反查。

## 问题根因
- 开户/协议表单的银行信息来自两条互不相通链路：账号链路只存名称与银行编码，网点维度是另一套字典
- 保存接口按 ID 关联网点，两边未对齐，前端只能自行拼接

## 解决方案
- 用详情带出的 openbankName 调银行网点列表接口 selectTJgBankBranchList，按名称精确匹配取 sysBankBranchId 回填 bankBranchManageId
- selectTJgBankBranchList 与 /system/unionBank/page 联行号体系、/prefund/bankBranch/page 缴款网点体系非同一接口，勿互相替换
- 匹配失败显式提示用户重选网点，不要静默提交空 ID 导致校验报错或关联错网点
- 回填后断言 bankBranchManageName 与所选网点名称一致，作为匹配成功自检

## 提交前核对清单
- bankBranchManageId 是否与网点列表 sysBankBranchId 相等
- regAccountID 是否非空
- 三个 Code 字段是否都是数字

## 验证与归属
- 修复链路：getExtendedByComplexId 补区域/街道/社区编码 → propertyAccount 取账号信息（无网点 ID）→ selectTJgBankBranchList 按 openbankName 反查 bankBranchManageId
- 字段核对表 bankBranchManageId=2072989539709247490 标注已与网点列表 sysBankBranchId 匹配
- 涉及文件：benefit/pubRegulatoryAgreement/index.vue、property/agreement/detail.vue；所属项目苏住房G；来源会话 a757e64c；代码基线 fb3e960

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_branch_lookup",
  "source_extraction_id": "6e32ae4fe2bb45ddb2751974b1edf7b2",
  "version": 1,
  "memory_type": "entities"
}
-->
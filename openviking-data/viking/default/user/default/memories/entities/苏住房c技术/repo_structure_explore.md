# 苏住房C仓库结构与认证流程
苏住房C 仓库主体为 zhi2-mobile-shimin(uni-app + Vue3 + Vite)，代码区分实名认证与身份认证两套流程。

## 技术栈
- 仓库路径：`d:epository\苏住房C\zhi2-mobile-shimin`
- 技术栈：uni-app + Vue3 + Vite 小程序

## 认证流程区分
- 实名认证(`pages_my/verification`)：账号实名，含「居民身份证 / 非居民身份证」选择
- 身份认证(`pages_owner/authentication`)：业主 / 家庭成员 / 租客 房屋身份认证

## 实名认证相关文件
- `pages_my/verification/TypeChoose.vue`：证件类型选择页
- `pages_my/verification/FormLocal.vue`：居民身份证实名(人脸核身)
- `pages_my/verification/FormNonLocal.vue`：非居民身份证信息填写
- `pages_my/verification/FormManual.vue`：人工实名表单

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：954ffa8f-ec2a-42e2-9922-79c7c7b82379；代码基线none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "repo_structure_explore",
  "source_extraction_id": "6528a1185c544a1ba7b847924dbc2b47",
  "version": 1,
  "memory_type": "entities"
}
-->
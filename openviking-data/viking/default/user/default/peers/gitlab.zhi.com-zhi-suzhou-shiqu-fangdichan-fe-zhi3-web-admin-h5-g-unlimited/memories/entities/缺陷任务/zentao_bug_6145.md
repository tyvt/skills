# 禅道Bug 6145 资质附件必填缺失
房产管理系统zhi2-web-admin中企业入网认证与企业基本信息变更页「资质附件」缺必填星标与保存校验，根因为附件配置 IS_REQUIRED=0，数据修正后解决。

## 根因与定位
- 标题：开发企业账号-企业入网认证与企业基本信息变更，资质附件需要增加必填符号与必填校验；zhunan 提交、指派 tiany
- 现象：资质附件无必填星标、保存不校验，仅最终提交被后端拦「请上传资质附件」
- 必填星标与保存前校验完全由后端附件配置 isRequired 驱动，前端逻辑无 bug
- AppendixRequirementCard 仅当 String(item.isRequired)==='1' 渲染 *；checkRequiredAppendix 仅校验 isRequired==='1' 要件
- 数据库两条资质附件配置 IS_REQUIRED=0：busCode 040100(code company_register_qualification)、qybgxq(code 空)
- 营业执照/法人身份证/授权委托书因恒必填规则(ALWAYS_APPENDIX_CODES+授权委托书)已有星标，对比明显

## 修复方案
- 纯配置数据修正：UPDATE COMMON_FRAMEWORK.T_APPENDIX_CONFIG SET IS_REQUIRED='1' WHERE APPENDIX_CONFIG_ID IN ('2116041500439711746','2117136362742222849')
- 两条资质附件配置均置 IS_REQUIRED=1，前端现有逻辑自动生效，无需改代码或构建部署
- 数据库为房地产监测V3(dameng .dev)，COMMON_FRAMEWORK 为权威 schema，配置按请求实时读取无 Redis 缓存
- 注册页 CompanyRegisterSingleForm 自身过滤隐藏资质附件且不调用 checkRequiredAppendix，不受影响

## 验证与禅道回写
- 两条配置确认 IS_REQUIRED=1；链路核对入网认证页提交预检与基本信息变更 beforeSaveHook 预检均走此配置
- git 工作区干净无代码提交；禅道回写 bug 6145 status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan、resolvedDate=2026-11-04 14:24

## 未验证项
- 客测环境需刷新重登回归，确认两页资质附件显示 * 且未上传时保存即提示「请上传：资质附件」
- 纯配置变更未涉及源码，如需同步 test/prod 的 T_APPENDIX_CONFIG 需另行处理

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6145",
  "source_extraction_id": "e60bff4b52ce4854bec3b22c15339e6d",
  "version": 1,
  "memory_type": "entities"
}
-->
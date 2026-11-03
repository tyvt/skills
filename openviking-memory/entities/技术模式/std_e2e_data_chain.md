# 标准化评价E2E造数据依赖链
标准化评价E2E需按单向依赖链造数据，顺序错会导致新增失败或审批无反应。

## 依赖链路
- 外部小区/企业主数据 → 物业服务等级（提交+审批=已备案）→ 检查记录（initItems取题→新增→提交→审批）→ 整改（reply/confirm/close/supervise）
- 检查记录只认「已备案」的物业服务等级，等级没走完提交+审批就引用不到合规等级
- 审批通过后自动生成整改通知书，手工造通知书会与检查记录对不上账，测不到自动生成链路

## 检查记录最小集
- 新增体最小集：checkType + complexId + 5类等级 + 2个签字 + isGenerateNotice + itemList[{contentId, isNotApplicable}]，缺一项后端拒
- checkType 4类：自查/街镇/区县/市级，同一套 controller /evaluation/checkRecord/*
- 种子标准直接用 2120000000000000001~...005（市标一~五级，每份5类别/5项目/15内容/60选项），别自己造题库

## 造数入口与主键
- 优先用H5接口造检查记录：H5端16个接口无任何@RequiresPermissions，比管理端简单得多
- H5接口列举：/v2.0/evaluation/h5/check/stat|task/page|record/page|complex/page|start|{id}/form|save|{id}/submit|{id}/detail、/h5/rectify/{id}|save|submit|{id}/pdf
- 主键按 checkRecordId / rectificationNoticeId 取，别用通用的 id

## 验证与归属
- 来源会话 d38c482b-a854-4693-99d7-ccd429f31165（基线05caac8）用户诉求2
- 涉及文件 e2e/std-evaluation/cases/01-standard-crud.cjs、e2e/std-evaluation/lib/std-eval-lib.cjs、D:/evalrun/endpoints.txt

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "std_e2e_data_chain",
  "source_extraction_id": "3de88f366cf7424d88a42c9766d22bcd",
  "version": 1,
  "memory_type": "entities"
}
-->
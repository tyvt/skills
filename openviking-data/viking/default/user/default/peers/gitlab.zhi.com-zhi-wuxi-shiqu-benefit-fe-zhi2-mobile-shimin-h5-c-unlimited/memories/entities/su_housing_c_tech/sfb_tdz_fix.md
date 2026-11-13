# logSfbJumpContext TDZ修复
苏住房C 项目 zhi2-mobile-shimin 中因 const 触发 TDZ 导致 logSfbJumpContext 调用缺陷的修复，并删除未使用的封装层。

## 问题根因
- `logSfbJumpContext` 以 `const` 声明，若在所调用辅助函数定义前执行会触发 TDZ 运行时缺陷
- 存在一层未使用的封装层需删除

## 修复方案
- 将 `logSfbJumpContext` 移动到它要调用的辅助函数之后定义
- 删除未使用的封装层

## 涉及项目
- zhi2-mobile-shimin（苏住房C 移动端 C 端）
- 来源会话：2026-11-13

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited",
  "category": "su_housing_c_tech",
  "name": "sfb_tdz_fix",
  "source_extraction_id": "7723bed536d64b0eac5ad4ceb4e6811f",
  "version": 1,
  "memory_type": "entities"
}
-->
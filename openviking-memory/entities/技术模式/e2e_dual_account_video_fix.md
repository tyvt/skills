# E2E 双账号流程修复空视频问题
产品2.0 项目修复企业变更 e2e 录屏为空的问题，通过双账号分离重构测试流程。

## 问题根因
- 默认用管理端账号（PLAYWRIGHT_LOGIN_TYPE=account），01–07 全部 skip，仅生成约 0.04 秒空壳 video.webm
- 合并后 company-record-change-full.webm 几乎无内容

## 主要改动
- 双账号分离：01–07 用 loginAsCompany() 企业端流程，08 用 loginAsAdmin() 管理端审核
- e2e/.env.e2e 配置 PLAYWRIGHT_COMPANY_USERNAME/PASSWORD 与 PLAYWRIGHT_ADMIN_USER/PASSWORD
- 合并脚本检测过小录屏（<10KB）并中止，避免产出空视频

## 验证与归属
- 涉及文件：company-record-change-concat.txt、package.json、test-results/.last-run.js 等
- 所属项目：产品2.0；来源会话：f8ffbc1c-7b40-482d-bf84-4868214af266；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_dual_account_video_fix",
  "source_extraction_id": "3a07d26a6e0e40bea701d7282e393f25",
  "version": 1,
  "memory_type": "entities"
}
-->
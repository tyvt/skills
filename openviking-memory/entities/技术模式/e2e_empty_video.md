# 跨角色全流程 E2E 录屏为空
跑 npm run test:e2e:company-record-change 后产出的 company-record-change-full.webm 是空视频，根因是企业端用例被集体 skip 而非合并脚本问题。

## 问题现象
- test-results/company-record-change-full.webm 为空视频（约 0.04 秒空壳）
- 01–07 用例全写 test.skip，运行环境默认管理端账号使企业端发起用例条件不成立被跳过
- Playwright 的 video 是「用例级」录屏，全部跳过只产出几乎无帧的 webm

## 解决方案
- 按发起方/审核方拆账号：01–07 走 loginAsCompany()，08 走 loginAsAdmin()，对齐 personnel-record 08 用例
- 账号从 e2e/.env.e2e 读：PLAYWRIGHT_COMPANY_USERNAME / PASSWORD、PLAYWRIGHT_ADMIN_USER / PASSWORD
- beforeAll 显式校验变量，缺失直接抛错让 CI 红在「没配账号」而非静默空视频
- 合并脚本保留「单段录屏 < 10KB 即中止合并」守卫
- 排查口诀：录屏空壳先数跑了几个用例，而非先怀疑 video 配置或 ffmpeg

## 验证与归属
- 验证证据：会话 f8ffbc1c 用户诉求空视频与双账号分工
- 涉及文件：e2e/company/company-record-change.spec.js、e2e/scripts/merge-company-record-change-video.mjs
- 所属项目：产品2.0；来源会话：f8ffbc1c-7b40-482d-bf84-4868214af266；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_empty_video",
  "source_extraction_id": "e59099027e5d4206a29ce912d71e4142",
  "version": 1,
  "memory_type": "entities"
}
-->
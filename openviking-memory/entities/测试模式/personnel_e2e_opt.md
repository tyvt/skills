# 从业人员证书CRUD的E2E优化
产品2.0 的 zhi2-web-admin 从业人员增删改查 E2E 用例（登录账号 913）去除重复网络等待，改为 UI 状态驱动，耗时大幅下降。

## 问题根因
- 详情接口返回后再次调用 waitForResponse 等已发完的证书列表请求，Playwright 白等满 30 秒再 catch 吞掉
- 进入详情页后长时间空等

## 改动
- 去掉重复的 waitForResponse（详情加载完成后不再二次监听网络）
- 改为 UI 状态等待：waitForDetailLoadingDone（poll .el-loading-mask 消失）、waitForCertificateSectionReady（证书区 loading 结束+表格可见）
- gotoPersonnelDetail 合并就绪判断：详情接口 200 → loading 消失 → 姓名可见 → 证书区就绪

## 效果
- 03 证书增删改查：~39s → ~8s；全流程：~53s → ~21s
- 全程无 waitForTimeout / 固定 sleep，均为接口响应 + DOM 状态驱动

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 可重新跑 npm run test:e2e:personnel-certificate-crud
- 涉及文件：personnelRecord/index.vue、components/index.vue
- 所属项目：产品2.0；来源会话：0dc2b982-cbda-4ef5-8a4b-504d7a26d726；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "personnel_e2e_opt",
  "source_extraction_id": "c5172269f24c433381c4000831c218d5",
  "version": 1,
  "memory_type": "entities"
}
-->
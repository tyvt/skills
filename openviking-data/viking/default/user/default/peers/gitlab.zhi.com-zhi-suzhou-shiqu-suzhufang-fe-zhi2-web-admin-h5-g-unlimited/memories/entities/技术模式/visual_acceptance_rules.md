# 门户视觉验收口径（同尺寸比对）
门户前端视觉验收按“同尺寸截图比对顶栏、窄屏单独验证滚动、E2E mock 只跑测试路由”的口径执行。

## 验收口径
- 设计图按 3:1 缩放至 1920×1110 作为比对基准
- 顶栏只在同尺寸条件下做像素比对，不跨尺寸比对
- 1366×768 单独验证滚动行为，不与大尺寸做像素比对

## E2E 约束
- E2E 的 mock 只在测试路由中运行，不污染真实接口

## 复审门禁
- 计划复审服务遇到超时，改为更窄的复审请求来完成门禁
- 验收口径收紧在复审通过前不被放宽
- 视觉相似度门槛为 99.5%，未达标版本不得作为候选对外提供

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "visual_acceptance_rules",
  "source_extraction_id": "49b341ccddd94e0fa0b73909f809f1aa",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->
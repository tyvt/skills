# 首页多接口失败隔离
首页聚合多个相互独立接口时，单个接口失败只回退该区块空态，不能丢弃其他区块的成功数据。

## 问题场景
- 首页一次加载多类接口数据，任一接口报错会导致整页其他区块数据一起丢失
- 页面加载与 tab 切换过程中抛出的异常未捕获，页面直接白屏或中断

## 做法
- 各接口分别独立请求并各自 catch，失败时回退为空态（空数组/空对象），不使用整体 Promise.all 强依赖
- 首页 onLoad 与学习 tab 切换包 try/catch，避免单点异常中断渲染
- 保持原接口路径、参数与成功数据映射不变，降低回归风险

## 验证要点
- 逐接口断网/报错场景验证其他区块仍正常渲染
- 语法检查、git diff --check、H5 构建与类型检查对比修复前后错误数，确认未新增错误
- 典型结果（苏住房防汛C端，2026-11-14）：首页文件类型错误 2 条降为 0 条，构建退出码 0


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "home_api_failure_isolation",
  "source_extraction_id": "26ad480cd53848d6b3e83860c540b23b",
  "version": 1,
  "memory_type": "entities"
}
-->
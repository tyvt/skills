# 苏住房C同步无锡版本复用约定
苏住房C主仓下有多 uni-app 子模块，与无锡市区小程序嵌入 H5（zhi2-mobile-admin-h5-c-unlimited）同源，新业务页可从无锡版本整目录移植。

## 复用方式
- 用户要求「用某项目里的版本」时，按「页面.vue + src/api 对应接口模块 + pages.json 路由注册 + 页面目录内 static/组件子目录」四件套整块复制覆盖
- 落地后核对 pages.json 是否缺注册、api 模块名是否与页面 import 一致

## 分支交付
- 子模块分支提交页面改动，再合并进 sfb 等环境分支，最后更新父仓苏住房C的子模块指针提交
- sfb 分支带独立网关配置（httpInstance.js / gateway.js），合并冲突必须保留 sfb 侧，不能取主分支配置

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；来源会话：9a5cf993-2e96-4283-bc23-24c947b70b34；代码基线：5438dc6
- 示例：pages_benefit/assetsPublicity 从无锡版本移植，子模块 suzhou-shiqu-suzhufang-main-v2.1 → 4e9e7465，sfb → fa4a1fe2，父仓 → c25c4cf

<!-- MEMORY_FIELDS
{
  "category": "苏住房C项目拓扑",
  "name": "sync_wuxi_version",
  "source_extraction_id": "3b9e083f125d45f880ff8ff4eadaf2e5",
  "version": 1,
  "memory_type": "entities"
}
-->
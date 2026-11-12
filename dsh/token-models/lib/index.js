// dsh-token-models — 服务端半。
// 本插件主功能在浏览器侧（每模型 token 面板）。服务端只需存在一个可被 Loader 挂载的
// apply，不注册任何投影/远端——面板数据直接复用 dsh-context 已算好的 `contextTimeline`
// 投影里的 `cost` 分桶（provider→model→peak/off→{uncached,cacheRead,cacheWrite,output}）。
export const name = 'dsh-token-models';

export function apply(ctx) {
  ctx.logger?.info?.('[dsh-token-models] loaded; per-model token panel is provided by the client half');
}

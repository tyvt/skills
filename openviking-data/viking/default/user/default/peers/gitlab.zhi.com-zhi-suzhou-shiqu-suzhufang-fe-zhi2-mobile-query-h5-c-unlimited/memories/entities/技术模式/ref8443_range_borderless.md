# Ref8443Range 无边框进度条
苏住房防汛C端 H5（8095）积水深度进度条（Ref8443Range 组件，用于小区地面/道路积水深度）去除原生边框，改为自绘无边框进度线，2026-11-06 完成。

## 问题根因
- 原生 `input[type=range]` 在 `-webkit-appearance:auto` 时，浏览器默认绘制带边框的圆角矩形轨道
- CSS `input.range` 选择器在 uni H5 构建中被改写为 `uni-input.range`，运行时创建的真实 `<input>` 不命中该规则，仅依赖内联样式
- 仅设 `border:0` 无法去除原生轨道盒状边框

## 修复内容
- `Ref8443Range.vue` 对运行时创建的 input 设 `appearance:none` / `WebkitAppearance:'none'`，去除原生轨道盒
- 运行时注入 `<style>`（JS 注入，避免被 uni 编译改写），定义 `::-webkit-slider-runnable-track` 与 `::-webkit-slider-thumb`，以及 Firefox `::-moz-range-track` / `::-moz-range-thumb`
- 轨道：无边框、6px 高、圆角 3px 进度线；用 CSS 变量 `--range-fill` 控制填充比例
- 颜色：已选部分蓝色 `#004fd0`、剩余 `#dfe3ea` 灰，随数值更新 `--range-fill`
- 滑块：16px 蓝色圆点
- 填充比例通过 `el.style.setProperty('--range-fill', p+'%')` 在 input 事件中更新

## 验证与归属
- 提交 `bd1e5bc`，合并 `dev` 为 `4fe71d6`
- 测试环境 8095 实测：`appearance:none`、无边框；截图显示干净蓝→灰进度线+蓝色圆点，无矩形边框；填充 33.3%（值=1/满格3）正确
- 独立 worktree 完成/合并/删除，`dist` 部署到 nginx 8095
- 项目：苏住房防汛C端（ref8443）；来源会话：2026-11-06

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_range_borderless",
  "source_extraction_id": "4c7316e19efc4b928d89a717bacf4f2b",
  "version": 1,
  "memory_type": "entities"
}
-->
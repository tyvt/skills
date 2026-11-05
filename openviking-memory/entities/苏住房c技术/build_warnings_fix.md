# 苏住房C构建警告修复
苏住房C(zhi2-mobile-shimin)修复了构建期多处可处理警告，重新构建后相关警告已消除。

## 修复项
- vite.config.ts 的 sourcemap 重复键改为按平台统一判断：`process.env.UNI_PLATFORM === 'h5' ? mode !== 'production' : false`
- CSS 嵌套不兼容 chrome53，展开为完整选择器：PropertyCard.vue 的 `.property-card ~ .property-card`、property-detail.vue/company-detail.vue 的 `.info-row ~ .info-row`、data-analysis.vue 的 `.count-block .total-count`
- flag-szf.svg 路径无法解析，本地无该文件，H5/小程序统一改为 CDN 地址（ResultStatistics.vue、StepConfirm.vue）
- 执行 `npx update-browserslist-db@latest` 更新过期的 Browserslist 数据

## 构建后仍存警告
- 部分警告可忽略，非阻断性问题
- `index.html` 中 `crypto-js.min.js` 与 `sign.js` 两脚本未写 `type="module"`，Vite 仅打包 ES module，将其当普通外链脚本处理，仅提示 WARN 非编译失败；`sign.js` 依赖全局 `window.CryptoJS` 本就应用经典脚本加载，属预期行为，一般可忽略，只要打包后 `/static/js/` 下两文件可访问即可（涉及文件：`index.html`；来源会话ID：2adc93a0-e3be-4d14-af59-34e1f45599d5）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：vite.config.ts、PropertyCard.vue、property-detail.vue、company-detail.vue、data-analysis.vue、ResultStatistics.vue、StepConfirm.vue
- 来源会话ID：5ca7c165-a429-40a7-a5eb-a5c94b398242
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "build_warnings_fix",
  "source_extraction_id": "b51dc9b7992c496996bab1a49b609341",
  "version": 2,
  "memory_type": "entities"
}
-->
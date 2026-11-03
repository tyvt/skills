# 主包上传预估体积折算规则
苏住房C小程序主包体积判定须用上传预估（源码体积≈磁盘×1.17），超限后按包下沉第三方依赖。

## 问题现象
- npm run build 报主包超限，但本地磁盘体积仅1798.4KB(<2048KB)，误判为未超
- 微信上传体积按源码折算预估约磁盘×1.17，1798.4→2104.1KB，实际超限约56KB

## 根因
- 上传体积非磁盘体积，而是构建产物源码体积折算，实测系数约1.17
- 新增 z-paging/ZsPaging 约92KB打入主包 node_modules 导致超出

## 解决方案
- scripts/size-main-package.mjs 同时输出磁盘体积与上传预估(×1.17)，build门禁只认后者
- 超限时先将组件下沉到各分包（pages_xxx/components/），用 scripts/relocate-z-paging.mjs 搬运并改引用
- tab页（如苏找房）不引用重分页组件，改回 scroll-view + uni-load-more 避免依赖回主包

## 验证与归属
- 会话3562f516：修复后主包磁盘1742.6KB、上传预估2038.9KB通过
- 涉及文件：scripts/validate-dist.mjs、size-main-package.mjs、relocate-z-paging.mjs、Project_Suzhufang.vue
- 所属项目：苏住房C；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "pkg_upload_estimate",
  "source_extraction_id": "93ce183c426145c2b955cfbe7c449325",
  "version": 1,
  "memory_type": "entities"
}
-->
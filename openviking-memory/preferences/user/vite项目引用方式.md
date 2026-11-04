- 在 Vue/Vite 项目中，将 `require()` 运行时取图替换为统一方法 `getStatIconUrl(relativePath) => new URL(relativePath, import.meta.url).href`，以兼容 Vite 构建时的静态资源解析与产物映射。
- `STAT_ICON_MAP` 等图标映射中所有 `require(...)` 改为 `getStatIconUrl(...)` 调用。
- 本目录图片使用相对路径 `./images/...`；跨目录资源 `@/assets/images/benefit/...` 改为相对路径 `../../../assets/images/benefit/...`。
- 改动后检查 lints 确保无新增报错；同文件其他 `require` 处（如 `PARKING_CAR_ICON`）可一并改为相同写法，避免后续迁移报错。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Vite项目引用方式",
  "source_extraction_id": "b9ebdcf5af144ff09e28e2b74b4a64e6",
  "version": 1,
  "memory_type": "preferences"
}
-->
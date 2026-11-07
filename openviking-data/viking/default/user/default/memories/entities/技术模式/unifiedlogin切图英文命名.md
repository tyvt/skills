# UnifiedLogin 与 homeNew 切图英文命名
门户将 public/assets/images 下中文切图统一改为英文语义名并经 unifiedLoginAsset 引用。

## 重命名规则
- homeNew 与 UnifiedLogin 的中文切图（如「组 xxx」「切图 xxx」）改为英文语义名（如 platform_banner_bg/desc/tag_bg/tag_text.svg）
- 页面通过 unifiedLoginAsset('platform_banner_*.svg') 引用

## 校验与注意
- 改完后全仓 grep 确认无中文资源名残留
- 本地仍见旧图时强刷或重启 dev server
- 涉及文件：UnifiedLogin.vue、public/assets/images/UnifiedLogin、public/assets/images/homeNew
- 所属项目：门户；代码基线：b84b4e7；来源会话：c494bc34-635f-4dce-b0c7-07401303d2ad

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "UnifiedLogin切图英文命名",
  "source_extraction_id": "901dd939b34140e28e31fd6770021d9f",
  "version": 1,
  "memory_type": "entities"
}
-->
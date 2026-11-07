# uni.previewImage预览问号占位图
苏住房C楼盘相册点开预览是问号占位图，因enlargePicture绕过ZsImage路径解析直接传相对路径。

## 现象
- 楼盘相册列表缩略图正常显示，点开预览却是问号占位图
- 在苏服办H5等「没有反向代理把/zs-fym/转发到文件服务」的环境必现

## 根因
- ZsImage组件内部先resolveMediaUrl把接口返回的相对路径转成完整URL再赋给image src，缩略图没问题
- 点击预览的enlargePicture直接把原始相对路径数组传给uni.previewImage，绕过这层解析
- 浏览器按当前站点根域去拼相对路径自然404

## 修复与推广
- 调用uni.previewImage之前对urls做一次map(resolveMediaUrl)并filter(Boolean)
- 保留原下标作为current，空数组直接return
- 凡是把后端相对路径交给「不受ZsImage管」的原生能力都必须先经resolveMediaUrl
- 包括uni.previewImage、uni.setNavigationBarImage、downloadFile、web-view url、分享封面
- 路径解析不能只依赖渲染组件

## 验证与归属
- 来源会话b5c173dc(基线62fd49e)：地图找房→小区详情→楼盘相册预览无法显示
- 涉及文件：buildingAlbum/index.vue、ZsImage.vue、utils
- 所属项目：苏住房C

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "preview_resolve_url",
  "source_extraction_id": "91c4dec38b054bbba12cbff6d880442c",
  "version": 1,
  "memory_type": "entities"
}
-->
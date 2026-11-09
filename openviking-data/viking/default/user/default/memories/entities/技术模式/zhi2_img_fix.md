# zhi2富文本图片不显示修复
苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）门户详情页富文本正文图片因缺少反代与相对路径错误而无法显示，已确认正确文件服务域名。

## 根因
- 门户详情页富文本正文含 10 张 `<img src="/zhi2-pro/...">` 相对路径图片
- 站点未配置 `/zhi2-pro` 反向代理，相对路径无法解析到正确文件服务
- 正确文件服务域名为 `https://szfweb.szzfcjj.cn:8887`（实测返回 200 image/png）
- 接口无需登录即可访问，正文图片均为上述相对路径

## 修复方案
- 在 worktree 内新增富文本格式化工具，将图片相对路径拼接为正确域名
- 在 worktree 内独立安装依赖并跑单测与类型检查

## 验证与归属
- 所属项目：苏住房防汛C端移动查询H5（zhi2-mobile-query-h5-c）
- 验证证据：extracted source=conversation
- 来源会话时间：2026-11-09

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_img_fix",
  "source_extraction_id": "3bd19b6050cb431283089c9d1a203910",
  "version": 1,
  "memory_type": "entities"
}
-->
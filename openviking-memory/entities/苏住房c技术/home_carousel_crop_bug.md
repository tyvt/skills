# 首页轮播图横向被裁切
苏住房C 业主端首页「热门活动」轮播图因 aspectFill + 固定高度容器导致横向被遮挡。

## 问题根因
- img 使用 mode="aspectFill"，在固定高度容器内按高度等比放大，宽图必然左右溢出被裁
- 容器高度写死 158px，与图片原始比例 690×240 不一致，叠加导致横向裁切不可避免
- ZsImage 内部写死 mode 会压过页面 CSS 的 object-fit，页面层调 object-fit 无效

## 解决方案
- 缩放模式 aspectFill 改为 aspectFit，保证整张图完整可见
- 容器高度跟屏幕宽度联动：height: calc((100vw - 20px) * 240 / 690)，保持比例恒定
- 后台若上传非 690×240 图会有留白；要铺满应推动后台统一轮播图尺寸，而非回到 aspectFill 硬裁

## 通用判据
- 三端同源项目遇「轮播图/横幅被裁」优先判定：先看 mode，再看容器高度是否写死，两者须与素材比例对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证会话：6d739bef（2026-08-26，基线 b7bf813），用户截图反馈图片比例不对横向被遮挡
- 涉及文件：pages_tab/components/Home_Suzhufang.vue、components/ZsSwiper/ZsSwiper.vue、components/ZsImage/ZsImage.vue、pages/index/components/Home_Suzhufang.vue
- 所属项目：苏住房C；来源会话ID：6d739bef-cad1-47be-b7b4-83a3d7029671；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "home_carousel_crop_bug",
  "source_extraction_id": "dca35173571046008ab4d13a3f707715",
  "version": 1,
  "memory_type": "entities"
}
-->
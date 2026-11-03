# H5插图以Android原生为视觉基准
当H5与Android/iOS原生端同页视觉不一致时，原生端写死的资源为权威源，抄图并统一走本地静态路径。
## 问题背景
- 「我的」页电子业主卡右侧插图不显示，Android端写死@drawable/icon_card，CardAdapter不读接口iconPath
- H5侧走MenuImage+接口iconPath，远程地址WebView可能加载失败，本地fallback经resolveMediaUrl二次处理改错路径
- menu.js误指icon-owner-card.png（首页小图标）而非卡片右侧大图，三处共同导致空白
## 解决方案
- 从Android工程复制drawable-xxhdpi/icon_card.png到src/pages_tab/static/images/my/owner-card.png（约56KB）
- MenuSection.vue卡片右侧改用tabStaticUrl本地图，与头部背景图同方式，不再经MenuImage
- menu.js电子业主卡统一引用images/my/owner-card.png，不再依赖接口远程图标
## 验证与归属
- 所属项目：苏住房C；来源会话ID：d6842107-6287-4385-849e-b409c4545d53；代码基线：8fc3cc5
- 涉及文件：src/pages_tab/components/menu/MenuSection.vue、MenuImage.vue、src/utils/index.js、suzhufang-android-app/app/src/main/res/layout/item_my_card.xml

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_native_drawable_baseline",
  "source_extraction_id": "81d7f40afe12428c8e47232291933096",
  "version": 1,
  "memory_type": "entities"
}
-->
# sfb分支合并main-v2.1裁决口径
苏住房C市民端zhi2-mobile-shimin的sfb分支（苏服办渠道）需周期性合并main（suzhou-shiqu-suzhufang-main-v2.1）并手工解冲突。

## 二分口径
- 业务逻辑与页面展示一律取INCOMING/main
- 带sfb语义的代码（sfb、苏服办、gateway、token、ticket、boundProjects、tabBar的sfb专用分支）以HEAD/ours为准保留

## 页面与Tab裁决
- 五个tab页（home/my/community/project/property）保留HEAD的onTabPageShow（内含loadMenu+有token才loadBoundProjects），不取main的setTabBarIndex+单独loadMenu
- redirect/index.vue取main的空url提前返回、project传入resolveMenuRoute、trackApi与lanch分离

## 组件裁决
- custom-tab-bar保留HEAD的.png图标，不取main的.svg
- Home_Suzhufang取main的扫一扫入口与「请使用APP扫一扫」提示
- My_Suzhufang混合：文案与promptSfbLogin取HEAD，getMsgNum()无参与mySections写法取main
- MenuSection取main的defineEmits(['switch-project'])

## 收尾与验证
- 冲突解决后必须连带检查src/utils/tabBar.js（onTabPageShow保留setTabBarIndex+menuStore.loadMenu()+token校验），否则tab切换菜单与绑定小区不刷新
- 以git status显示All conflicts fixed为准再commit，并核对App.vue、sfb.js等未列入清单文件
- 验证：会话6df0f95a合并main-v2.1到sfb，10个冲突文件逐一裁决并修复src/utils/tabBar.js；涉及文件含home.vue、my.vue、Home_Suzhufang.vue、My_Suzhufang.vue、custom-tab-bar/index.vue、utils/tabBar.js；所属项目苏住房C；来源会话ID 6df0f95a-e9e0-4390-b68f-3f9ad28a017d；代码基线 c7d6817

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "sfb_main_merge",
  "source_extraction_id": "0e31f6bb15d24732a33d1e0cad0d9ed7",
  "version": 1,
  "memory_type": "entities"
}
-->
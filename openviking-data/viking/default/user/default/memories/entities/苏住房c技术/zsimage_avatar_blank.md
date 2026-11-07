# ZsImage头像不显示因样式隔离与分包路径
苏住房C市民端guard页默认头像不显示，根因新版ZsImage内部100%宽高+组件样式隔离+分包static路径不可达两处叠加。

## 问题现象
- pages_guard/index/index左侧默认头像不显示，照main-v2.1分支抄写法仍不显示
- devtools选中看盒模型为0宽高，或图片URL返回非200

## 根因
- 新版ZsImage内部width:100%/height:100%，尺寸类写在组件标签上；小程序自定义组件样式隔离致父级class透不进内部节点，图片0宽高
- 默认头像在主包src/static/images/default-avatar-gary.png，当前分支仅放分包pages_guard/static，页面引用主包绝对路径/static/images/..访问不到

## 解决方案
- 外层用带尺寸div.header-img包裹ZsImage，尺寸落div上
- 头像文件复制回主包static/images并登记进MAIN_STATIC_PATHS，与v2.1一致
- 排查顺序：先确认容器有实际宽高，再确认图片URL返回200，都过才怀疑组件

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话0c646bb9用户两次反馈「还是没显示头像」，定位样式隔离+分包路径，改div包裹+复制主包+MAIN_STATIC_PATHS
- 涉及文件：src/pages_guard/index/components/guard-info-card.vue、src/components/ZsImage/ZsImage.vue、src/utils/index.js
- 所属项目：苏住房C；来源会话ID：0c646bb9-d1fa-4e8d-a2e1-e84fc34f6838；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsimage_avatar_blank",
  "source_extraction_id": "c7b854de2e864b02b107787c6c9eb2e8",
  "version": 1,
  "memory_type": "entities"
}
-->
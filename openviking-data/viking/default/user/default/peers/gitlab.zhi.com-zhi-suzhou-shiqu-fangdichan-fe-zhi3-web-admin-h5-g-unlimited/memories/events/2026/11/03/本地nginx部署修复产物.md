# Summary
2026-11-03，构建产物部署到本地 nginx 8098 并 reload，站点返回 200 且内容与产物一致；因 reload 未落到 nginx 目录，改到 `D:\nginx` 后重载成功。
# 2026-11-03 (Tuesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6093
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6093
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 产物里价格备案申请页已经是 `dictUrl:"biz_state"`，没有再出现 `BIZ_STATE`。我重载 nginx，让 8098 用这份新 dist。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: reload 没落到 nginx 自己的目录，我改到 `D:\nginx` 再重载一次，并确认站点返回的是新包。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited]**: 8098 已经在返回新包。我补一条台账里的验证记录，并核对工作区里哪些文件是这次改的。

<!-- MEMORY_FIELDS
{
  "event_name": "本地nginx部署修复产物",
  "goal": "部署修复产物到nginx",
  "summary": "2026-11-03，构建产物部署到本地 nginx 8098 并 reload，站点返回 200 且内容与产物一致；因 reload 未落到 nginx 目录，改到 `D:\\nginx` 后重载成功。",
  "ranges": "0-1,107,112,114",
  "source_extraction_id": "b6a7e0b8f69244a59c32869ff0f665b8",
  "version": 1,
  "memory_type": "events"
}
-->
# Summary
2026-11-04，助手在sfbFaceAuth.js将waitForSfbFaceSdk超时改为12000ms，新增isSfbFaceSdkReady与reloadOnceForSfbFaceRecovery（sessionStorage 60s闸门），face.vue在SDK僵尸态自动整页刷新并监听pageshow.persisted。修复合并至dev_wuxi-sfb(201ce49)，部署nginx 8106，父仓main-sfb(58f794d)已推送。
# 2026-11-04 (Wednesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Now let me implement. I'll add three things to `sfbFaceAuth.js`:

1. A helper `isSfbFaceSdkReady()` to check readiness without waiting.
2. A `reloadOnceForSfbFaceRecovery()` guarded one-shot `location.reload()`.
3. Increase `waitForSfbFaceSdk` default timeout and detect stale-SDK (bridge zombie) so caller can recover.

And in `face.vue`: on failure with a timeout/SDK error, auto force-reload once (tracked in sessionStorage); the "重新识别" button also forces a real reload when the SDK is in zombie state.

Let me edit `waitForSfbFaceSdk`.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Now update `face.vue` to use these: detect bfcache pageshow, longer wait, and auto force-reload on SDK/zombie failures instead of dead-end failure screen.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Now update the failure handling to do a one-shot auto reload for SDK-unavailable errors, and add bfcache pageshow handler. Let me edit `showFaceVerifyFail`/`startFaceVerify` catch and add the recovery logic.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Now update `retryFaceVerify` to do a real reload when SDK is a zombie, and update the button `canStartVerify` logic, plus add bfcache `pageshow` handler on mount. Let me view current retry function and onReady/onShow.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Build succeeded ("DONE Build complete"; the exit 1 is just git-style stderr noise from warnings/untrusted postinstall, not a build failure). Let me confirm dist output and that my code compiled into it.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Port 8106 is free. Let me create the site config (UTF-8, mirroring 无锡市区G.conf but root → our dist, port 8106).
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Config OK. Reload nginx.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Everything deployed and verified: new bundle hash, face chunk contains fix markers, index chunk has recovery key.

Now merge back into the submodule's original branch `dev_wuxi-sfb` per worktree workflow. First remove the untracked `bun.lock` (don't commit it), then commit in worktree, merge, cleanup.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: User chose: push submodule + commit parent. Let me check remote/branch tracking for the submodule, push, then commit+push parent.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Submodule pushed — local and remote both at `201ce49`. Now commit the parent repo's gitlink update (and push). Note: the deployed dist was built from the pre-rebase commit but content is identical (only history changed). Let me commit the parent gitlink.
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-shiqu-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited]**: Parent pushed: `14d2949..58f794d main-sfb -> main-sfb`. Let me verify final states of both repos.

<!-- MEMORY_FIELDS
{
  "event_name": "人脸bfcache修复上线部署",
  "goal": "修复并部署扫脸兜底",
  "summary": "2026-11-04，助手在sfbFaceAuth.js将waitForSfbFaceSdk超时改为12000ms，新增isSfbFaceSdkReady与reloadOnceForSfbFaceRecovery（sessionStorage 60s闸门），face.vue在SDK僵尸态自动整页刷新并监听pageshow.persisted。修复合并至dev_wuxi-sfb(201ce49)，部署nginx 8106，父仓main-sfb(58f794d)已推送。",
  "ranges": "73,75,77,81,119,135,141,163,182,192,196",
  "source_extraction_id": "bdcb472899dc4e87a8cb8be9dbada890",
  "version": 1,
  "memory_type": "events"
}
-->
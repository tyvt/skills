# zhi2-mobile-shimin-h5-zhishu-c-unlimited Watermark Technical Pattern
Technical root causes, fixes, and verification approach for the Zentao 2920 C-end H5 watermark migration (2026-11-26).

## Root Causes and Fixes
- H5 `canvasToTempFilePath` returning a blob URL was the root cause of watermark synthesis failure; the fix direction was to handle that blob URL (hop2 in progress on 2026-11-26).
- `uni.createCanvasContext` export failed easily and was silently degraded, so watermark synthesis switched to native Canvas.
- hop2 temporarily opened album image selection for real-device testing; album selection could make `crossOrigin` break `loadHtmlImage`, so loading switched to `File` + `objectURL`.

## Thumbnail Fixes
- The upload API worked but the thumbnail still used a placeholder; narrow reading of `ZsUploader.vue` around lines 165-190 led to adding `previewDataUrl` (`canvas.toDataURL`) in the success callback as the thumbnail and display source, preventing the server URL from overwriting the local watermark preview; rebuilt and re-verified.
- On 2026-11-26 02:57-03:00 the thumbnail did not go through `pickerRef` update, so the fix directly changed the DOM `img.src` to `previewDataUrl` after H5 watermark synthesis.
- On 2026-11-26 02:56-03:03 the thumbnail blob was only 866 B (placeholder); upload cell count and `savedUuid` matching were checked; `patchPickerThumbDom` existed in source but not in dist, so it was repackaged and re-verified.

## Verification Approach
- Real-device verification flow: check the browser session, fetch and recognize the captcha image, enter the submit page, inject a test image, and capture a full-page screenshot showing the watermark.
- On 2026-11-26 02:36-02:53 the browser was stuck on the old `index-cd253602.js` while the new bundle was `index-a339ff3b.js`, requiring a hard refresh of index.
- Verification order: open 8185, inject login state, use a single eval to confirm the new bundle loaded, upload the test image, then take a full-page screenshot.
- For blank-thumbnail troubleshooting, narrow checks were used: one command to pull console upload/watermark errors, narrow grep to confirm the new bundle contained `previewDataUrl`, and narrow read of the `fileUpload` success callback, avoiding large disk reads; on 2026-11-26 02:53-02:56 injecting on the new bundle still produced a blank thumbnail, and one eval confirmed the current bundle and thumbnail `src` prefix.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhishu_h5_watermark",
  "source_extraction_id": "8636480e7e67417d8e200320f8bf5f11",
  "version": 10,
  "memory_type": "entities"
}
-->
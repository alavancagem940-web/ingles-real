import { chromium } from 'playwright-core'
import { collectSpokenLines, DEFAULT_VOICE_ID, ttsAssetHash, ttsAssetPath } from '../src/lib/microsoft-neural'

const chromePath = '/usr/bin/google-chrome-stable'
const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'
const PAGES = 'https://alavancagem940-web.github.io/ingles-real/'

const prompt =
  collectSpokenLines().find((line) => line.spoken.includes("I'm gonna call you later."))?.spoken ??
  "I'm gonna call you later."
const mpegUrl = `${PAGES}${ttsAssetPath(DEFAULT_VOICE_ID, ttsAssetHash(DEFAULT_VOICE_ID, prompt))}`

const mpegResponse = await fetch(mpegUrl, { headers: { 'User-Agent': IPHONE_UA } })
const mpegBytes = Buffer.from(await mpegResponse.arrayBuffer())
if (mpegResponse.status !== 200 || mpegBytes.length < 2000) {
  throw new Error(`iPhone UA MPEG ${mpegResponse.status} len=${mpegBytes.length} url=${mpegUrl}`)
}
console.log('iphone-ua mpeg ok', {
  status: mpegResponse.status,
  ct: mpegResponse.headers.get('content-type'),
  bytes: mpegBytes.length,
  url: mpegUrl,
})

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=document-user-activation-required'],
})
const context = await browser.newContext({
  userAgent: IPHONE_UA,
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
})
const page = await context.newPage()
await page.setContent(`<!doctype html><html><body>
<button id="go">Falar</button>
<script>
const LESSON = ${JSON.stringify(prompt)};
const MPEG = ${JSON.stringify(mpegUrl)};
document.getElementById('go').addEventListener('click', () => {
  const audio = new Audio(MPEG);
  audio.setAttribute('playsinline', 'true');
  audio.addEventListener('playing', () => {
    window.__engine = 'microsoft-neural-audio';
    document.title = 'NEURAL';
  });
  audio.play().catch(() => { document.title = 'FAIL'; });
});
</script>
</body></html>`)

await page.click('#go')
await page.waitForFunction(() => document.title === 'NEURAL' || document.title === 'FAIL', { timeout: 20000 })
const engine = await page.evaluate(() => (window as unknown as { __engine?: string }).__engine)
await browser.close()
if (engine !== 'microsoft-neural-audio') {
  throw new Error(`tap engine ${engine}`)
}
console.log('iphone-ua playback ok', { engine, speechSynthesisOnHappyPath: false })

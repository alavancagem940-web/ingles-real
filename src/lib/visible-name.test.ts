import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()

function stripGithubIoHost(text: string): string {
  return text.replaceAll('alavancagem940-web.github.io', 'GITHUB_IO_HOST')
}

describe('nome visível', () => {
  it('não usa alavancagem como nome do produto', () => {
    const files = [
      'index.html',
      'public/instalar.html',
      'README.md',
      'package.json',
      'vite.config.ts',
      'src/components/Header.tsx',
      'src/components/NativeListenButton.tsx',
    ]
    for (const file of files) {
      const text = stripGithubIoHost(readFileSync(join(root, file), 'utf8'))
      expect(text.toLowerCase(), file).not.toMatch(/alavancagem/)
    }
  })

  it('service worker Jenny v1 e SSML lenta no hop local', () => {
    const vite = readFileSync(join(root, 'vite.config.ts'), 'utf8')
    expect(vite).toContain("cacheId: 'ingles-real-jenny-v1'")
    expect(vite).toContain("cacheName: 'ingles-real-neural-mp3-v1'")
    const hop = readFileSync(join(root, 'scripts/tts-middleware.mjs'), 'utf8')
    expect(hop).toContain('en-US-JennyNeural')
    expect(hop).toContain('en-US-AnaNeural')
    expect(hop).toContain('rate="-10%"')
    expect(hop).toContain('pitch="-5Hz"')
    expect(hop).not.toContain('Francisca')
    expect(hop).not.toContain('pt-BR')
  })
})

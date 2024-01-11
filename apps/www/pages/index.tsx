import styles from 'styles/index.module.scss'
import React from 'react'
import {useInView} from 'framer-motion'
import {Code, CopiedIcon, CopyIcon, GitHubIcon} from 'components'

const packageJson = require('../../../packages/js-client/package.json')

export default function Index() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.info}>
            <VersionBadge />
            <h1>remoteStorage</h1>
            <p>Easily persist data across browsers and devices.</p>
          </div>

          <div className={styles.buttons}>
            <InstallButton />
            <GitHubButton />
          </div>
        </div>

        <Codeblock />
      </div>
      <Footer />
    </main>
  )
}

//////////////////////////////////////////////////////////////////

function InstallButton() {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      className={styles.installButton}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`npm install remote-storage`)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 2000)
        } catch (e) {}
      }}
    >
      npm install remote-storage
      <span>{copied ? <CopiedIcon /> : <CopyIcon />}</span>
    </button>
  )
}

function GitHubButton() {
  return (
    <a
      href="https://github.com/FrigadeHQ/remote-storage"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.githubButton}
    >
      <GitHubIcon />
      frigadeHQ/remote-storage
    </a>
  )
}

//////////////////////////////////////////////////////////////////

function Codeblock() {
  const code = `import { RemoteStorage } from 'remote-storage'

const remoteStorage = new RemoteStorage({ userId: "my-user-id" })

const hasSeenNewFeature = await remoteStorage.getItem('hasSeenNewFeature')

if (!hasSeenNewFeature) {
  await remoteStorage.setItem('hasSeenNewFeature', true)
  // Highlight your new and exciting feature!
}`

  return (
    <div className={styles.codeBlock}>
      <div className={styles.line2} aria-hidden />
      <div className={styles.line3} aria-hidden />
      <Code>{code}</Code>
    </div>
  )
}

//////////////////////////////////////////////////////////////////

function VersionBadge() {
  return <span className={styles.versionBadge}>v{packageJson.version}</span>
}

function Footer() {
  const ref = React.useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '100px',
  })
  return (
    <footer ref={ref} className={styles.footer} data-animate={isInView}>
      <div className={styles.footerText}>
        Created by{' '}
        <a href="https://frigade.com" target="_blank" rel="noopener noreferrer">
          <img src="/frigade-logo.png" alt="Frigade logo" />
          Frigade
        </a>{' '}
        with web design from{' '}
        <a href="https://cmdk.paco.me" target="_blank" rel="noopener noreferrer">
          <img src="/cmdk.svg" alt="cmdk logo" />
          cmdk
        </a>
      </div>
    </footer>
  )
}

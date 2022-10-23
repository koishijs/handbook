import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {
  mdiAndroid,
  mdiApple,
  mdiArrowRight,
  mdiLinux,
  mdiMicrosoftWindows,
  mdiNodejs,
} from '@mdi/js'
import Icon from '@mdi/react'
import CodeBlock from '@theme/CodeBlock'
import Layout from '@theme/Layout'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import clsx from 'clsx'
import React, { useState } from 'react'
import styles from './index.module.scss'
import { useColorMode } from '@docusaurus/theme-common'
import Link from '@docusaurus/Link'

interface Option {
  icon: string
  color: string
  darkColor?: string
  title: string
  children: React.ReactNode
}

const options: Record<string, Option> = {
  win: {
    icon: mdiMicrosoftWindows,
    color: '#0078d4',
    darkColor: '#004d88',
    title: 'Windows',
    children: (
      <>
        <p className={styles['chooser-content-quick-title']}>立即下载</p>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-desktop/releases/download/v0.7.1/koishi-desktop-win-x64-v0.7.1.msi"
          target="_blank"
          rel="noopener noreferrer"
        >
          msi 安装包（推荐）
        </a>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-desktop/releases/download/v0.7.1/koishi-desktop-win-x64-v0.7.1.zip"
          target="_blank"
          rel="noopener noreferrer"
        >
          zip 便携包
        </a>
        <a
          className={styles['chooser-content-quick-link']}
          href="https://github.com/koishijs/koishi-desktop/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          更多下载
        </a>
      </>
    ),
  },
  mac: {
    icon: mdiApple,
    color: 'black',
    darkColor: '#262626',
    title: 'macOS',
    children: (
      <>
        <p className={styles['chooser-content-quick-title']}>立即下载</p>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-desktop/releases/download/v0.7.1/koishi-desktop-osx-x64-v0.7.1.pkg"
          target="_blank"
          rel="noopener noreferrer"
        >
          pkg 安装包（推荐）
        </a>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-desktop/releases/download/v0.7.1/koishi-desktop-osx-x64-v0.7.1.zip"
          target="_blank"
          rel="noopener noreferrer"
        >
          zip 便携包
        </a>
        <a
          className={styles['chooser-content-quick-link']}
          href="https://github.com/koishijs/koishi-desktop/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          更多下载
        </a>
      </>
    ),
  },
  linux: {
    icon: mdiLinux,
    color: '#ff6c0e',
    darkColor: '#c14b00',
    title: 'Linux',
    children: (
      <>
        <p className={styles['chooser-content-quick-title']}>立即下载</p>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-desktop/releases/download/v0.7.1/koishi-desktop-linux-x64-v0.7.1.zip"
          target="_blank"
          rel="noopener noreferrer"
        >
          zip 便携包（推荐）
        </a>
        <a
          className={styles['chooser-content-quick-link']}
          href="https://github.com/koishijs/koishi-desktop/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          更多下载
        </a>
      </>
    ),
  },
  android: {
    icon: mdiAndroid,
    color: '#3ddc84',
    darkColor: '#1fad5f',
    title: 'Android',
    children: (
      <>
        <p className={styles['chooser-content-quick-title']}>立即下载</p>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-android/releases/download/v0.0.3/koishi-android-v0.0.3.apk"
          target="_blank"
          rel="noopener noreferrer"
        >
          标准 Apk（推荐）
        </a>
        <a
          className="button button--secondary"
          href="http://ghproxy.com/https://github.com/koishijs/koishi-android/releases/download/v0.0.3/koishi-android-with-chromium-v0.0.3.apk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apk（含 Chromium）
        </a>
        <a
          className={styles['chooser-content-quick-link']}
          href="https://github.com/koishijs/koishi-android/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          更多下载
        </a>
      </>
    ),
  },
  node: {
    icon: mdiNodejs,
    color: '#339933',
    darkColor: '#206020',
    title: '用于开发',
    children: (
      <>
        <p className={styles['chooser-content-quick-title']}>快速开始</p>
        <Tabs>
          <TabItem value="npm" label="npm">
            <CodeBlock language="sh">&gt; npm init koishi</CodeBlock>
          </TabItem>
          <TabItem value="yarn" label="Yarn" default>
            <CodeBlock language="sh">&gt; yarn create koishi</CodeBlock>
          </TabItem>
        </Tabs>
      </>
    ),
  },
} as const

const Chooser: React.FC = () => {
  const [state, setState] = useState('')
  const { isDarkTheme } = useColorMode()

  return (
    <div className={styles['chooser-container']}>
      <div
        key={'chooser-option-seleted-background'}
        className={clsx(
          styles['chooser-content'],
          styles['chooser-content-background'],
          state !== '' && styles['chooser-content-selected']
        )}
      />
      {Object.keys(options).map((key) => {
        const { icon, color, darkColor, title, children } = options[key]
        const selected = state === key

        return (
          <>
            <div
              key={`chooser-option-${key}`}
              className={styles['chooser-option']}
              onClick={() => setState(key)}
              style={selected ? { backgroundColor: color } : undefined}
            >
              <div
                className={styles['chooser-option-indicator']}
                style={{ backgroundColor: color }}
              />
              <Icon
                className={styles['chooser-option-icon']}
                path={icon}
                color={
                  selected
                    ? 'white'
                    : isDarkTheme && color === 'black'
                    ? 'white'
                    : color
                }
              />
              <p
                className={styles['chooser-option-title']}
                children={title}
                style={selected ? { color: 'white' } : undefined}
              />
            </div>

            <div
              key={`chooser-option-seleted-${key}`}
              className={clsx(
                styles['chooser-content'],
                selected && styles['chooser-content-selected']
              )}
            >
              {selected && (
                <>
                  <div
                    className={styles['chooser-content-quick']}
                    style={{ backgroundColor: color }}
                    children={children}
                  />
                  <Link
                    to={`/install/${key}`}
                    className={styles['chooser-content-guide']}
                    style={{ backgroundColor: darkColor }}
                  >
                    <Icon path={mdiArrowRight} size="2rem" color="white" />
                    <p>快速入门</p>
                  </Link>
                </>
              )}
            </div>
          </>
        )
      })}
    </div>
  )
}

const Home: React.FC = () => {
  const { siteConfig } = useDocusaurusContext()
  const { logo } = siteConfig.themeConfig.navbar as {
    logo: { alt: string; src: string }
  }

  return (
    <Layout description={siteConfig.tagline}>
      <header className={styles['banner']}>
        <div className="container">
          <img className={styles['logo']} alt={logo.alt} src={logo.src} />
          <p className={styles['title-1']}>在任何地方</p>
          <p className={styles['title-2']}>创建你的机器人。</p>
          <p className={styles['description']}>
            Koishi
            是一个现代、高效的机器人框架，可以让你在几分钟内创建跨平台、可扩展、高性能的机器人。
          </p>
        </div>
      </header>
      <main>
        <div className={styles['chooser-banner']}>
          <p>立刻开始</p>
        </div>
        <Chooser />
      </main>
    </Layout>
  )
}

export default Home

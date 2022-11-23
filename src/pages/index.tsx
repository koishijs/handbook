import Link from '@docusaurus/Link'
import { useColorMode } from '@docusaurus/theme-common'
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
import React, { useRef, useState } from 'react'
import styles from './index.module.scss'

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
          href="https://k.ilharp.cc/win.msi"
          target="_blank"
          rel="noopener noreferrer"
        >
          Windows 安装包
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
          href="https://k.ilharp.cc/osx.pkg"
          target="_blank"
          rel="noopener noreferrer"
        >
          macOS 安装包
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
          href="https://k.ilharp.cc/linux.AppImage"
          target="_blank"
          rel="noopener noreferrer"
        >
          AppImage
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
          href="https://k.ilharp.cc/android-lite.apk"
          target="_blank"
          rel="noopener noreferrer"
        >
          标准 Apk（推荐）
        </a>
        <a
          className="button button--secondary"
          href="https://k.ilharp.cc/android-full.apk"
          target="_blank"
          rel="noopener noreferrer"
        >
          完整 Apk（含 Chromium）
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

const Chooser: React.FC<{ onScroll: () => void }> = (props) => {
  const [state, setState] = useState('')
  const { colorMode } = useColorMode()

  const onClick = (key: string) => {
    setState(key)
    props.onScroll()
  }

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
              onClick={() => onClick(key)}
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
                    : colorMode === 'dark' && color === 'black'
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
                    to={`/platform/${key}`}
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

  const bannerRef = useRef<HTMLElement>()
  const scroll = () => {
    const top = bannerRef.current.clientHeight
    if (top > window.document.documentElement.scrollTop)
      window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <Layout description={siteConfig.tagline}>
      <header ref={bannerRef} className={styles['banner']}>
        <div className="container">
          <img className={styles['logo']} alt={logo.alt} src={logo.src} />
          <p className={styles['title-1']}>在任何地方</p>
          <p className={styles['title-2']}>创建你的机器人。</p>
          <p className={styles['description']}>
            Koishi
            是一个现代、高效的机器人框架，可以让你在几分钟内创建跨平台、可扩展、高性能的机器人。
          </p>
          <div className={styles['buttons']}>
            <Link
              className="button button--primary button--lg"
              onClick={scroll}
            >
              立即下载
            </Link>
            <Link className="button button--secondary button--lg" to="/intro">
              文档介绍
            </Link>
          </div>
        </div>
      </header>
      <main>
        <div className={styles['chooser-banner']}>
          <p>立刻开始</p>
        </div>
        <Chooser onScroll={scroll} />
      </main>
    </Layout>
  )
}

export default Home

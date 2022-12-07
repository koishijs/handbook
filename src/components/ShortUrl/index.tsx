import { useLocation } from '@docusaurus/router'
import { ThemeClassNames } from '@docusaurus/theme-common'
import clsx from 'clsx'
import React from 'react'
import styles from './styles.module.css'

const shortenImpl = (pathname: string): string => {
  let result = pathname
  if (result.endsWith('/')) result = result.slice(0, result.length - 1)

  if (result.startsWith('/faq/')) return `k.ilharp.cc/f${result.slice(5)}`
  else if (result.startsWith('/recipes/'))
    return `k.ilharp.cc/r${result.slice(9)}`
  else return `koishi.ilharper.com${result}`
}

const shorten = (pathname: string): [string, string] => {
  const s = shortenImpl(pathname)
  return [`https://${s}`, s]
}

const ShortUrl = () => {
  const urls = shorten(useLocation().pathname)

  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType('info'),
        'alert',
        `alert--info`,
        styles.container
      )}
    >
      <div
        className={styles.content}
        onClick={() => window.navigator.clipboard.writeText(urls[0])}
      >
        本页的永久地址（点击复制）：
        <code children={urls[1]} />
      </div>
    </div>
  )
}

export default ShortUrl

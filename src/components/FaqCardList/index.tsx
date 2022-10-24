import Link from '@docusaurus/Link'
import { PropSidebarItem } from '@docusaurus/plugin-content-docs/src/sidebars/types'
// @ts-ignore
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import DocCard from '@theme/DocCard'
import React from 'react'

export const FaqPre: React.FC = () => {
  return (
    <section className="row">
      <article className="col col--6 margin-bottom--lg">
        <DocCard
          item={{
            type: 'link',
            href: '/faq/1',
            label: '回到目录',
          }}
        />
      </article>
    </section>
  )
}

export const FaqPost: React.FC = () => {
  return (
    <>
      <p>
        最后，如果问题未得到解决，你可以 <Link to="/community">向社区提问</Link>
        。
      </p>
      <FaqPre />
    </>
  )
}

const FaqCardList: React.FC = () => {
  const { items } = useDocsSidebar()
  return (
    <section className="row">
      {items.slice(1).map((item: PropSidebarItem, index: string) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  )
}

export default FaqCardList

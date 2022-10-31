import { PropSidebarItem } from '@docusaurus/plugin-content-docs/src/sidebars/types'
// @ts-ignore
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import DocCard from '@theme/DocCard'
import React from 'react'

const CardList: React.FC = () => {
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

export default CardList

// @ts-ignore
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import DocCard from '@theme/DocCard'
import clsx from 'clsx'
import React from 'react'

const FaqCardList = (props) => {
  const { items } = useDocsSidebar()
  const { className } = props
  return (
    <section className={clsx('row', className)}>
      {items.slice(1).map((item, index) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <DocCard item={item} />
        </article>
      ))}
    </section>
  )
}

export default FaqCardList

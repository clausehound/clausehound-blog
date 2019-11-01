/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { FC, createElement as h } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

interface Props {
  name: string
  email: string
  bio?: string
  // TODO: pass in as image
  avatar?: any
}

const Bio: FC<Props> = ({ name, email, bio, avatar }) => {
  return h(
    'div',
    {
      style: {
        display: 'flex',
        marginBottom: rhythm(2.5),
      },
    },
    avatar &&
      h(Image, {
        fixed: avatar.childImageSharp.fixed,
        alt: name,
        style: {
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%',
        },
        imgStyle: {
          borderRadius: '50%',
        },
      }),
    h('p', null, 'Written by ', h('strong', null, name), '.', bio && ` ${bio}`)
  )
}

export default Bio

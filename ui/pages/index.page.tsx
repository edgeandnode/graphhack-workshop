import type { NextPage } from 'next'
import Link from 'next/link'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

import { Project_OrderBy as OrderBy } from '../src/graphql-types.generated'
import { Heading } from '../src/Heading'
import { ProjectCard } from '../src/ProjectCard'
import { useClickOutside } from '../src/useClickOutside'
import { ProjectsQueryVariables, useProjectsQuery } from './index.queries.generated'

const IndexPage: NextPage = () => {
  const [projectsQueryVariables, setProjectsQueryVariables] = useState<ProjectsQueryVariables>({
    orderBy: 'createdAt',
    orderDirection: 'desc',
  })
  const { data, isLoading } = useProjectsQuery(projectsQueryVariables, { refetchOnWindowFocus: false })

  const projectsCount = data && data.projects.length

  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <section>
        <header sx={{ pb: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Heading>Projects Registry</Heading>
            <p sx={{ height: '1.5rem' }}>{projectsCount == null ? '' : `${projectsCount} Projects`}</p>
          </div>
          <SortingSelect value={projectsQueryVariables} onChange={setProjectsQueryVariables} />
        </header>
        <ul
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            ...(isLoading && { opacity: 0.8, cursor: 'wait' }),
          }}
        >
          <li
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              height: '222px',
            }}
          >
            <Link href="/project/add">
              <a
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'background.card',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 24px rgba(30, 37, 44, 0.16), inset 0 0 0 8px var(--theme-ui-colors-primary-88)',
                  transition: 'box-shadow 250ms linear, transform 250ms linear',
                  fontWeight: 600,
                  color: 'neutral.88',

                  ':hover, a:focus-visible > &': {
                    boxShadow: '0px 4px 36px rgba(30, 37, 44, 0.32), inset 0 0 0 8px var(--theme-ui-colors-primary-88)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Add Project
              </a>
            </Link>
          </li>
          {data ? (
            data.projects.map((project) => (
              <li key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <a>
                    <ProjectCard
                      imageUrl={project.imageUrl}
                      name={project.name}
                      owner={project.owner.id.slice(0, 16) + '...'}
                      createdAt={new Date(Number(project.createdAt) * 1000).toDateString()}
                    />
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <CardSkeletons />
          )}
        </ul>
      </section>
    </main>
  )
}

export default IndexPage

function CardSkeletons() {
  return (
    <>
      {Array.from({ length: 11 }).map((_, i) => (
        <li key={i} aria-hidden sx={{ height: '222px', border: '1px solid', borderColor: 'neutral.16' }} />
      ))}
    </>
  )
}

interface SortingSelectProps {
  value: ProjectsQueryVariables
  onChange: Dispatch<SetStateAction<ProjectsQueryVariables>>
}
function SortingSelect({ value: { orderBy, orderDirection }, onChange }: SortingSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  useClickOutside(containerRef, () => setIsOpen(false))

  const options: [OrderBy, string][] = [
    ['createdAt', 'Most recent'],
    ['upvotes', 'Upvotes'],
    ['name', 'Alphabetical'],
  ]

  const buttonStyle = {
    border: '2px solid transparent',
    p: '0.5rem',
    borderRadius: '8px',
    transition: 'box-shadow 250ms linear, transform 250ms linear, border 250ms linear',
    '&:hover, &:focus-visible': {
      borderColor: 'neutral.08',
      boxShadow: '0px 1px 8px rgba(30, 37, 44, 0.08)',
      transform: 'scale(1.025)',
    },
  }

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: '-0.5rem',
        gap: '0.25rem',
      }}
    >
      <div ref={containerRef} sx={{ position: 'relative' }}>
        <button onClick={() => setIsOpen(true)} sx={buttonStyle}>
          <span sx={{ fontSize: 'sm', fontWeight: 700 }}>
            {options.map(([field, text]) => (field === orderBy ? text : ''))}
          </span>
        </button>
        {isOpen && (
          <div
            sx={{
              boxShadow: '0px 2px 16px rgba(30, 37, 44, 0.16)',
              position: 'absolute',
              top: 0,
              left: 0,
              p: '0.25rem',
              backgroundColor: 'background',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              transform: 'translateX(-25%)',
              zIndex: 9,
            }}
          >
            {options.map(([field, text]) => (
              <button
                key={field}
                sx={{
                  fontSize: 'sm',
                  fontWeight: 700,
                  p: '0.5rem 1.5rem',
                  borderRadius: '4px',
                  textAlign: 'left',
                  '&:hover, &:focus-visible': {
                    backgroundColor: 'background.tertiary',
                  },
                }}
                onClick={() => {
                  onChange((s) => ({ ...s, orderBy: field }))
                  setIsOpen(false)
                }}
              >
                {text}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        sx={buttonStyle}
        onClick={() => onChange((s) => ({ ...s, orderDirection: s.orderDirection === 'asc' ? 'desc' : 'asc' }))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          sx={{ opacity: 0.5, size: '1.5rem', transform: orderDirection === 'asc' && 'rotate(180deg)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </button>
    </div>
  )
}

import type { NextPage } from 'next'
import Link from 'next/link'

import { Heading } from '../src/Heading'
import { ProjectCard } from '../src/ProjectCard'
import { useSubmitProject } from '../src/useSubmitProject'
import { useProjectsQuery } from './index.queries.generated'

const IndexPage: NextPage = () => {
  const { data } = useProjectsQuery({}, { refetchOnWindowFocus: false })

  const projectsCount = data && data.projects.length

  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <section>
        <header sx={{ pb: '2rem' }}>
          <Heading>Projects Registry</Heading>
          <p sx={{ height: '1.5rem' }}>{projectsCount == null ? '' : `${projectsCount} Projects`}</p>
        </header>
        <ul
          sx={{
            listStyle: 'none',
            m: 0,
            p: 0,
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          }}
        >
          <li
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
            }}
          >
            <Link href="/project/submit">
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
                Submit Project
              </a>
            </Link>
          </li>
          {data &&
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
            ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
            <li key={i}>
              <Link href={`/project/${i}`}>
                <a>
                  <ProjectCard
                    imageUrl={`https://placekitten.com/200/${200 + i}`}
                    name={`Project ${i}`}
                    owner={'0xb3321f0E1591083943Ae2d20AA36adBDD3d55a70'.slice(0, 16) + '...'}
                    createdAt={new Date().toDateString()}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default IndexPage

import type { NextPage } from 'next'
import Link from 'next/link'

import { Heading } from '../src/Heading'
import { ProjectCard } from '../src/ProjectCard'
import { useProjectsQuery } from './index.queries.generated'

const IndexPage: NextPage = () => {
  const { data } = useProjectsQuery({}, { refetchOnWindowFocus: false })

  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <section>
        <header sx={{ pb: '2rem' }}>
          <Heading>Projects Registry</Heading>
          <span>20 Projects</span>
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
          {data &&
            data.projects.map((project) => (
              <li key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <a>
                    <ProjectCard imageUrl="https://placekitten.com/200/200" name={project.name} />
                  </a>
                </Link>
              </li>
            ))}
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
            <li key={i}>
              <Link href={`/project/${i}`}>
                <a>
                  <ProjectCard imageUrl="https://placekitten.com/200/200" name={`Project ${i}`} />
                </a>
              </Link>
            </li>
          ))} */}
        </ul>
      </section>
    </main>
  )
}

export default IndexPage

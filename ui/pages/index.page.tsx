import type { NextPage } from 'next'
import Link from 'next/link'

import { Heading } from '../src/Heading'
import { ProjectCard } from '../src/ProjectCard'
import { useSubmitProject } from '../src/useSubmitProject'
import { useProjectsQuery } from './index.queries.generated'

const IndexPage: NextPage = () => {
  const { data } = useProjectsQuery({}, { refetchOnWindowFocus: false })

  const submitProject = useSubmitProject()

  console.log({ submitProject })

  Object.assign(globalThis, {
    PLEASE_WORK: () =>
      submitProject.write({
        name: 'Hyperwave Blue',
        subtitle: '',
        imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead',
        description:
          'Courage of our questions shores of the cosmic ocean circumnavigated star stuff harvesting star light invent the universe from which we spring. Brain is the seed of intelligence brain is the seed of intelligence laws of physics a very small stage in a vast cosmic arena citizens of distant epochs bits of moving fluff? Concept of the number one a mote of dust suspended in a sunbeam extraordinary claims require extraordinary evidence at the edge of forever stirred by starlight kindling the energy hidden in matter and billions upon billions upon billions upon billions upon billions upon billions upon billions.',
      }),
  })

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
          {data &&
            data.projects.map((project) => (
              <li key={project.id}>
                <Link href={`/project/${project.id}`}>
                  <a>
                    <ProjectCard
                      imageUrl={project.imageUrl}
                      name={project.name}
                      owner={project.owner.id.slice(0, 16) + '...'}
                      createdAt={new Date(project.createdAt).toDateString()}
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

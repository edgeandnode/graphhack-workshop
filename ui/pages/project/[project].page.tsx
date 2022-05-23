import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button } from '../../src/Button'
import { Heading } from '../../src/Heading'
import { useProjectQuery } from './[project].queries.generated'

const ProjectPage: NextPage = () => {
  const { query } = useRouter()
  const projectId = String(query.project)

  const { data, error } = useProjectQuery({ id: projectId })

  if (data && data.project === null) {
    return (
      <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
        <header sx={{ pb: '2rem' }}>
          <Heading>Project Not Found</Heading>
        </header>
      </main>
    )
  }

  if (error) {
    return (
      <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
        <header sx={{ pb: '2rem' }}>
          <Heading>Something went wrong</Heading>
        </header>
        <pre sx={{ color: 'orangered' }}>{(error as Error).toString()}</pre>
      </main>
    )
  }

  const project = data?.project

  const handleUpvote = () => {
    window.alert('Upvote!')
  }
  const handleDownvote = () => {}

  const score = project && project.upvotes - project.downvotes

  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <header sx={{ pb: '2rem' }}>
        <Heading>{project?.name || 'Loading...'}</Heading>
        <p sx={{ height: '1.5rem' }}>{project?.subtitle}</p>
      </header>
      <img
        width="100%"
        alt=""
        role="presentation"
        src={project?.imageUrl}
        sx={{
          height: '304px',
          objectFit: 'cover',
        }}
      />
      <section sx={{ py: '2rem', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
        <div>
          <Heading as="h2" sx={{ fontSize: 'xl' }}>
            Project Description
          </Heading>
          <p sx={{ lineHeight: 1.8, fontWeight: 400, mt: '0.5rem' }}>{project?.description}</p>
        </div>
        <dl>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Owner</dt>
            <dt>{project?.owner?.id}</dt>
          </div>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Created At</dt>
            <dt>{project?.createdAt}</dt>
          </div>
        </dl>
      </section>
      <div sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
        <Button onClick={handleUpvote} icon={<ArrowUpIcon />}>
          Upvote
        </Button>
        <Button onClick={handleDownvote} icon={<ArrowDownIcon />}>
          Downvote
        </Button>
        {score != null && (
          <strong sx={{ fontSize: 'xl', color: 'neutral.88' }}>
            Total:
            <span sx={{ pl: '0.5rem', color: 'neutral' }}>
              {score > 0 ? '+' : score < 0 ? '-' : ''}
              {score}
            </span>
          </strong>
        )}
      </div>
    </main>
  )
}

export default ProjectPage

function ArrowUpIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      sx={{ size: '1.5rem' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      sx={{ size: '1.5rem' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
    </svg>
  )
}

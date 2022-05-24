import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { Button } from '../../src/Button'
import { Heading } from '../../src/Heading'
import { DIDNT_VOTE, DOWNVOTE, UPVOTE, useCurrentUserVote } from '../../src/useCurrentUserVote'
import { useVote } from '../../src/useVote'
import { ProjectQuery, useProjectQuery } from './[project].queries.generated'

const ProjectPage: NextPage = () => {
  const { query } = useRouter()
  const projectId = String(query.project)

  const { data, error } = useProjectQuery({ id: projectId })
  const project = data?.project

  if (data && project === null) {
    return <ProjectPageLayout heading="Project Not Found" />
  }

  if (error) {
    return (
      <ProjectPageLayout heading="Something went wrong">
        <pre sx={{ color: 'orangered' }}>{(error as Error).toString()}</pre>
      </ProjectPageLayout>
    )
  }

  return (
    <ProjectPageLayout heading={project?.name || 'Loading...'} subheading={project?.subtitle}>
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
        <dl sx={{ ml: 'auto' }}>
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
      {project && <ProjectVotingSection project={project} projectId={projectId} />}
    </ProjectPageLayout>
  )
}

export default ProjectPage

type Project = Exclude<ProjectQuery['project'], undefined | null>

function ProjectVotingSection({ project, projectId }: { project: Project; projectId: string }) {
  // TODO: The user can't vote if they already voted, so we need to check this.

  const userVoteOnChain = useCurrentUserVote(projectId)

  const vote = useVote(project.name || '')

  const handleUpvote = () => vote.write(projectId, 1)
  const handleDownvote = () => vote.write(projectId, 2)

  const score = project.upvotes - project.downvotes

  return (
    <section sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', alignItems: 'center' }}>
      {userVoteOnChain === DIDNT_VOTE && (
        <>
          <Button onClick={handleUpvote} icon={<ArrowUpIcon />} disabled={vote.isLoading}>
            Upvote
          </Button>
          <Button onClick={handleDownvote} icon={<ArrowDownIcon />} disabled={vote.isLoading}>
            Downvote
          </Button>{' '}
        </>
      )}
      <strong sx={{ fontSize: 'xl', color: 'neutral.88' }}>
        Total:
        <span sx={{ pl: '0.5rem', color: 'neutral' }}>
          {score > 0 ? '+' : score < 0 ? '-' : ''}
          {score}
        </span>
      </strong>
      {userVoteOnChain === UPVOTE && <p sx={{ fontSize: 'xl', color: 'neutral.88' }}>| You upvoted 👍</p>}
      {userVoteOnChain === DOWNVOTE && <p sx={{ fontSize: 'xl', color: 'neutral.88' }}>| You downvoted 👎</p>}
      {vote.isLoading && <p sx={{ fontSize: 'xl', color: 'neutral.88' }}>| Transaction pending...</p>}
    </section>
  )
}

interface ProjectPageLayoutProps {
  heading: ReactNode
  subheading?: ReactNode
  children?: ReactNode
}
function ProjectPageLayout({ heading, subheading, children }: ProjectPageLayoutProps) {
  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <header sx={{ pb: '2rem' }}>
        <Heading>{heading}</Heading>
        <p sx={{ height: '1.5rem' }}>{subheading}</p>
      </header>
      {children}
    </main>
  )
}

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

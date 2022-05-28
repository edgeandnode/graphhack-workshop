import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { ThemeUICSSObject } from 'theme-ui'
import { useWaitForTransaction } from 'wagmi'

import { Heading } from '../../src/Heading'
import { ThumbIcon } from '../../src/ThumbIcon'
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
        <dl sx={{ ml: 'auto', '> div': { display: 'flex', justifyContent: 'space-between' }, dt: { pr: '1rem' } }}>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Created At</dt>
            <dt>
              {project?.createdAt &&
                new Date(Number(project.createdAt) * 1000).toLocaleDateString('en-GB', {
                  dateStyle: 'long',
                })}
            </dt>
          </div>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Owner</dt>
            <dt>
              {project?.owner?.id && (
                <a
                  href={`https://rinkeby.etherscan.io/address/${project?.owner?.id}`}
                  target="__blank"
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textDecorationColor: 'primary.64',
                    borderRadius: '4px',
                    p: '0.125rem 0.25rem',
                    m: '-0.125rem -0.25rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    ':hover, :focus-visible': {
                      backgroundColor: 'primary.08',
                    },
                  }}
                >
                  {project.owner.id}
                </a>
              )}
            </dt>
          </div>
        </dl>
      </section>
      {project && <ProjectVotingSection project={project} projectId={projectId} />}
    </ProjectPageLayout>
  )
}

export default ProjectPage

type Project = Exclude<ProjectQuery['project'], undefined | null>

const voteButtonStyle: ThemeUICSSObject = {
  lineHeight: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
  p: '0.5rem 1rem',
  borderRadius: '8px',
  '&:not(:disabled):hover, &:not(:disabled):focus-visible': {
    backgroundColor: 'primary.08',
  },
}
const voteCountStyle: ThemeUICSSObject = { fontWeight: 700, fontSize: 'lg', letterSpacing: '-0.4px' }

function ProjectVotingSection({ project, projectId }: { project: Project; projectId: string }) {
  const userVoteOnChain = useCurrentUserVote(projectId)

  const vote = useVote(project.name || '')

  const handleUpvote = () => vote.write(projectId, 1)
  const handleDownvote = () => vote.write(projectId, 2)

  const didntVote = userVoteOnChain === DIDNT_VOTE
  const upvoted = userVoteOnChain === UPVOTE
  const downvoted = userVoteOnChain === DOWNVOTE

  const buttonsDisabled = !didntVote || vote.isLoading

  return (
    <section sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <button
        title="Upvote"
        sx={{ ...voteButtonStyle, color: upvoted ? 'primary' : 'neutral.64' }}
        disabled={buttonsDisabled}
        onClick={handleUpvote}
      >
        <span sx={voteCountStyle}>{project.upvotes}</span>
        <ThumbIcon direction="up" size="18" aria-label="Upvotes" />
        {upvoted && <span>{}</span>}
      </button>
      <button
        title="Downvote"
        sx={{ ...voteButtonStyle, color: downvoted ? 'primary' : 'neutral.32' }}
        disabled={buttonsDisabled}
        onClick={handleDownvote}
      >
        <span sx={voteCountStyle}>{project.downvotes}</span>
        <ThumbIcon direction="down" size="18" aria-label="Downvotes" />
      </button>
      {vote.isLoading && (
        <p sx={{ fontSize: 'lg', color: 'neutral.88', ml: '0.5rem', fontStyle: 'italic' }}>Voting...</p>
      )}
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

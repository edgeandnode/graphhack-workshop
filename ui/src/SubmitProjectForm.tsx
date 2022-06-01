import { ProjectRegistry } from '@graphhack-workshop/contract'
import { FormEventHandler, useState } from 'react'
import { Input, Textarea, ThemeUICSSObject } from 'theme-ui'
import { useAccount } from 'wagmi'

import { Button } from './Button'
import { Heading } from './Heading'
import { ImageUploader, ImageList } from './ImageUploader'
import { uploadToIpfs } from './ipfs'
import { ProjectCard } from './ProjectCard'
import { useSubmitProject } from './useSubmitProject'

const containerStyle: ThemeUICSSObject = {
  borderRadius: '8px',
  mx: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

interface SubmitProjectFormControlsCollection extends HTMLFormControlsCollection {
  name: HTMLInputElement
  subtitle: HTMLInputElement
  description: HTMLTextAreaElement
}
interface SubmitProjectFormElement extends HTMLFormElement {
  readonly elements: SubmitProjectFormControlsCollection
}

export function SubmitProjectForm() {
  const submitProject = useSubmitProject()
  const account = useAccount()
  const [images, setImages] = useState<ImageList>([])
  const [imageError, setImageError] = useState<undefined | 'image-required' | 'ipfs-upload-failed'>()

  const handleSubmit: FormEventHandler<SubmitProjectFormElement> = async (event) => {
    event.preventDefault()

    const { name, subtitle, description } = event.currentTarget.elements
    const file = images[0]?.file

    if (!file) {
      setImageError('image-required')
      return
    }

    let ipfsImageUrl: string
    try {
      ipfsImageUrl = await uploadToIpfs(file)
      console.log('Image uploaded to', ipfsImageUrl)
    } catch (err) {
      console.error(err)
      setImageError('ipfs-upload-failed')
      return
    }

    submitProject.write({
      name: name.value,
      subtitle: subtitle.value,
      description: description.value,

      imageUrl: ipfsImageUrl,
    })
  }

  if (submitProject.error) console.error(submitProject.error)

  if (submitProject.response && submitProject.lastArgs) {
    console.log('Project submitted ', submitProject.response)
    const project = submitProject.lastArgs[0]
    const ownerAddress = account.data?.address

    return (
      <div sx={containerStyle}>
        <Heading as="h2" sx={{ fontSize: 'lg', letterSpacing: '-0.4px', color: 'neutral.64' }}>
          Submitted
        </Heading>
        <div sx={{ display: 'flex', gap: '1rem' }}>
          <ProjectCard
            name={project.name}
            owner={ownerAddress?.slice(0, 16) + '...' || ''}
            imageUrl={project.imageUrl}
            sx={{ width: '200px', flexShrink: 0, border: '1px solid', borderColor: 'neutral.32' }}
          />
          <pre
            sx={{
              backgroundColor: 'background',
              borderRadius: '4px',
              color: 'neutral.88',
              flex: 1,
              p: '0.75rem',
              border: '1px solid',
              borderColor: 'neutral.32',
              overflow: 'auto',
            }}
          >
            {JSON.stringify({ ...project, owner: ownerAddress }, null, 2)}
          </pre>
        </div>
        <Button onClick={() => submitProject.reset()}>Add Another Project</Button>
        <a
          href={`https://rinkeby.etherscan.io/tx/${submitProject.response.hash}`}
          target="__blank"
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationColor: 'primary.64',
            borderRadius: '4px',
            p: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: 600,
            ':hover, :focus-visible': {
              backgroundColor: 'primary.08',
            },
          }}
        >
          See Transaction on Etherscan
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      sx={{
        ...containerStyle,
        gap: ['1rem', '2rem'],
        '> label': {
          display: 'flex',
          gap: [0, '2rem', '3rem'],
          flexDirection: ['column', 'row'],
          '> div': {
            pb: '0.5rem',
            color: 'neutral.64',
            fontWeight: 500,
            width: ['auto', '6rem'],
            textAlign: ['left', 'right'],
          },
          input: {
            textIndent: '1rem',
            py: '1rem',
          },
          textarea: {
            p: '1rem',
          },
          'input, textarea': {
            borderColor: 'neutral.16',
            borderWidth: '2px',
          },
        },
      }}
    >
      {submitProject.error && (
        <section sx={{ color: 'red' }}>
          <pre>{submitProject.error.message}</pre>
        </section>
      )}
      <ImageUploader
        value={images}
        onChange={setImages}
        labelId="submit-project-image-upload"
        sx={{ height: '400px' }}
      />
      {imageError === 'image-required' && <p sx={{ color: 'critical' }}>The image is required.</p>}
      {imageError === 'ipfs-upload-failed' && <p sx={{ color: 'critical' }}>IPFS upload failed.</p>}
      <label>
        <div>Name</div>
        <Input name="name" type="text" required autoComplete="off" />
      </label>
      <label>
        <div>
          Subtitle <small>(optional)</small>
        </div>
        <Input name="subtitle" type="text" />
      </label>
      <label>
        <div>
          Description <small>(optional)</small>
        </div>
        <Textarea name="description" rows={5} />
      </label>
      <Button
        type="submit"
        sx={{ width: ['auto', 'min-content'], whiteSpace: 'pre', ml: 'auto' }}
        disabled={submitProject.isLoading}
      >
        {submitProject.isLoading ? 'Submitting' : 'Submit'} Project
      </Button>
    </form>
  )
}

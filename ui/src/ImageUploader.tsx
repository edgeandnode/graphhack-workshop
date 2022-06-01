import { SVGProps } from 'react'
import type { ImageListType as ImageList } from 'react-images-uploading'
import ReactImagesUploading from 'react-images-uploading'

export type { ImageList }

interface ImageUploaderProps {
  onChange: (value: ImageList, addUpdatedIndex?: number[] | undefined) => void
  value: ImageList
  labelId: string
  className?: string
}

export function ImageUploader({ labelId, className, ...rest }: ImageUploaderProps) {
  return (
    <ReactImagesUploading {...rest}>
      {({ imageList, onImageUpload, isDragging, dragProps }) => (
        <div
          className={className}
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
            minHeight: 300,
            p: '2px',
          }}
          {...dragProps}
        >
          <button
            title={imageList.length === 0 ? 'Add image' : 'Change image'}
            type="button"
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '8px',
              backgroundColor: 'background.tertiary',
              border: '2px solid',
              borderColor: 'neutral.08',
              transition: 'all 250ms linear',
              '&:hover': { borderColor: imageList.length ? 'neutral.64' : 'neutral.16' },
              ...(isDragging && { borderColor: 'neutral.32' }),
            }}
            onClick={() => {
              onImageUpload()
            }}
            aria-labelledby={labelId}
          />
          <div sx={{ pointerEvents: 'none', zIndex: 1, height: '100%', flex: 1 }}>
            {imageList.length === 0 ? (
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <ImageIcon />
                <div>
                  <span id={labelId} sx={{ fontWeight: 500, color: 'primary' }}>
                    Add an image
                  </span>
                </div>
              </div>
            ) : (
              <img
                height="100%"
                width="100%"
                src={imageList[0].dataURL}
                alt="Uploaded image"
                sx={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            )}
          </div>
        </div>
      )}
    </ReactImagesUploading>
  )
}

function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={59} height={59} viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.75 12.292h29.5a7.375 7.375 0 017.375 7.375v22.125a7.375 7.375 0 01-7.375 7.375h-29.5a7.375 7.375 0 01-7.375-7.375V19.667a7.375 7.375 0 017.375-7.375zm-2.458 29.5h22.125l-11.063-14.75-11.062 14.75zm27.041-7.375a7.375 7.375 0 100-14.75 7.375 7.375 0 000 14.75z"
        fill="#A38CFF"
      />
    </svg>
  )
}

import { create } from 'ipfs-http-client'

const ENDPOINT = new URL('api/v0', process.env.IPFS_URI).href
const ipfs = create({ url: ENDPOINT })

export const uploadToIpfs = async (blob: Blob): Promise<string> => {
  const result = await ipfs.add(blob)

  return `${ENDPOINT}/cat?arg=${result.path}`
}

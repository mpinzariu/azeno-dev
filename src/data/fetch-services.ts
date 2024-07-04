import { readItems } from '@directus/sdk'
import directusApi from './directus-api'

export { fetchServicesData, fetchProjectData }
export type Data = Awaited<ReturnType<typeof fetchServicesData>>

const fetchServicesData = async ({ locale }: PageContextServer) => {
  const services = await directusApi.request(
    readItems('services', {
      filter: {
        status: { _eq: 'published' },
      },
      fields: ['*'],
    })
  )
  return services
}

const fetchProjectData = async ({ locale, slug }: PageContextServer) => {
  const services = await directusApi.request(
    readItems('services', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['*', { gallery: [{ directus_files_id: ['*'] }] }],
    })
  )

  return services[0]
}

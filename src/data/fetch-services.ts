import { readItems } from '@directus/sdk'
import directusApi from './directus-api'

export { fetchServicesData, fetchServiceData }
export type Data = Awaited<ReturnType<typeof fetchServicesData>>

const fetchServicesData = async ({ locale }: PageContextServer) => {
  const services = await directusApi.request(
    readItems('services', {
      filter: {
        status: { _eq: 'published' },
      },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: locale,
            },
          },
        },
      },      
      fields: ['*', { translations: ['*'] }],
    })
  )
  return services
}

const fetchServiceData = async ({ locale, slug }: PageContextServer) => {
  const services = await directusApi.request(
    readItems('services', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['*', { gallery: [{ directus_files_id: ['*'] }] }],
    })
  )

  return services[0]
}

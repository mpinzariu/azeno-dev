import { readItems } from '@directus/sdk'
import directusApi from './directus-api'

export { fetchProjectsData, fetchProjectData }
export type Data = Awaited<ReturnType<typeof fetchProjectsData>>

const fetchProjectsData = async ({ locale }: PageContextServer) => {
  const projects = await directusApi.request(
    readItems('projects', {
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

  return projects
}

const fetchProjectData = async ({ locale, slug }: PageContextServer) => {
  const projects = await directusApi.request(
    readItems('projects', {
      limit: 1,
      filter: { slug: { _eq: slug } },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: locale,
            },
          },
        },
      },        
      fields: ['*', { gallery: [{ directus_files_id: ['*'] }] }, { translations: ['*'] }],
    })
  )
  return projects[0]
}

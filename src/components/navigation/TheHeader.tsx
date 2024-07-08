import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import Navbar from './Navbar'
import { fetchGlobalData as fetchData } from '@/data/fetch-globals'

export default async function TheHeader({ lang }: { lang: string }) {
  const data = await fetchData({ locale: lang })
  
  // console.log("data: ", data.globalData)

  return (
    <>
      <Navbar
        locale={lang}
        title={data.globalData.title}
        logoUrl={getDirectusMedia(data.globalData.logo)}
        navigation={data.mainNavData}
      ></Navbar>
    </>
  )
}

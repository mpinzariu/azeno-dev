import { Posts, Projects, Services } from '@/data/directus-collections'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import PostCard from '@/components/PostCard'
import ProjectCard from '../ProjectCard'
import ServiceCard from '../ServiceCard'

export interface CardGroup {
  id: string
  title: string
  headline: string
  content: string
  group_type: string
  posts: Array<{
    posts_id: Posts
  }>
  projects: Array<{
    projects_id: Projects
  }>
  services: Array<{
    services_id: Services  
  }>      
}

interface CardGroupBlockProps {
  data: CardGroup
}

function CardGroupBlock({ data }: CardGroupBlockProps) {
  console.log("data: ", data)
  return (
    <BlockContainer>
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      <div className='mt-4 grid gap-8 md:grid-cols-3'>        
        {data.group_type == 'posts' && data.posts.map((item, itemIdx) => (          
            <PostCard key={itemIdx} post={item.posts_id} />  
        ))}
        {data.group_type == 'projects' && data.projects.map((item, itemIdx) => (          
            <ProjectCard key={itemIdx} project={item.projects_id} />  
        ))}   
        {data.group_type == 'services' && data.services.map((item, itemIdx) => (          
            <ServiceCard key={itemIdx} service={item.services_id} />  
        ))}                
      </div>
    </BlockContainer>
  )
}

export default CardGroupBlock

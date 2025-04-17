import Style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {

  return ( <>
    <div className='py-5'>
      <MainSlider/>
      <CategoriesSlider/>
      <RecentProducts/>
    </div>
  </> )
}

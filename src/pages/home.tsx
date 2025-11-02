// Home page

import  Contact  from "../sections/contact"
import Subscribe from "../components/subscribe"
import About from "../sections/about"
import VideoBackground from "../sections/animatedbackground"
import Quality_Services from "../sections/qualityServices"
import RecentBlogs from "../sections/recentblogs"
import FeaturedYoutubeVideos from "../sections/featuredVideos"
import { ViewCourses } from "../components/ViewCourses"

const Home = () =>{
    return(
     <>
        <VideoBackground />
        <About />
        <Quality_Services />
        <RecentBlogs />
        <Subscribe />
        <FeaturedYoutubeVideos />
        <ViewCourses />
        <Contact />
     </>
    )
}

export default Home
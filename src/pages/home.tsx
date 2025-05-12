// Home page

import  Contact  from "../sections/contact"
import Subscribe from "../components/subscribe"
import About from "../sections/about"
import VideoBackground from "../sections/animatedbackground"
import Quality_Services from "../sections/qualityServices"
import RecentBlogs from "../sections/recentblogs"

const Home = () =>{
    return(
     <>
        <VideoBackground />
        <About />
        <Quality_Services />
        <RecentBlogs />
        <Subscribe />
        <Contact />
     </>
    )
}

export default Home
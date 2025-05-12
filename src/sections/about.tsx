//About section
import profile from '../assets/images/profile.png'
import Divider from '../components/divider'
const About = () => {
    return(
        <section className="flex bg-[#3E3A59] text-white py-10 lg:px-10">
            {/**grid layout */}
            <div className="grid lg:grid-cols-[40%_60%] grid-rows-auto lg:px-42">
                {/**profile picture */}
                <div className='flex items-center justify-center'>
                    <img className='object-cover' src={profile} alt="Chris Quashie Profile Picture" aria-label='Chris Quashie Profile Picture' />
                </div>
                {/**about context */}
                <div className="bg-[#171723] py-10 lg:py-20 flex flex-col gap-5 px-6 relative">
                    {/**divider */}
                    <Divider />
                    <h1 className='font-bold lg:text-[60px] text-[30px] leading-[70px]'>IT professional with a passion for cyber security</h1>
                    <p className='lg:text-[20px]'>I’m Chris Quashie, a network engineer, online educator, and content creator with a passion for making complex IT concepts accessible. With certifications including CCNA, Security+, Network+, A+, and, I specialize in enterprise networking, cybersecurity, and cloud technologies, with expertise in SD-WAN, MPLS, VLANs, VPNs, and IT infrastructure.</p>
                    <a target='_blank' href="https://www.linkedin.com/in/chris-quashie-b74299264">
                        <button className='bg-transparent border px-4 w-[300px] h-[55px] transition-all duration-[1s] hover:bg-[#3E3A59] hover:border-none'>Let's Connect</button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About
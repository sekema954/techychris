import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';


//Social links
export const Socials = [
    {
        id:1,
        title:"Youtube",
        link:"https://www.youtube.com/channel/UCiCUVCHgNYouG-31lXZRjQA",
        icon:faYoutube,
        backgroundColor:'#FF0000'
    },

    {
        id:2,
        title:"TikTok",
        link:"https://www.tiktok.com/@_mbame",
        icon:faTiktok,
        backgroundColor:'#10101',
    },

    {
        id:3,
        title:"Linkedin",
        link:"https://www.linkedin.com/in/chris-quashie-b74299264",
        icon:faLinkedin,
        backgroundColor:'#0077B5'
    },
     {
          id: '4',
          title: 'Discord',
          icon: faDiscord,
          link: 'https://discord.com/invite/QgjVAsbQCH',
          backgroundColor: '#7289DA',
        },
        {
          id:'5',
          title:'Instagram',
          icon:faInstagram,
          link:'https://www.instagram.com/techychriss?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
          backgroundColor: '#fa7e1e '
    
        }
];

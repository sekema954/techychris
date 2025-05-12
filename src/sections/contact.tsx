//Contact 
import { useState } from 'react';
import image from '../assets/imagea/contact_image.png';
import Divider from '../components/divider';
const Contact = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname:"",
        email:"",
        message:"",
    });

    const handleChange = (e:any) => {
        const {name, value} = e.target;
        setFormData((prev=>({
            ...prev,
            [name]:value,
        })));
    };


    const handleSubmit = (e:any) => {
        e.preventDefault();
    }
    return(
        <section className="bg-[#3E3A59] text-white">
            <header className="flex flex-col items-center justify-center text-center">
                <h1 className="text-[50px]">CONTACT</h1>
                <p className="lg:w-[600px]">Thanks for your interest in my IT Courses and guides. If you’d like to get in touch with me, please contact me on social media or complete the following form.</p>
            </header>
            {/**lsyout grid */}
            <div className="grid lg:grid-cols-[60%_40%] grid-rows-auto w-full h-full py-16 px-5 gap-2">
                {/**grid layout 1  */}
                <div className='w-full h-auto border'>
                    <img className='w-full h-full' src={image} alt="" />
                </div>
                {/***grid layout 2 */}
                <form onSubmit={handleSubmit} className='border relative flex flex-col py-16 px-10 gap-6 bg-[#171723]'>
                    <Divider />
                    {[
                        {id:1, placeholder:'First Name', type:'text', value:formData.firstname,},
                        {id:2, placeholder:'Last Name', type:'text', value:formData.lastname},
                        {id:3, placeholder:'Email', type:'text', value:formData.email},
                    ].map((form)=>(
                        <input onChange={handleChange} className='border flex rounded-2xl h-[65px] bg-white text-black px-6' type={form.type} name={form.placeholder} value={form.value} placeholder={form.placeholder} id="" />
                    ))}
                    <textarea rows={6} className='bg-white text-black px-6 py-6' name="message" id="message" placeholder='How can i help you?'></textarea>
                    <button className='border border-white h-[55px] transition-all duration-[1s] hover:bg-[#847FAD]'>
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact
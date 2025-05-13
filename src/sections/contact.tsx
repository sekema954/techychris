import { useState } from 'react';
import image from '../assets/images/contact_image.png';
import Divider from '../components/divider';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://localhost:3000/api/send-contact', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert('Email sent successfully!');
            setFormData({
              firstname: '',
              lastname: '',
              email: '',
              message: '',
            });
          } else {
            alert(`Failed to send email: ${data.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong. Please try again later.');
        }
      };
      

    return (
        <section className="bg-[#3E3A59] text-white py-12 px-4">
            <header className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">CONTACT</h1>
                <p className="max-w-xl mx-auto text-lg">
                    Thanks for your interest in my IT Courses and guides. If you’d like to get in touch with me, please contact me on social media or complete the following form.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
                {/* Image section */}
                <div className="w-full max-h-[400px] overflow-hidden rounded-2xl shadow-lg">
                    <img className="w-full h-full object-cover" src={image} alt="Contact" />
                </div>

                {/* Form section */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#171723] p-8 rounded-2xl shadow-lg flex flex-col gap-6"
                >
                    <Divider />
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            onChange={handleChange}
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            placeholder="First Name"
                            className="rounded-xl h-[55px] px-4 text-black bg-white"
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            placeholder="Last Name"
                            className="rounded-xl h-[55px] px-4 text-black bg-white"
                        />
                    </div>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        className="rounded-xl h-[55px] px-4 text-black bg-white"
                    />
                    <textarea
                        onChange={handleChange}
                        name="message"
                        value={formData.message}
                        rows={5}
                        placeholder="How can I help you?"
                        className="rounded-xl px-4 py-3 text-black bg-white resize-none"
                    ></textarea>
                    <button
                        type="submit"
                        className="h-[50px] bg-[#847FAD] hover:bg-[#6c68a4] transition duration-300 rounded-xl text-white font-medium"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;

'use client'
import { useState } from "react";
import Button from "../atoms/Button";
import { address, email, phoneNumber } from "@/data";

const ContactInfo = () => {
    const [fullName, setFullName] = useState('')
    const [message, setMessage] = useState('')

    const handleSendEmail = () => {
        if (!fullName) return alert('The full name is required')

        const messageToSend = `mailto:${email}?subject=Contacto desde web | ${fullName}&body=${message || 'Hola, quisiera más información acerca de su servicio.'}`;
        window.open(messageToSend, '_blank');
    }

    // const handleSendWhatsapp = () => {
    //     const messageToSend = 'https://api.whatsapp.com/send?phone=+551231313&text=Hola, quisiera más información acerca de su servicio.';
    //     window.open(messageToSend, '_blank');
    // }

    return (
        <section id='contact' className="bg-hero-contact bg-center bg-cover">
            <div className="bg-black bg-opacity-40 min-h-screen flex items-center justify-center">
                <div className="container flex mx-auto px-4 flex-col gap-5 w-full text-white">
                    <h1 className="text-3xl font-bold">Contact us</h1>

                    <div className="flex flex-col gap-2 text-sm">
                        <p>{email}</p>
                        <p>{phoneNumber}</p>
                        <p>{address}</p>
                    </div>

                    <div className="flex flex-col justify-center gap-4 mt-5">
                        <input
                            type="text"
                            id="first_name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="outline-none bg-gray-50 border border-primary text-gray-900 text-sm focus:ring-primary focus:border-primary block w-full p-2.5"
                            placeholder="Write your full name"
                            required
                        />

                        <textarea
                            required
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows="4"
                            className="outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-primary focus:ring-primary focus:border-primary"
                            placeholder="Write your message here..." />


                        <div className="mt-5 flex items-center gap-3">
                            <Button label='Send us a message' onClick={handleSendEmail} />

                            {/* <Button label='Send message with Whatsapp' className='bg-green-500' onClick={handleSendWhatsapp} /> */}
                        </div>
                    </div>
                </div>
            </div>

        </section>

    );
}

export default ContactInfo;
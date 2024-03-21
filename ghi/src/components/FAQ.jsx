import { useState } from 'react'
import '../App.css'

const Data = [
    {
        question: 'What is Hero Cab and who is it for?',
        answer: 'Hero Cab is a ridesharing app designed specifically to serve veterans. We understand the unique needs of veterans, including potential transportation challenges related to disabilities or appointments. Our reliable and respectful drivers are here to get you where you need to go, whether it is for medical appointments, social outings, errands, or anything else.',
    },
    {
        question: 'How do I sign up to use Hero Cab?',
        answer: ' Signing up for Hero Cab is easy! Go to our SignUp page and follow the instructions to create your account. You will need to provide basic information like your name and contact details.',
    },
    {
        question: 'Are your drivers veterans themselves?',
        answer: 'While we do not require all drivers to be veterans, we highly value veterans in our driver community. Many of our drivers are veterans who understand the specific needs and priorities of other veterans. All our drivers undergo a thorough background check and receive comprehensive training to ensure a safe and comfortable riding experience.',
    },
    {
        question: 'How do I request a ride?',
        answer: 'Once you have signed up and logged in to the Hero Cab app, you can easily request a ride. Enter your pick-up location and your destination. You can also schedule rides in advance for your convenience. Once you submit your request, you will see if you request is accepted by a driver.',
    },
    {
        question:
            'Is there a way to indicate I need assistance getting in or out of the vehicle?',
        answer: 'Absolutely! We understand that some veterans may require additional assistance. During the sign up and ride request process, you can find an option to indicate if you need help getting in or out of the vehicle. This information will be relayed to the driver so they can be prepared to offer support upon arrival.',
    },
]

const FAQ = () => {
    const [Expand, setExpand] = useState([])

    const HandleExpand = (i) => {
        const index = Expand.indexOf(i)

        setExpand([...Expand, i])

        if (Expand.includes(i)) {
            Expand.splice(index, 1)
            setExpand([...Expand])
        }
    }

    return (
        <>
            <div className="container-wrapper">
                {Data.map((item, index) => {
                    return (
                        <>
                            <div
                                className="faq"
                                onClick={() => HandleExpand(index)}
                                style={{
                                    height: Expand.includes(index)
                                        ? '120px'
                                        : '50px',
                                    marginTop:
                                        Expand.includes(index) && index !== 0
                                            ? '20px'
                                            : '0',
                                    marginBottom:
                                        Expand.includes(index) > 0 &&
                                        Expand.includes(index) < 4
                                            ? '20px'
                                            : '0',
                                }}
                            >
                                <div className="dropDown">
                                    <h1
                                        style={{
                                            color: Expand.includes(index)
                                                ? '#146EF6'
                                                : 'black',
                                        }}
                                    >
                                        {item.question}
                                    </h1>
                                    <p>
                                        {Expand.includes(index) ? (
                                            <ion-icon name="arrow-dropup" />
                                        ) : (
                                            <ion-icon name="arrow-dropdown" />
                                        )}{' '}
                                    </p>
                                </div>

                                <p>{item.answer}</p>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default FAQ

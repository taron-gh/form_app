import { useEffect, useState, useRef } from 'react'
import "./styles/AppForm.css"

export default function AppForm() {
    const firstNameLabel = useRef(null)
    const lastNameLabel = useRef(null)
    const emailLabel = useRef(null)
    const phoneLabel = useRef(null)

    const countryCodes = [
        {
            label: "AM",
            code: "+374"
        },
        {
            label: "US",
            code: "+1"
        },
        {
            label: "UK",
            code: "+44"
        },
        {
            label: "RU",
            code: "+7"
        },
    ]

    const genders = [
        {
            gender: "Male",
            id: 1
        },
        {
            gender: "Female",
            id: 2
        },
        {
            gender: "Boxk",
            id: 3
        },
        {
            gender: "Jiraf",
            id: 4
        },
        {
            gender: "Yedinarog",
            id: 5
        },
        {
            gender: "Other",
            id: 6
        },
    ]

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState(countryCodes[0])
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState(genders[0].id);
    const phoneObj = {};
    useEffect(() => {
        phoneObj.number = phoneNumber
        phoneObj.code = countryCode.label
    })


    //Handlers
    const firstNameHandler = ({ target: { value } }) => {
        setFirstName(value)
        nameValidator(value, firstNameLabel.current.children[0])
    }
    const lastNameHandler = ({ target: { value } }) => {
        setLastName(value)
        nameValidator(value, lastNameLabel.current.children[0])
    }
    const emailHandler = ({ target: { value } }) => {
        setEmail(value)
        emailValidator(value, emailLabel.current.children[0])
    }
    const phoneSelectHandler = ({ target: { value } }) => {
        setCountryCode(value)
        phoneObj.code = value
    }

    const phoneNumberHandler = ({ target: { value } }) => {
        setPhoneNumber(value)
        if (phoneValidator(value, phoneLabel.current.children[0])) {
            phoneObj.number = value
        }

    }
    const genderSelectHandler = ({ target: { value } }) => {
        setGender(value)
    }


    //Validation
    const nameValidator = (name, label) => {
        if (name.length > 15) {
            label.textContent = "* - This field must contain not more than 15 characters."
        } else if (!name.replace(/\s/g, '')) {
            label.textContent = "* - This field is mandatory."
        } else {
            label.textContent = "*"
        }
        return name.length <= 15 && Boolean(name.replace(/\s/g, ''));
    };

    const emailValidator = (email, label) => {
        if (!String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            label.textContent = "* - Please enter a valid email address"
        } else if (!email.replace(/\s/g, '')) {
            label.textContent = "* - This field is mandatory."
        } else {
            label.textContent = "*"
        }
        return (String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) && Boolean(email.replace(/\s/g, '')));
    };

    const phoneValidator = (num, label) => {
        if (String(num).length > 10 && String(num).length !== 0) {
            label.textContent = "- This field must contain not more than 10 characters."
        } else {
            label.textContent = ""

        }
        return (String(num).length <= 10);
    };




    //Submit
    const submit = (e) => {
        e.preventDefault()

        const ftemp = nameValidator(firstName, firstNameLabel.current.children[0])
        const ltemp= nameValidator(lastName, lastNameLabel.current.children[0])
        const etemp = emailValidator(email, emailLabel.current.children[0])
        const ptemp = phoneValidator(phoneNumber, phoneLabel.current.children[0])

        if (ftemp && ltemp && etemp && ptemp) {
            console.log({
                firstName,
                lastName,
                phone: phoneObj,
                gender
            });
        } else {

        }

    }


    return (
        <form>
            <label htmlFor="firstName" ref={firstNameLabel}>First Name <span>*</span></label>
            <input id="firstName" type="text" value={firstName} onChange={firstNameHandler} placeholder="First Name" />

            <label htmlFor="lastName" ref={lastNameLabel}>Last Name <span>*</span></label>
            <input id="lastName" type="text" value={lastName} onChange={lastNameHandler} placeholder="Last Name" />

            <label htmlFor="countryCode" ref={phoneLabel}>Phone number <span></span></label>
            <div className="phoneContainer">
                <select id="countryCode" onChange={phoneSelectHandler}>
                    {
                        countryCodes.map((item) => (
                            <option key={item.label} value={item.code}>{item.code} {item.label}</option>
                        ))
                    }
                </select>
                <input id="phoneNumber" type="number" value={phoneNumber} onChange={phoneNumberHandler} />
            </div>


            <label htmlFor="email" ref={emailLabel}>Email <span>*</span></label>
            <input id="email" type="text" value={email} onChange={emailHandler} placeholder="Email" />

            <label htmlFor="gender">Gender</label>
            <select id="gender" onChange={genderSelectHandler}>
                {
                    genders.map((item) => (
                        <option key={item.id} value={item.gender}>{item.gender}</option>
                    ))
                }
            </select>

            <label htmlFor="submitButton"></label>
            <button id="submitButton" onClick={submit}>Submit</button>
        </form>
    )
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import * as businessActions from "../../store/business"
import "./CreateForm.css"

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = [
    "12:00AM",
    "12:30AM",
    "1:00AM",
    "1:30AM",
    "2:00AM",
    "2:30AM",
    "3:00AM",
    "3:30AM",
    "4:00AM",
    "4:30AM",
    "5:00AM",
    "5:30AM",
    "6:00AM",
    "6:30AM",
    "7:00AM",
    "7:30AM",
    "8:00AM",
    "8:30AM",
    "9:00AM",
    "9:30AM",
    "10:00AM",
    "10:30AM",
    "11:00AM",
    "11:30AM",
    "12:00PM",
    "12:30PM",
    "1:00PM",
    "1:30PM",
    "2:00PM",
    "2:30PM",
    "3:00PM",
    "3:30PM",
    "4:00PM",
    "4:30PM",
    "5:00PM",
    "5:30PM",
    "6:00PM",
    "6:30PM",
    "7:00PM",
    "7:30PM",
    "8:00PM",
    "8:30PM",
    "9:00PM",
    "9:30PM",
    "10:00PM",
    "10:30PM",
    "11:00PM",
    "11:30PM"
]

const CreateForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [business_name, setBusinessName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [web_address, setWebAddress] = useState("");
    const [menu_web_address, setMenuWebAddress] = useState("");
    const [operating_time, setOperatingTime] = useState([]);
    const [business_type, setBusinessType] = useState("");
    const [price, setPrice] = useState("");
    const [day, setDay] = useState("Mon");
    const [open_time, setOpenTime] = useState("12:00AM");
    const [close_time, setCloseTime] = useState("12:00AM");
    const [displayTime, setDisplayTime] = useState([]);
    const [imgUrl1, setImgUrl1] = useState("");
    const [imgUrl2, setImgUrl2] = useState("");
    const [imgUrl3, setImgUrl3] = useState("");
    const [imgUrl4, setImgUrl4] = useState("");
    const [imgUrl5, setImgUrl5] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let res_opHours = operating_time;
        let closedDays = days.filter(
            (day) => !operating_time.join(',').includes(day)
        );
        closedDays = closedDays.map((day) => day + '-Closed');
        res_opHours = res_opHours.concat(closedDays);

        const business = {
            business_name: business_name,
            address: address,
            city: city,
            state: state,
            postal_code: postal_code,
            lat: lat,
            lng: lng,
            phone_number: phone_number,
            web_address: web_address,
            menu_web_address: menu_web_address,
            operating_time: res_opHours,
            business_type: business_type,
            price: price
        }

        const createdBiz = await dispatch(businessActions.createBusiness(business))

        // console.log(createdBiz)

        if (createdBiz.errors) setErrors(createdBiz.errors)
        else {
            const imageArr = [imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5]

            imageArr.forEach(async (imageUrl, i) => {
                let preview = false;
                if (i === 0) {
                    preview = true
                };
                const imageData = { url: imageUrl, preview: preview }
                await dispatch(businessActions.createBusinessImages(imageData, createdBiz.id))
            })

            await dispatch(businessActions.cleanUpBusinessesAction())
            history.push(`/biz/${createdBiz?.id}`)
        }
    }

    const handleClick = (e) => {
        e.preventDefault();

        const d_hours = [day, open_time, close_time]
        const display = displayTime
        display.push(d_hours)
        setDisplayTime(display)
        setErrors({})

        const hours = `${day}-${open_time}-${close_time}`
        const op_time = operating_time
        op_time.push(hours)
        setOperatingTime(op_time)

        // console.log("ABC123", d_hours, "CDE", displayTime)
    }

    const removeTime = (i) => {
        const hours = displayTime.filter((e, index) => index !== i);
        const opHours = operating_time.filter((e, index) => index !== i);
        setDisplayTime(hours);
        setOperatingTime(opHours);
    };

    // console.log("open", open_time, "op", operating_time, "displayTime", displayTime)

    return (
        <div className="create-biz-container-body">
            <form onSubmit={handleSubmit} className="create-biz-form-box">
                <div className='create-biz-inputs'>
                    <div>
                        Business Name
                        <input
                            autoFocus
                            type="text"
                            value={business_name}
                            onChange={(e) => setBusinessName(e.target.value)}
                            // required
                            placeholder="Biz Name"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.business_name}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        Address
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            // required
                            placeholder="123 Hire Me St."
                            className="create-biz-input-fields"
                        />
                        <div>{errors.address}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            // required
                            placeholder="New York"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.city}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            // required
                            placeholder="NY"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.state}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        ZIP
                        <input
                            type="text"
                            value={postal_code}
                            onChange={(e) => setPostalCode(e.target.value)}
                            // required
                            placeholder="10001"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.postal_code}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        Latitude
                        <input
                            type="number"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            // required
                            placeholder="40.7580 (Optional)"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.lat}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        Longitude
                        <input
                            type="number"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            // required
                            placeholder="73.9855 (Optional)"
                            // min="1"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.lng}</div>
                    </div>
                    <div className='line'></div>
                    <div>
                        Phone
                        <input
                            type="text"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            // required
                            placeholder="(555) 555-5555"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.phone_number}</div>
                    </div>
                    <div>
                        Web Address
                        <input
                            type="text"
                            value={web_address}
                            onChange={(e) => setWebAddress(e.target.value)}
                            // required
                            placeholder="http://www.companyaddress.com (Optional)"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.web_address}</div>
                    </div>
                    <div>
                        Menu Web Address
                        <input
                            type="text"
                            value={menu_web_address}
                            onChange={(e) => setMenuWebAddress(e.target.value)}
                            // required
                            placeholder="http://www.companyaddress.com/menu.html (Optional)"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.menu_web_address}</div>
                    </div>
                    <div>
                        Categories
                        <input
                            type="text"
                            value={business_type}
                            onChange={(e) => setBusinessType(e.target.value)}
                            // required
                            placeholder="Sushi"
                            className="create-biz-input-fields"
                        />
                        <div>{errors.business_type}</div>
                    </div>
                    <div>
                        Hours
                        <>
                            {displayTime.map((time, i) => (
                                <>
                                    <div>
                                        {time[0]} &nbsp; {time[1]} - {time[2]}
                                    </div>
                                    <div onClick={() => removeTime(i)}>
                                        Remove
                                    </div>
                                </>
                            ))}
                        </>
                        <select type="text" value={day} onChange={(e) => setDay(e.target.value)}>
                            {days.map(day => (
                                <option value={day}>{day}</option>
                            ))}
                        </select>
                        <select type="text" value={open_time} onChange={(e) => setOpenTime(e.target.value)}>
                            {hours.map(hour => (
                                <option value={hour}>{hour}</option>
                            ))}
                        </select>
                        <select type="text" value={close_time} onChange={(e) => setCloseTime(e.target.value)}>
                            {hours.map(hour => (
                                <option value={hour}>{hour}</option>
                            ))}
                        </select>
                        <button type="add" onClick={handleClick}>Add Hours</button>
                    </div>
                    <div>
                        Price
                        <select onChange={(e) => setPrice(e.target.value)}>
                            <option value={1}>$</option>
                            <option value={2}>$$</option>
                            <option value={3}>$$$</option>
                            <option value={4}>$$$$</option>
                        </select>
                        <div>{errors.price}</div>
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        value={imgUrl1}
                        onChange={(e) => setImgUrl1(e.target.value)}
                        required
                        placeholder="Photo URL"
                        className="create-spot-input-fields"
                    />
                    <input
                        type="text"
                        value={imgUrl2}
                        onChange={(e) => setImgUrl2(e.target.value)}
                        required
                        placeholder="Photo URL"
                        className="create-spot-input-fields"
                    />
                    <input
                        type="text"
                        value={imgUrl3}
                        onChange={(e) => setImgUrl3(e.target.value)}
                        required
                        placeholder="Photo URL"
                        className="create-spot-input-fields"
                    />
                    <input
                        type="text"
                        value={imgUrl4}
                        onChange={(e) => setImgUrl4(e.target.value)}
                        required
                        placeholder="Photo URL"
                        className="create-spot-input-fields"
                    />
                    <input
                        type="text"
                        value={imgUrl5}
                        onChange={(e) => setImgUrl5(e.target.value)}
                        required
                        placeholder="Photo URL"
                        className="create-spot-input-fields"
                    />
                </div>
                <div className="create-biz-button-div">
                    <button type="submit" className="create-biz-button">Add Business</button>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;

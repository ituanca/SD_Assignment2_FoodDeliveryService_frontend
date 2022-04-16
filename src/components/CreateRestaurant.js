import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {Link, Outlet} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Col} from "reactstrap";
import axios from "axios";
import "@reach/combobox/styles.css";
import {useForm} from "react-hook-form";


function CreateRestaurant(){

    const [errorMessagesR, setErrorMessagesR] = useState({});
    const [isSubmittedR, setIsSubmittedR] = useState(false);
    const [existentRestaurants, setExistentRestaurants] = useState( [] );
    const [restaurantRegistration, setRestaurantRegistration] = useState({
        name: "",
        address: "",
        zones: {},
        admin: []
    });
    const [zones, setZones] = useState( [] );
    const [selectedZones, setSelectedZones] = useState( [] );
    const [checkedState, setCheckedState] = useState(
        new Array(zones.length).fill(false)
    );

    useEffect(() => {
        fetch('http://localhost:8080/assignment2/restaurant/index')
            .then((response) => response.json())
            .then((json) => {
                setExistentRestaurants(json);
            })
            .catch((error) => {
                console.log(error);
            });
        fetch('http://localhost:8080/assignment2/zone/index')
            .then((response) => response.json())
            .then((json) => {
                //setZones( json.results.map(({ name }) => ({ label: name, value: name })));
                setZones(json);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const errors = {
        name: "invalid name",
    };

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const restaurantByName = existentRestaurants.find((restaurant) => restaurant.name === restaurantRegistration.name);

        if (restaurantByName) {
            setErrorMessagesR({name: "name", message: errors.name});
        } else {
            setIsSubmittedR(true);
            console.log(restaurantRegistration);
            axios.post('http://localhost:8080/assignment2/restaurant/create', restaurantRegistration)
                .then(response => setRestaurantRegistration(response.data.id));

            // axios
            //     .post('http://localhost:8080/assignment2/restaurant/create', restaurantRegistration)
            //     .then((response) => {
            //         console.info(response);
            //         setRestaurantRegistration(response.data.id)
            //     })
            //     .catch((error) => {
            //         console.error("There was an error!", error.response.data.message)
            //     });
        }
    };

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setRestaurantRegistration({ ...restaurantRegistration, [name] : value,
            admin: JSON.parse(localStorage.getItem('admin'))});
    }

    const renderErrorMessage = (name) =>
        name === errorMessagesR.name && (
            <div className="error">{errorMessagesR.message}</div>
        );

    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     //setOptions(Array.from(event.target.selectedOptions, (option) => option.value));
    //     //console.log(event.target.selectedOptions.item(0).value);
    //     setOptions([...options, event.target.selectedOptions.item(0).value]);
    //     //setRestaurantRegistration({...restaurantRegistration, [name] : value});
    //     setRestaurantRegistration({...restaurantRegistration, zones: {options}})
    //     console.log(options)
    // };

    // const handleOnChange = (zoneId) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //         index === (zoneId - 149) ? !item : item
    //     );
    //     console.log(zoneId-149);
    //     setCheckedState(updatedCheckedState);
    //     setSelectedZones(selectedZones.concat(zoneId));
    //
    //     //console.log(selectedIds.indexOf(zoneId));
    //     setRestaurantRegistration({...restaurantRegistration, zones: {selectedIds: selectedZones}});
    //
    // }

    const half = Math.ceil(zones.length / 2);
    const firstHalf = zones.slice(0, half)
    const secondHalf = zones.slice(-half)

    console.log(restaurantRegistration);

    const renderForm = (
        <div className="form">
            <form onSubmit = {handleSubmit}>
                <div className="input-container">
                    <label>Name </label>
                    <input type="text"
                           value={restaurantRegistration.name}
                           onChange={handleInput}
                           name="name" required/>
                    {renderErrorMessage("name")}
                </div>
                <div className="input-container">
                    <label>Address </label>
                    <input type="address"
                           value={restaurantRegistration.address}
                           onChange={handleInput}
                           name="address" required/>
                </div>

                <div className="input-container">
                    <label>Choose available delivery zones: </label>
                    {/*<select multiple={true}*/}
                    {/*        value={options}*/}
                    {/*        onChange={handleChange}>*/}
                    {/*    {zones.map(zone => (*/}
                    {/*        <option key={zone.value} value={zone.value}> {zone.name} </option>*/}
                    {/*    ))}*/}
                    {/*</select>*/}
                    <div className="row">
                        {firstHalf.map(({ id, name }, indexFirstHalf) => {
                            return (
                                <div>
                                    <div className="col">
                                        <div key={indexFirstHalf}>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${indexFirstHalf}`}
                                                    name={name}
                                                    value={id}
                                                    checked={checkedState[indexFirstHalf]}
                                                    onChange={(event) => {
                                                        if(event.target.checked){
                                                            setSelectedZones([...selectedZones, id]);
                                                        }else{
                                                            setSelectedZones(
                                                                selectedZones.filter((selection) => selection.id !== id),
                                                            );
                                                        }
                                                        //console.log(restaurantRegistration.zones[1]);
                                                        setRestaurantRegistration({...restaurantRegistration, zones: selectedZones});
                                                    }}
                                                />
                                                <label htmlFor={`custom-checkbox-${indexFirstHalf}`}>{name}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        {secondHalf.map(({ id, name }, indexSecondHalf) => {
                            return (
                                <div>
                                    <div className="col">
                                        <div key={indexSecondHalf}>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${indexSecondHalf}`}
                                                    name={name}
                                                    value={id}
                                                    checked={checkedState[indexSecondHalf]}
                                                    onChange={(event) => {
                                                        if(event.target.checked){
                                                            setSelectedZones([...selectedZones, id]);
                                                        }else{
                                                            setSelectedZones(
                                                                selectedZones.filter((selection) => selection.id !== id),
                                                            );
                                                        }
                                                        setRestaurantRegistration({...restaurantRegistration, zones: selectedZones});
                                                    }}
                                                />
                                                <label htmlFor={`custom-checkbox-${indexSecondHalf}`}>{name}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Create restaurant</div>
                {isSubmittedR ? <div>Restaurant successfully created</div> : renderForm}
                <nav>
                    <span>&nbsp;&nbsp;</span>
                    <Link to="/">
                        <Button as={Col} variant="outline-dark">Go back</Button>
                    </Link>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

export default CreateRestaurant;
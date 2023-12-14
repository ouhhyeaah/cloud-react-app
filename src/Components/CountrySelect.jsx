import {useEffect, useState} from "react";
import Select from "react-select";

const CountrySelect = () => {

    const [countries, setCountries] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState({});

    const [addressData, setAddressData] = useState({
        address: "",
        postal_code: "",
        city: "",
        country: "",
    });
    const handleCountryChange = (e) => {
        const value = e.value;
        setSelectedCountry(e);
        setAddressData({ ...addressData, ["country"]: value });
    }

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
            });
    }, []);

    return (
        <div>
            <Select
                name="country"
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
            />
        </div>
    )
}
export default CountrySelect;
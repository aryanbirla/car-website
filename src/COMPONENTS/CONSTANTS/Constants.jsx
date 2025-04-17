import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faCarSide, faChair, faCarCrash, faBolt, faFan, faFileAlt, faStar } from '@fortawesome/free-solid-svg-icons';

export const statesAndUTs = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi",
    "Puducherry", "Ladakh", " Jammu & Kashmir"
];

export const sectionIcons = {
    "Engine & Transmission": faCogs,
    "Exterior & Tyres": faCarSide,
    "Electricals & Interiors": faChair,
    "Steering, Suspension & Brakes": faCarCrash,
    "Air Conditioning": faFan,
    "Other Details": faFileAlt,
};

export const sections = {
    "Exterior & Tyres": [
        "Pillar LHS B", "Apron LHS", "Apron RHS", "Apron LHS LEG", "Apron RHS LEG",
        "Firewall", "Cowl Top", "Upper Cross Member (Bonnet Patti)", "Lower Cross Member",
        "Radiator Support", "Head Light Support", "Windshield Front", "Grill",
        "Is the Car Waterlogged?", "RHS Front Tyre", "Roof", "Bonnet/Hood",
        "Dicky Door / Boot Door", "Boot Floor", "Quarter Panel LHS", "Quarter Panel RHS",
        "Fender LHS", "Fender RHS", "Pillar LHS A", "Pillar LHS C", "Pillar RHS C",
        "Pillar RHS B", "Pillar RHS A", "Running Border LHS", "Running Border RHS",
        "Door LHS Front", "Door LHS Rear", "Door RHS Front", "Door RHS Rear",
        "Windshield Rear", "Light LHS Headlight", "Light RHS Headlight",
        "Light LHS Taillight", "Light RHS Taillight", "Bumper Rear", "Bumper Front",
        "ORVM Manual / Electrical LHS", "ORVM Manual / Electrical RHS", "Tyre Spare Tyre",
        "LHS Front Tyre", "LHS Rear Tyre", "RHS Rear Tyre"
    ],
    "Engine & Transmission": [
        "Engine", "Exhaust Smoke", "Engine Mounting", "Clutch", "Gear Shifting",
        "Engine Oil Level Dipstik", "Battery", "Coolant", "Sump",
        "Engine Sound", "Engine Oil"
    ],
    "Electricals & Interiors": [
        "2 Power Windows", "Airbag Feature", "Music System", "ABS", "Electrical",
        "Interior", "No. Of Airbags", "Fabric Seat",
        "Parking Sensor", "No. Of Airbags 2", "No. Of Power Windows"
    ],
    "Steering, Suspension & Brakes": [
        "Steering", "Brake", "Suspension"
    ],
    "Air Conditioning": [
        "AC Cooling", "Heater"
    ],
    "Other Details": [
        "Chassis Embossing", "RC Availability", "Insurance Image", "Duplicate Key"
    ],
};

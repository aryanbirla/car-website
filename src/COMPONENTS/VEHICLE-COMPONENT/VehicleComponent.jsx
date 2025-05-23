import React, { useState, useEffect } from "react";
import { Button, Collapse, Form, Card, Row, Col } from "react-bootstrap";
import { FaApple, FaGooglePlay, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faCarSide, faChair, faCarCrash, faBolt, faFan, faFileAlt, faStar } from '@fortawesome/free-solid-svg-icons';

import * as html2pdf from "html2pdf.js";
import "./VehicleComponent.css";
import { statesAndUTs, sectionIcons, sections } from "../CONSTANTS/Constants"
// import { faCogs } from "@fortawesome/free-solid-svg-icons";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const App = () => {
    const [shouldGeneratePDF, setShouldGeneratePDF] = useState(false);

    const [fieldData, setFieldData] = useState(() =>
        Object.fromEntries(
            Object.entries(sections).flatMap(([sectionName, fields]) =>
                fields.map((field) => [field, { images: [], description: "" }])
            )
        )
    );

    const [ownershipDetails, setOwnershipDetails] = useState({
        ownerName: "",
        carName: "",
        carModel: "",
        carTransmission: "",
        variantName: "",
        fuelConsumption: "",
        blackListed: "",
        fitnessValidity: "",
        healthReportSummary: "",
        odometerReading: "",
        noOfChallans: "",
        insuranceValidity: "",
        insuranceType: "",
        estimatedKmsPerYear: "",
        pucValidity: "",
        registrationNumber: "",
        chassisNumber: "",
        engineNumber: "",
        ownershipType: "First",
        purchaseDate: "",
        stateOfRegistration: "",
        additionalCarImages: [],
    });

    const handleDefectChange = (field, value) => {
        setFieldData((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                defect: value,
            },
        }));
    };



    const [collapsedSections, setCollapsedSections] = useState(() =>
        Object.keys(sections).reduce((acc, section) => {
            acc[section] = true; // true means collapsed
            return acc;
        }, {})
    );

    const [previewPDF, setPreviewPDF] = useState(false);

    useEffect(() => {
        if (previewPDF && shouldGeneratePDF) {
            const timeout = setTimeout(() => {
                generatePDF();
                setShouldGeneratePDF(false); // Reset the flag
            }, 500); // Give time for DOM to paint

            return () => clearTimeout(timeout);
        }
    }, [previewPDF, shouldGeneratePDF]);
    const handleImageChange = (field, files) => {
        const fileList = Array.from(files);
        setFieldData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                images: [
                    ...prev[field].images,
                    ...fileList.map((file) => ({ file, desc: "" })),
                ],
            },
        }));
    };

    const handleImageDescriptionChange = (field, index, value) => {
        setFieldData((prev) => {
            const updatedImages = [...prev[field].images];
            updatedImages[index] = { ...updatedImages[index], desc: value };
            return {
                ...prev,
                [field]: {
                    ...prev[field],
                    images: updatedImages,
                },
            };
        });
    };

    const handleDescriptionChange = (field, value) => {
        setFieldData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                description: value,
            },
        }));
    };

    const handleDeleteImage = (field, index) => {
        setFieldData((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                images: prev[field].images.filter((_, i) => i !== index),
            },
        }));
    };

    const toggleSection = (section) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleOwnershipImageChange = (e) => {
        const files = Array.from(e.target.files);

        const imagesWithPreview = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setOwnershipDetails((prev) => ({
            ...prev,
            additionalCarImages: [...prev.additionalCarImages, ...imagesWithPreview],
        }));
    };





    const generatePDF = async () => {
        console.log("I am in the generatePDF");

        const element = document.getElementById("pdf-content");// Force visibility

        if (!element) {
            console.error("Element with id 'pdf-content' not found.");
            return;
        }

        console.log("Element found, generating PDF...");

        // Wait for any pending DOM updates
        await new Promise((resolve) => setTimeout(resolve, 500));

        const opt = {
            margin: 0.2,
            filename: `Vehicle-Inspection-Submission.pdf`, // Removed index
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                allowTaint: true,
            },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        // Ensure all images are fully loaded before PDF generation
        const images = element.querySelectorAll("img");
        await Promise.all(
            Array.from(images).map((img) =>
                img.complete
                    ? Promise.resolve()
                    : new Promise((resolve) => {
                        img.onload = img.onerror = resolve;
                    })
            )
        );

        // Generate PDF using html2pdf
        // html2pdf().set(opt).from(element).save();
        setTimeout(() => {
            html2pdf.default().set(opt).from(element).save();
        }, 1000);

    };

    // const generatePDF = async () => {
    //     console.log("I am in the generatePDF");

    //     const element = document.getElementById("pdf-content");
    //     element?.scrollIntoView();

    //     if (!element) {
    //         console.error("Element with id 'pdf-content' not found.");
    //         return;
    //     }

    //     console.log("Element found, generating PDF...");

    //     await new Promise((resolve) => setTimeout(resolve, 500));

    //     const opt = {
    //         margin: 0.2,
    //         filename: `Vehicle-Inspection-Submission.pdf`,
    //         image: { type: "jpeg", quality: 0.98 },
    //         html2canvas: {
    //             scale: 2,
    //             useCORS: true,
    //             allowTaint: true,
    //         },
    //         jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    //         pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    //     };

    //     const images = element.querySelectorAll("img");
    //     await Promise.all(
    //         Array.from(images).map((img) =>
    //             img.complete
    //                 ? Promise.resolve()
    //                 : new Promise((resolve) => {
    //                     img.onload = img.onerror = resolve;
    //                 })
    //         )
    //     );

    //     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    //     setTimeout(() => {
    //         html2pdf.default().set(opt).from(element).save();
    //     }, isIOS ? 1500 : 1000);
    // };



    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setOwnershipDetails((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    // OVERALL RATING CALCULATION 
    // Rating Calculation Logic (add inside your component before return)
    const totalFields = Object.values(sections).flat().length;

    const imperfectCount = Object.values(sections).flat().reduce((count, field) => {
        return count + (fieldData[field]?.images?.length > 0 ? 1 : 0);
    }, 0);

    const perfectCount = totalFields - imperfectCount;

    const overallRating = totalFields > 0
        ? parseFloat(((perfectCount / totalFields) * 5).toFixed(1))
        : 5;

    const ratingLabel =
        overallRating >= 4.5
            ? "Excellent"
            : overallRating >= 3.5
                ? "Neutral"
                : "Needs Attention";

    const ratingBadge =
        ratingLabel === "Excellent"
            ? "bg-success text-white"
            : ratingLabel === "Neutral"
                ? "bg-warning text-dark"
                : "bg-danger text-white";




    return (
        <div className="container-fluid px-3 px-md-5 py-4 bg-white min-vh-100">

            <h1 className="mb-4 text-center fw-bold">Vehicle Inspection Form</h1>

            {/* Ownership Details */}
            {!previewPDF && (
                <div className="no-print my-3">
                    <div
                        className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2 rounded mb-4"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ cursor: "pointer" }}
                    >
                        <h5 className="m-0">Ownership Details</h5>
                        <span>{isOpen ? "−" : "+"}</span>
                    </div>

                    {isOpen && (
                        <div className="row g-4">
                            {/* Owner Name */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Owner Name</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.ownerName}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, ownerName: e.target.value })
                                    }
                                />
                            </div>

                            {/* Car Name */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Car Name</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.carName}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, carName: e.target.value })
                                    }
                                />
                            </div>

                            {/* Car Model Year */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Car Model Year</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    value={ownershipDetails.carModel}
                                    onChange={(e) =>
                                        setOwnershipDetails({
                                            ...ownershipDetails,
                                            carModel: e.target.value
                                        })
                                    }

                                    placeholder="e.g., 2020"
                                />
                            </div>

                            {/* Variant Name */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Variant Name</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.variantName}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, variantName: e.target.value })
                                    }
                                />
                            </div>

                            {/* Fitness Validity */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Fitness Validity</label>
                                </div>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={ownershipDetails.fitnessValidity}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, fitnessValidity: e.target.value })
                                    }
                                />
                            </div>

                            {/* Odometer Reading */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Odometer Reading</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.odometerReading}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, odometerReading: e.target.value })
                                    }
                                />
                            </div>

                            {/* Kilometers / Year */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Kilometers / Year</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.estimatedKmsPerYear}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, estimatedKmsPerYear: e.target.value })
                                    }
                                />
                            </div>

                            {/* Blacklisted */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">BlackListed</label>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="blackListed"
                                            value="Yes"
                                            checked={ownershipDetails.blackListed === "Yes"}
                                            onChange={(e) =>
                                                setOwnershipDetails({ ...ownershipDetails, blackListed: e.target.value })
                                            }
                                        />
                                        <label className="form-check-label">Yes</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="blackListed"
                                            value="No"
                                            checked={ownershipDetails.blackListed === "No"}
                                            onChange={(e) =>
                                                setOwnershipDetails({ ...ownershipDetails, blackListed: e.target.value })
                                            }
                                        />
                                        <label className="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>

                            {/* No of Challans */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">No of Challans</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.noOfChallans}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, noOfChallans: e.target.value })
                                    }
                                />
                            </div>

                            {/* Car Transmission */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Car Transmission</label>
                                </div>
                                <select
                                    className="form-select"
                                    value={ownershipDetails.carTransmission}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, carTransmission: e.target.value })
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="MT">Manual Transmission</option>
                                    <option value="AT">Automatic Transmission</option>
                                    <option value="IMT">Intelligent Manual Transmission</option>
                                </select>
                            </div>

                            {/* Fuel Consumption */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Fuel Consumption</label>
                                </div>
                                <select
                                    className="form-select"
                                    value={ownershipDetails.fuelConsumption}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, fuelConsumption: e.target.value })
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="CNG">CNG</option>
                                    <option value="Electric">Electric</option>
                                </select>
                            </div>

                            {/* Insurance Validity */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Insurance Validity</label>
                                </div>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={ownershipDetails.insuranceValidity}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, insuranceValidity: e.target.value })
                                    }
                                />
                            </div>

                            {/* PUC Validity */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">PUC Validity</label>
                                </div>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={ownershipDetails.pucValidity}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, pucValidity: e.target.value })
                                    }
                                />
                            </div>

                            {/* Insurance Type */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Insurance Type</label>
                                </div>
                                <select
                                    className="form-select"
                                    value={ownershipDetails.insuranceType}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, insuranceType: e.target.value })
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="First">Third-Party Insurance</option>
                                    <option value="Second">Comprehensive Insurance</option>
                                    <option value="Third">Own Damage (OD) Insurance</option>
                                    <option value="Fourth">Zero Depreciation Insurance</option>
                                    <option value="Fifth">Personal Accident Cover</option>
                                </select>
                            </div>

                            {/* Registration Number */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Registration Number</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.registrationNumber}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, registrationNumber: e.target.value })
                                    }
                                />
                            </div>

                            {/* Chassis Number */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Chassis Number</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.chassisNumber}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, chassisNumber: e.target.value })
                                    }
                                />
                            </div>

                            {/* Engine Number */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Engine Number</label>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={ownershipDetails.engineNumber}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, engineNumber: e.target.value })
                                    }
                                />
                            </div>

                            {/* Ownership Type */}
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Ownership Type</label>
                                </div>
                                <select
                                    className="form-select"
                                    value={ownershipDetails.ownershipType}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, ownershipType: e.target.value })
                                    }
                                >
                                    <option value="">Select</option>
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                    <option value="Fourth">Fourth</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">Purchase Date</label>
                                </div>

                                <input
                                    type="date"
                                    className="form-control"
                                    value={ownershipDetails.purchaseDate}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, purchaseDate: e.target.value })
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <label className="form-label fw-bold">State of Registration</label>
                                </div>

                                <select
                                    className="form-control"
                                    value={ownershipDetails.stateOfRegistration}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, stateOfRegistration: e.target.value })
                                    }
                                >
                                    <option value="">Select State/UT</option>
                                    {statesAndUTs.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="col-md-6">
                                <div className="d-flex justify-content-start"> <label className="form-label fw-bold">Health Report Summary</label></div>

                                <input
                                    type="textarea"
                                    className="form-control"
                                    value={ownershipDetails.healthReportSummary}
                                    onChange={(e) =>
                                        setOwnershipDetails({ ...ownershipDetails, healthReportSummary: e.target.value })
                                    }
                                />
                            </div>


                            <div className="col-md-6 mb-3">
                                <div className="d-flex justify-content-start"><label className="form-label fw-bold">Car Front Image</label></div>

                                <input
                                    type="file"
                                    name="carFrontPhoto"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <div className="d-flex justify-content-start"><label className="form-label fw-bold">All Car Images</label></div>

                                <input
                                    type="file"
                                    name="additionalCarImages"
                                    accept="image/*"
                                    multiple
                                    // onChange={(e) => {
                                    //     // const files = Array.from(e.target.files);
                                    //     // setOwnershipDetails({
                                    //     //     ...ownershipDetails,
                                    //     //     additionalCarImages: files,
                                    //     // });
                                    //     onChange={handleOwnershipImageChange}
                                    // }}
                                    onChange={handleOwnershipImageChange}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}






            {/* Form Sections */}
            {!previewPDF &&
                Object.entries(sections).map(([sectionName, fields]) => (
                    <div key={sectionName} className="mb-4">
                        <div
                            className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2 rounded"
                            onClick={() => toggleSection(sectionName)}
                            style={{ cursor: "pointer" }}
                        >
                            <h5 className="m-0">{sectionName}</h5>
                            <span>{collapsedSections[sectionName] ? "+" : "−"}</span>
                        </div>

                        {!collapsedSections[sectionName] && (
                            <div className="row mt-2">
                                {fields.map((field) => (
                                    <div className="col-md-6" key={field}>
                                        <div className="card mb-3 shadow-sm">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-start">
                                                    <label className="form-label fw-bold">{field}</label>
                                                </div>

                                                {/* Is there any defect? radio button */}
                                                <div className="d-flex justify-content-start mb-2">
                                                    <label className="form-label">Is there any defect?</label>
                                                    <div className="form-check ms-3">
                                                        <input
                                                            type="radio"
                                                            name={`defect-${field}`}
                                                            value="yes"
                                                            className="form-check-input"
                                                            checked={fieldData[field].defect === "yes"}
                                                            onChange={() => handleDefectChange(field, "yes")}
                                                        />
                                                        <label className="form-check-label">Yes</label>
                                                    </div>
                                                    <div className="form-check ms-3">
                                                        <input
                                                            type="radio"
                                                            name={`defect-${field}`}
                                                            value="no"
                                                            className="form-check-input"
                                                            checked={fieldData[field].defect === "no"}
                                                            onChange={() => handleDefectChange(field, "no")}
                                                        />
                                                        <label className="form-check-label">No</label>
                                                    </div>
                                                </div>

                                                {/* Image upload button appears only if 'Yes' is selected */}
                                                {fieldData[field].defect === "yes" && (
                                                    <>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            className="form-control mb-2"
                                                            onChange={(e) =>
                                                                handleImageChange(field, e.target.files)
                                                            }
                                                        />
                                                    </>
                                                )}

                                                <textarea
                                                    className="form-control mb-2"
                                                    placeholder="Enter field description"
                                                    value={fieldData[field].description}
                                                    onChange={(e) =>
                                                        handleDescriptionChange(field, e.target.value)
                                                    }
                                                />

                                                {fieldData[field].images.map((img, idx) => (
                                                    <div key={idx} className="mb-2">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div
                                                                className="position-relative"
                                                                style={{ width: "80px", height: "80px" }}
                                                            >
                                                                <img
                                                                    src={URL.createObjectURL(img.file)}
                                                                    alt="preview"
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "cover",
                                                                        borderRadius: "5px",
                                                                        border: "1px solid #ccc",
                                                                    }}
                                                                    crossOrigin="anonymous"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn-close btn-sm position-absolute top-0 end-0"
                                                                    aria-label="Close"
                                                                    onClick={() => handleDeleteImage(field, idx)}
                                                                    style={{
                                                                        transform: "scale(0.7)",
                                                                        filter: "invert(25%) sepia(94%) saturate(6942%) hue-rotate(357deg) brightness(95%) contrast(100%)",
                                                                    }}
                                                                />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                placeholder="Image description"
                                                                className="form-control"
                                                                value={img.desc}
                                                                onChange={(e) =>
                                                                    handleImageDescriptionChange(
                                                                        field,
                                                                        idx,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}


            {/* Action Buttons */}
            <div className="text-center mb-4">
                {!previewPDF ? (
                    <>
                        <div className="container my-4">
                            <div className="row justify-content-center gy-2">
                                <div className="col-12 col-sm-6 col-md-auto d-grid">
                                    <button
                                        className="btn btn-outline-primary px-4"
                                        onClick={() => {
                                            console.log("Form Data:", ownershipDetails);
                                            setPreviewPDF(true);
                                        }}
                                    >
                                        Preview PDF
                                    </button>
                                </div>
                                <div className="col-12 col-sm-6 col-md-auto d-grid">
                                    <button
                                        className="btn btn-success px-4"
                                        onClick={() => {
                                            setPreviewPDF(true);
                                            setShouldGeneratePDF(true);
                                        }}
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>


                    </>
                ) : (
                    <button
                        className="btn btn-secondary px-4"
                        onClick={() => setPreviewPDF(false)}
                    >
                        Back to Form
                    </button>
                )}
            </div>




            {/* Preview PDF Section */}
            {previewPDF && (
                <div id="pdf-content">
                    {/* <h2 className="text-center">Vehicle Inspection Summary</h2> */}

                    <header className="d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start border-bottom pb-3 mb-4">
                        <img src="/logoCompany.png" alt="Car Invest" height={60} className="mb-2 mb-sm-0" crossOrigin="anonymous" />
                        <span className="text-muted small">Smart report 2.0 📄</span>
                    </header>


                    {/* Banner-page */}
                    <div className="page-break mb-5 p-3 p-md-4 border rounded shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
                        {/* Inspection Banner */}
                        <div className="p-3 p-md-4 bg-white rounded-4 border border-primary shadow-sm">
                            <div className="row align-items-center">
                                {/* Left Column: Text Info */}
                                <div className="col-12 col-md-6 mb-4 mb-md-0">
                                    <div className="d-flex flex-column justify-content-center h-100 text-center text-md-start">
                                        <h3 className="text-uppercase fw-bold text-primary mb-3">
                                            Comprehensive Car Inspection Report
                                        </h3>
                                        <p className="text-muted mb-1">
                                            ✔ Thorough inspection with <strong>140+ quality checks</strong>
                                        </p>
                                        <p className="text-muted mb-1">
                                            ✔ Precise insights from experienced technicians
                                        </p>
                                        <p className="text-muted mb-0">
                                            ✔ Trusted by over <strong>600,000 customers</strong>
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column: Image */}
                                <div className="col-12 col-md-6 text-center">
                                    <img
                                        src="/BANNER_POSTER.png"
                                        alt="Inspection Banner"
                                        className="img-fluid rounded-3"
                                        style={{ maxHeight: "300px", maxWidth: "100%", objectFit: "contain" }}
                                        crossOrigin="anonymous"
                                    />
                                </div>

                            </div>
                        </div>

                        <Card className="p-3 p-md-4 border border-primary rounded-4 shadow-sm my-4">
                            <Row className="align-items-center">
                                {/* Column 1: Plate + Car Info */}
                                <Col xs={12} md={6} className="mb-4 mb-md-0">
                                    <div className="text-uppercase text-muted small">IND</div>
                                    <div
                                        className="border border-primary rounded-3 px-3 px-md-4 py-2 d-inline-block mb-3 shadow-sm"
                                        style={{
                                            background: "linear-gradient(135deg, #e8f0ff 0%, #ffffff 100%)",
                                            fontFamily: "monospace",
                                            letterSpacing: "2px",
                                            fontSize: "1rem"
                                        }}
                                    >
                                        {ownershipDetails.registrationNumber || "DL 9C AQ1514"}
                                    </div>

                                    <h2 className="fw-bold mb-1 text-danger">
                                        {ownershipDetails.carName || "Maruti Suzuki Vitara Brezza"}
                                    </h2>
                                    <div className="text-muted small mb-2">
                                        {ownershipDetails.variantName || "LDI"} &nbsp;|&nbsp;
                                        {ownershipDetails.carModel} &nbsp;|&nbsp;
                                        {ownershipDetails.carTransmission === "AT" ? "Automatic" : "Manual"} &nbsp;|&nbsp;
                                        {ownershipDetails.fuelConsumption || "Diesel"}
                                    </div>
                                </Col>

                                {/* Column 2: Meta Info + Stats */}
                                <Col xs={12} md={6}>
                                    <div className="text-muted mb-3">
                                        <div><strong>Location:</strong> {ownershipDetails.stateOfRegistration || "New Delhi"}</div>
                                        <div><strong>Report Date:</strong> {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                                    </div>

                                    <Row className="text-center">
                                        <Col xs={4}>
                                            <h6 className="fw-bold text-primary mb-0">10M +</h6>
                                            <div className="small text-muted">Cars Inspected</div>
                                        </Col>
                                        <Col xs={4}>
                                            <h6 className="fw-bold text-primary mb-0">200 +</h6>
                                            <div className="small text-muted">Cities Present</div>
                                        </Col>
                                        <Col xs={4}>
                                            <h6 className="fw-bold text-primary mb-0">1M +</h6>
                                            <div className="small text-muted">Cars Sold</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </div>



                    {/* Ownership PDF Content - Hidden from UI but shown in PDF */}
                    <div className="p-4">
                        {/* Car Image + Car Info */}
                        <Row className="mb-4 g-3">
                            {/* Car Image */}
                            <Col xs={12} md={6}>
                                <Card className="border rounded-4 shadow-sm h-100 overflow-hidden">
                                    {ownershipDetails.carFrontPhoto ? (
                                        <img
                                            src={URL.createObjectURL(ownershipDetails.carFrontPhoto)}
                                            alt="Car Front"
                                            className="img-fluid w-100"
                                            style={{ objectFit: "cover", height: "100%" }}
                                            crossOrigin="anonymous"
                                        />
                                    ) : (
                                        <div className="text-center py-5">No Image Available</div>
                                    )}
                                </Card>
                            </Col>

                            {/* Car Details */}
                            <Col xs={12} md={6}>
                                <Card className="border rounded-4 shadow-sm h-100 p-4 bg-white">
                                    <h5 className="fw-bold">{ownershipDetails.carName || "—"}</h5>

                                    <div className="mb-3 text-muted small d-flex flex-wrap gap-2">
                                        <span>{ownershipDetails.variantName || "_"}</span>
                                        <span>{ownershipDetails.purchaseDate ? new Date(ownershipDetails.purchaseDate).getFullYear() : "—"}</span>
                                        <span>{ownershipDetails.carTransmission || "_"}</span>
                                        <span>{ownershipDetails.fuelConsumption || "_"}</span>
                                    </div>

                                    {/* Rating & Status */}
                                    <div className="d-flex align-items-center flex-wrap mb-3">
                                        <div className={`px-2 py-1 rounded me-2 fw-semibold small ${ratingBadge}`}>
                                            Overall Rating
                                        </div>
                                        <div className="fw-bold fs-5 me-2">{overallRating}/5</div>
                                        <span className="text-muted">{ratingLabel}</span>
                                    </div>

                                    {/* Odometer */}
                                    <div className="mb-3 d-flex align-items-center">
                                        <i className="bi bi-speedometer2 me-2 text-primary"></i>
                                        <span className="fw-semibold">{ownershipDetails.odometerReading || "—"} kms</span>
                                    </div>

                                    {/* Challan status */}
                                    <div>
                                        <span className="px-3 py-1 rounded-pill bg-light border border-success text-success small fw-semibold">
                                            ✅{ownershipDetails.noOfChallans} Challan on this vehicle
                                        </span>
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        {/* 3 Mini Info Cards */}
                        <Row className="mb-4 g-3">
                            <Col xs={12} md={4}>
                                <Card className="p-3 border border-primary rounded-4 shadow-sm h-100 bg-light">
                                    <div className="text-muted small">Insurance Validity</div>
                                    <div className="fs-5 fw-semibold text-primary">
                                        {ownershipDetails.ownershipType || "—"}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} md={4}>
                                <Card className="p-3 border border-primary rounded-4 shadow-sm h-100 bg-light">
                                    <div className="text-muted small">Odometer Reading</div>
                                    <div className="fs-5 fw-semibold text-primary">
                                        {ownershipDetails.odometerReading || "—"}
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={12} md={4}>
                                <Card className="p-3 border border-primary rounded-4 shadow-sm h-100 bg-light">
                                    <div className="text-muted small">Fuel Type</div>
                                    <div className="fs-5 fw-semibold text-primary">
                                        {ownershipDetails.fuelConsumption || "—"}
                                    </div>
                                </Card>
                            </Col>
                        </Row>

                        {/* Health Summary */}
                        <h5>Health Report Summary</h5>
                        <p>{ownershipDetails.healthReportSummary || "—"}</p>

                        {/* Ownership & Documentation */}
                        <h5 className="fw-bold mb-3">Ownership & Documentation</h5>
                        <Card className="p-4 border-0 shadow-sm rounded-4">
                            <Row className="mb-3">
                                <Col xs={12} md={6}><span className="fw-semibold">Owner:</span> {ownershipDetails.ownerName || "—"}</Col>
                                <Col xs={12} md={6}><span className="fw-semibold">Insurance validity & Type:</span> {ownershipDetails.insuranceValidity || "—"}</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={12} md={6}><span className="fw-semibold">Reg. State/RTD:</span> {ownershipDetails.stateOfRegistration || "—"}</Col>
                                <Col xs={12} md={6}><span className="fw-semibold">Estimated kms driven / yr:</span> {ownershipDetails.estimatedKmsPerYear || "—"}</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={12} md={6}>
                                    <span className="fw-semibold">Year purchased (1st owner):</span>{" "}
                                    {ownershipDetails.purchaseDate
                                        ? new Date(ownershipDetails.purchaseDate).getFullYear()
                                        : "—"}
                                </Col>
                                <Col xs={12} md={6}><span className="fw-semibold">PUC validity:</span> {ownershipDetails.pucValidity || "—"}</Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={12} md={6}><span className="fw-semibold">Type of owner:</span> {ownershipDetails.ownershipType || "—"}</Col>
                                <Col xs={12} md={6}><span className="fw-semibold">Hypothecation:</span> {ownershipDetails.hypothecation || "No"}</Col>
                            </Row>
                        </Card>
                    </div>


                    {/* Summary Page */}
                    <div className="container my-5 page-break p-4 bg-white border rounded shadow-sm">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                            <h2 className="text-primary fw-bold fs-3 mb-3 mb-md-0">
                                <i className="fas fa-thumbtack text-primary me-2"></i> Overall Summary
                            </h2>
                            <i className="fa-solid fa-car fa-2x text-primary"></i>
                        </div>

                        <p className="text-muted mb-4 fs-6">
                            This page summarizes the condition of each major section of the vehicle based on uploaded images and notes.
                        </p>

                        <div className="border-top">
                            {Object.entries(sections).map(([sectionTitle, fields], index) => {
                                const perfectCount = fields.filter(f => fieldData[f].images.length === 0).length;
                                const imperfectCount = fields.filter(f => fieldData[f].images.length > 0).length;
                                const total = perfectCount + imperfectCount;

                                const rating = total === 0 ? 5 : ((perfectCount / total) * 5).toFixed(1);
                                const numericRating = parseFloat(rating);
                                const status =
                                    numericRating >= 4.5 ? 'Excellent' :
                                        numericRating >= 3.5 ? 'Neutral' :
                                            'Needs Attention';

                                const statusBadge =
                                    status === 'Excellent' ? 'bg-success text-white' :
                                        status === 'Neutral' ? 'bg-warning text-dark' :
                                            'bg-danger text-white';

                                const description = status === 'Excellent'
                                    ? 'This section is in excellent condition.'
                                    : status === 'Neutral'
                                        ? 'Minor issues observed, mostly in good shape.'
                                        : 'Multiple issues reported; needs inspection.';

                                return (
                                    <div key={sectionTitle} className={`row py-4 border-top ${index === 0 ? 'border-0' : ''}`}>
                                        <div className="col-12 col-md-4 fw-semibold text-dark mb-2 mb-md-0 d-flex align-items-center">
                                            <FontAwesomeIcon
                                                icon={sectionIcons[sectionTitle] || faStar}
                                                className="text-primary me-2"
                                            />
                                            {sectionTitle}
                                        </div>

                                        <div className="col-12 col-md-4 text-muted small mb-2 mb-md-0">
                                            {description}
                                        </div>

                                        <div className="col-12 col-md-4 text-md-end">
                                            <div className="d-flex justify-content-start justify-content-md-end align-items-center flex-wrap gap-2">
                                                <span className="fw-bold">{rating}/5</span>
                                                <span className="text-warning">
                                                    {Array.from({ length: 5 }, (_, i) => (
                                                        <i key={i} className={`fas fa-star${i < Math.round(numericRating) ? '' : '-o'}`}></i>
                                                    ))}
                                                </span>
                                                <span className={`badge rounded-pill px-3 py-2 ${statusBadge}`}>
                                                    {status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    {/* All Images of the car */}
                    <div className="row g-4">
                        {ownershipDetails.additionalCarImages.map((img, index) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <div className="card h-100 shadow-sm">
                                    <div className="ratio ratio-4x3">
                                        <img
                                            src={img.preview}
                                            alt={`Image ${index + 1}`}
                                            className="card-img-top img-fluid"
                                            style={{ objectFit: "cover" }}
                                            crossOrigin="anonymous"
                                        />
                                    </div>

                                    <div className="card-body text-center">
                                        <p className="card-text text-truncate mb-2">
                                            {img.file?.name || `Image ${index + 1}`}
                                        </p>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => {
                                                const updatedImages = ownershipDetails.additionalCarImages.filter((_, i) => i !== index);
                                                setOwnershipDetails({
                                                    ...ownershipDetails,
                                                    additionalCarImages: updatedImages,
                                                });
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>







                    {/* Information Page */}
                    {Object.entries(sections).map(([sectionName, fields]) => {
                        const perfectCount = fields.filter(field => fieldData[field].images.length === 0).length;
                        const imperfectCount = fields.filter(field => fieldData[field].images.length > 0).length;

                        return (
                            <div key={sectionName} className="mb-4 border rounded page-break">
                                {/* Section Header */}
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center p-3 bg-primary text-white rounded-top">
                                    <div className="mb-2 mb-md-0">
                                        <h5 className="mb-1 d-flex align-items-center">
                                            <FontAwesomeIcon
                                                icon={sectionIcons[sectionName] || faStar}
                                                className="me-2"
                                            />
                                            {sectionName}
                                        </h5>
                                        <small>
                                            Perfect parts: {perfectCount} | Imperfect parts: {imperfectCount}
                                        </small>
                                    </div>
                                    <div className="fs-4">
                                        <i className="bi bi-tools"></i>
                                    </div>
                                </div>

                                {/* Responsive Table */}
                                <div className="table-responsive">
                                    <table className="table table-bordered m-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Parameters</th>
                                                <th className="text-center">Perfect</th>
                                                <th className="text-center">Imperfect</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((field) => {
                                                const isImperfect = fieldData[field].images.length > 0;
                                                return (
                                                    <tr key={field}>
                                                        <td>{field}</td>
                                                        <td className="text-center text-success">
                                                            {!isImperfect && <span className="fs-5">✓</span>}
                                                        </td>
                                                        <td className="text-center text-danger">
                                                            {isImperfect && <span className="fs-5">✗</span>}
                                                        </td>
                                                        <td>{fieldData[field].description}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Image Section */}
                                <div className="p-3" style={{ overflowX: "hidden" }}>

                                    <h6 className="fw-bold mb-3">{sectionName} defected parts:</h6>

                                    <div className="row">
                                        {fields.map((field) =>
                                            fieldData[field].images.map((img, idx) => (
                                                <div key={`${field}-${idx}`} className="col-6 col-sm-4 col-md-3 mb-4">
                                                    <div className="border p-2 rounded h-100">
                                                        <img
                                                            src={URL.createObjectURL(img.file)}
                                                            alt="img"
                                                            className="img-fluid w-100 mb-2"
                                                            style={{
                                                                height: "120px",
                                                                objectFit: "cover",
                                                                borderRadius: "4px",
                                                            }}
                                                            crossOrigin="anonymous"
                                                        />

                                                        <p className="mb-1 fw-bold">{field}</p>
                                                        <p style={{ whiteSpace: "pre-wrap", fontSize: "0.9rem" }}>{img.desc}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}


                    {/* THANK YOU PAGE */}
                    <div className="min-vh-100 bg-white text-dark py-5 px-2 px-md-4 font-sans page-break">
                        <div className="container">
                            {/* Header */}
                            <header className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom pb-3 mb-4 text-center text-md-start">
                                <img src="/logoCompany.png" alt="Car Invest" height={60} className="mb-3 mb-md-0" crossOrigin="anonymous" />
                                <span className="text-muted small">Smart report 2.0 📄</span>
                            </header>

                            {/* Thank You Section */}
                            <section className="mb-5 text-center text-md-start">
                                <h1 className="display-6 text-primary fw-bold mb-3">Thank you for choosing us!</h1>
                                <p className="lead">
                                    We truly appreciate your decision to prioritize the safety and maintenance of your vehicle.
                                    By opting for a thorough inspection, you're ensuring not only the longevity of your car
                                    but also peace of mind for you and your loved ones.
                                </p>
                                <p className="lead mt-3">
                                    Should you have any questions about the inspection report or need further assistance,
                                    please don’t hesitate to reach out. We’re here to help and ensure your vehicle remains in top condition.
                                    Thank you once again for your trust and patronage.
                                </p>
                            </section>

                            {/* Other Services */}
                            <section className="mb-5 text-center text-md-start">
                                <h2 className="h5 mb-3">Other services by <strong>CAR INVEST</strong></h2>
                                <ul className="list-unstyled">
                                    <li className="text-primary">CHALLAN →</li>
                                    <li className="text-primary">SERVICE HISTORY →</li>
                                    <li className="text-primary">PRE-DELIVERY INSPECTION →</li>
                                    <li className="text-primary">PERSONAL LOAN →</li>
                                </ul>
                            </section>

                            {/* Review & Ratings */}
                            <section className="bg-light rounded p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-5 text-center text-md-start">
                                <div>
                                    <h3 className="h6 fw-semibold mb-3">
                                        Buying, selling, and financing pre-owned cars is now easier than ever!
                                    </h3>
                                    <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-4 fw-semibold justify-content-center justify-content-md-start">
                                        <div>4.5 ★ (58,000+ Google)</div>
                                        <div>4.5 ★ (25K+ ONEBIDCAR app)</div>
                                        <div>4.5 ★ (16.5K+ Trustpilot)</div>
                                    </div>
                                </div>
                                <div className="d-flex gap-3 justify-content-center justify-content-md-end">
                                    <a href="#"><FaGooglePlay size={30} className="text-dark" /></a>
                                    <a href="#"><FaApple size={30} className="text-dark" /></a>
                                </div>
                            </section>

                            {/* Footer */}
                            <footer className="border-top pt-4 text-center text-muted small">
                                <h4 className="h6 fw-semibold mb-3 text-primary">Keep in touch</h4>
                                <div className="d-flex justify-content-center gap-3 mb-3 fs-5 text-dark">
                                    <a href="#"><FaFacebook /></a>
                                    <a href="#"><FaTwitter /></a>
                                    <a href="#"><FaInstagram /></a>
                                    <a href="#"><FaLinkedin /></a>
                                </div>
                                <p>care@onebidcar.com</p>
                                <p className="mt-4 mx-auto text-muted small" style={{ maxWidth: "600px" }}>
                                    Disclaimer: Service provided by CarTruth is conducted to the best of our ability and knowledge at the time of inspection...
                                    (Include your full disclaimer here as in the original image)
                                </p>
                            </footer>
                        </div>
                    </div>



                </div>
            )}
        </div>
    );
};

export default App;


import React from 'react'
import { useState } from 'react'
import { FiUpload } from "react-icons/fi"
import { useRef } from 'react'
import { apiConnector } from '../services/apiConnector'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const BASE_URL = "http://localhost:4000/routes"
export default function Form() {
    const {user}= useSelector((state)=>state.auth);
    const [data, setData] = useState({
        name: "",
        description: "",
        image_url: null,
        location: "",
        feature: ""
    })
    function clearData()
    {
        setData({
            name: "",
            description: "",
            image_url: null,
            location: "",
            feature: ""
        })
        setImageFile(null)
        setPreviewSource(null)
    }
    function addItemHandler() {
        if ( !data.name.length || !data.description.length || !data.feature.length) {
            toast.error("Please fill all the fields");
            return;
        }
       if( !data.image_url)
       {
        toast.error("Please upload an image first");
        return;
       }
        try {
            const toastId = toast.loading("Uploading Item to db...")
            const url = BASE_URL + "/additem";
            const response = apiConnector("POST", url, {
                name: data.name,
                description: data.description,
                image_url: data.image_url,
                location: data.location,
                feature: data.feature,
                user_id: user._id, 
                link: user.link
            });
            toast.dismiss(toastId);
            toast.success("Item is added");
            clearData();

        }
        catch (err) {
            console.log("error occured while uploading", err);
            toast.error("error occured while uploading")
        }
    }
    function changeHandler(event) {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    }

    async function handleFileUpload() {
        console.log("inside upload")
        const formData = new FormData()
        formData.append("itemPic", imageFile);
        const url = BASE_URL + "/addimg"
        // api call to the file
        try {
            setLoading(true)
            const toastId = toast.loading("Uploading...")
            const response = await apiConnector(
                "PUT",
                url,
                formData,
                {
                    "Content-Type": "multipart/form-data"
                }
            )
            setLoading(false);
            toast.dismiss(toastId)
            console.log("Response from the uplaoded img", response.data)
            setData((data) => ({ ...data, ["image_url"]: response.data.data }));
        }
        catch (err) {
            console.log("Image Upload Failed", err)
            toast.error("Image Upload Failed");
        }
    }
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)
    const fileInputRef = useRef(null)
    const handleClick = () => {
        fileInputRef.current.click()
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const [loading, setLoading] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }


    return (
        <div className='dark:bg-gray-900 min-h-[100vh] '>
            <div className='flex flex-col items-center justify-center min-h-[60vh]'>
                <form className="w-[100%] max-w-lg  bd p-6  lg:mt-12 ">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide lg:text-gray-200 text-xs font-bold mb-2"
                                htmlfor="grid-first-name"
                            >
                                Product Name
                            </label>
                            <input
                                className="appearance-none capitalize block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                name='name'
                                placeholder="Headsets , watch"
                                onChange={changeHandler}
                                value={data.name}
                            />
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide  lg:text-gray-200 text-xs font-bold mb-2"
                                htmlfor="grid-last-name"
                            >
                                Location
                            </label>
                            <input
                                className="appearance-none capitalize block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="D2,Seminal Hall"
                                onChange={changeHandler}
                                name='location'
                                value={data.location} 
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide lg:text-gray-200 text-xs font-bold mb-2"
                                htmlfor="grid-password"
                            >
                                Product Description
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password"
                                type="text"
                                placeholder="Details of the Product"
                                onChange={changeHandler}
                                name='description'
                                value={data.description} 

                            />
                            <p className="lg:text-gray-200 text-xs italic">
                                Keep it short and to the point
                            </p>
                            <label
                                className="block uppercase tracking-wide lg:text-gray-200 text-xs font-bold mb-2 mt-9"
                                htmlfor="grid-password"
                            
                            >
                                Some Unique Features
                            </label>
                            <input
                                className="appearance-none block capitalize w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password"
                                type="text"
                                placeholder="unique properties to idetify the owner"
                                onChange={changeHandler}
                                name='feature'
                                value={data.feature}
                            />
                            <div className='w-[100%] text-center'>
                                <label
                                    className=" text-left block uppercase tracking-wide lg:text-gray-200 text-xs font-bold mb-2 mt-9"
                                    htmlfor="iimg"
                                >
                                    Enter Picture of Product
                                </label>

                                <div className="flex flex-col text-white items-center gap-2">
                                    <div className='w-[100%]  bd'>
                                        <img src={previewSource ? previewSource : "https://imgs.search.brave.com/oaQEVON55oStFJiS6lb8lEDKx66N0PIxJoh5SO4lqaY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbGNpdGl6/ZW4ubGlmZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8xMC9w/aG90b19nYWxsZXJ5/LTEtNTk2eDIyNS5q/cGc"} alt="loading" />
                                    </div>
                                    <div className=' flex mt-12'>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                        <div className="cursor-pointer text-center capitalize text-[13px] px-4 py-3  w-[120px] font-bold rounded-lg bg-blue-700 hover:bg-blue-800" onClick={handleClick} >
                                            {imageFile ? "Change" : "Select"}
                                        </div>
                                        {!loading && <div className="text-center capitalize text-[13px] flex gap-2 cursor-pointer px-6 py-3  w-[120px]  rounded-lg text-richblack-200 bg-richblack-700" onClick={handleFileUpload}>
                                            <FiUpload className="text-lg text-richblack-300" />
                                            Upload
                                        </div>}
                                        {loading && <div className="text-center capitalize text-[13px] flex gap-2 cursor-pointer px-6 py-3  w-[120px]  rounded-lg text-richblack-200 bg-richblack-700">
                                            Uploading....
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100%] text-center'>
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-9 w-[90%]  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-auto " onClick={addItemHandler} >Add Item</button>
                            </div>

                        </div>

                    </div>

                </form>
            </div>
        </div>

    )
}

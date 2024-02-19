import { useState } from 'react'

import CloseRounded from "@mui/icons-material/CloseRounded"
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AddRounded from '@mui/icons-material/AddRounded';

const AddPostModal = ({setOpenAddPostModal}) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('')

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setSelectedImage(reader.result)
        }
        reader.readAsDataURL(file)
        }
    }

    const clearImage = () => {
        setSelectedImage(null)
        const imageInput = document.getElementById('imageInput')
        imageInput.value = ''
    }

    return (
        <div className="fixed top-0 left-0 p-3 h-screen w-screen z-20 text-white backdrop-blur-lg overflow">
            <div className="w-full h-full border border-dashed rounded-xl bg-custom-dark flex flex-col justify-between items-center overflow-hidden">
                <div className="add-post--header h-20 w-full flex justify-between items-center px-5">
                    <span className="text-3xl">Create a Post</span>
                    <span 
                        className="p-3 rounded-md bg-red-400 text-slate-900 cursor-pointer active:scale-105"
                        onClick={() => setOpenAddPostModal(false)}
                    ><CloseRounded/></span>
                </div>
                <div className="add-post--body h-[calc(100vh-184px)] w-full p-3 flex flex-col gap-3 mt-2">
                    <span className="pl-2 text-2xl">Add Photo:</span>
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <label htmlFor="imageInput">
                        <div className={`flex justify-center items-center border rounded-md ${(selectedImage === null) ? 'h-40' : 'h-fit'} overflow-hidden`}
                        >
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <span className='scale-150 active:scale-180'><AddRounded/></span>
                            )}
                        </div>
                    </label>
                    <span className='pl-2 text-2xl'>Add Caption:</span>
                    <input 
                        type="text" 
                        placeholder='e.g., Feeling lucky!'
                        className='p-2 rounded-md bg-transparent border focus:border-purple-700 outline-none focus:outline-none'
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    {
                        (selectedImage !== null) &&
                        <span 
                            className='pl-1 underline text-lg w-fit h-fit'
                            onClick={() => {clearImage(); setCaption('')}}
                        >Cancel changes</span>
                    }
                </div>
                <div className="add-post--footer h-20 w-full flex justify-center items-center">
                    <div className="w-4/5 py-3 rounded-lg text-xl flex justify-center items-center gap-5 bg-gradient-to-b from-pink-600 to-purple-700 cursor-pointer active:scale-105">
                        Send Post
                        <span className="-rotate-[30deg] -translate-y-1"><SendRoundedIcon/></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPostModal
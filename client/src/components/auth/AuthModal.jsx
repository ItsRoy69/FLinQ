import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./authmodal.css";
import formImg from '../../assets/login-img.png'
import { userModal } from "../../contexts/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
// import { showErrorToast, showSuccessToast } from "../../utils/ToastMessage";

const AuthModal = () => {
  const navigate = useNavigate();
  // const {
  //   isuserreg,
  //   setisuserreg,
  //   setopenauthmodal,
  //   isuser,
  //   isprofreg,
  //   setisprofreg,
  // } = userModal();

  const [creds, setcreds] = useState({
    email: "",
    password: "",
    address: "",
    phone: "",
    name: "",
    profession: "",
  });

  // useEffect(() => {
  //   if (isuser) {
  //     document.getElementById("userauthsub").style.flexDirection = "row";
  //   } else {
  //     document.getElementById("userauthsub").style.flexDirection =
  //       "row-reverse";
  //   }
  // });

  // const changeauthtype = () => {
  //   setisuserreg((prev) => !prev);
  //   setisprofreg((prev) => !prev);
  // };

  const handleChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/feed')
    // const { errors, isValid } = validateForm(creds, isuserreg, isprofreg);
    // if (!isValid) {
    //   setcreds({ ...creds, errors });
    //   Object.values(errors).forEach((error) => {
    //     showErrorToast(error);
    //   });
    // } else {
    //   if (!isuser) {
    //     if (isprofreg) {
    //       const response = await ProfRegister(creds);
    //       if (response.status === 201) {
    //         toast.success(response.data.message);
    //         changeauthtype();
    //       }
    //     } else {
    //       const response = await ProfLogin(creds);
    //       if (response.status === 201) {
    //         showSuccessToast(
    //           response.data.message,
    //           setopenauthmodal,
    //           setisprofreg,
    //           setisuserreg,
    //           navigate
    //         );
    //       }
    //     }
    //   } else {
    //     if (isuserreg) {
    //       // user register
    //       const response = await CustomerRegister(creds);
    //       if (response.status === 201) {
    //         toast.success(response.data.message);
    //         changeauthtype();
    //       }
    //     } else {
    //       // user login
    //       const response = await CustomerLogin(creds);
    //       if (response.status === 201) {
    //         showSuccessToast(
    //           response.data.message,
    //           setopenauthmodal,
    //           setisprofreg,
    //           setisuserreg,
    //           navigate
    //         );
    //       }
    //     }
    //   }
    // }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        closeButton={false}
      />

      <div className="userauth_main slide-in-from-right w-screen h-screen fixed top-0 left-0 p-2">
        <button
          className="userauth_crossbtn"
          onClick={() => {
            setopenauthmodal(false);
            setisprofreg(true);
            setisuserreg(true);
            document.body.classList.remove("fixed");
          }}
        >
          X
        </button>

        <div className="userauth_sub fixed top-0 -left-4 z-30 bg-white rounded-xl w-full h-screen mx-4 flex flex-col items-center p-2" id="userauthsub">
          <div className="userauth_imgdiv rounded-2xl  overflow-hidden w-3/5">
            <img className="h-full w-full" src={formImg} alt="" />
          </div>

          <div className="userauth_textdiv flex flex-col">
              <h1 className="flex items-center justify-center align-center text-2xl mt-3 ">Login as an User</h1>
            <div className="userauth_formdiv flex flex-col ">
              
                {/* <input
                  type="text"
                  className="form-control -mt-2  mb-2 h-10 p-1"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={creds.name}
                  name="name"
                />
              */}
              <input
                type="email"
                className="form-control mb-2 h-10 p-1"
                placeholder="Enter your email"
                onChange={handleChange}
                value={creds.email}
                name="email"
              />
             
                {/* <input
                  type="text"
                  className="form-control mb-2 p-1 h-10"
                  placeholder="Enter your phone no"
                  onChange={handleChange}
                  value={creds.phone}
                  name="phone"
                />
             
             
                  <select
                    className="form-select mb-2 p-1 h-10"
                    name="profession"
                    placeholder="Select profession"
                    id=""
                    required
                    value={creds.profession}
                    onChange={handleChange}
                  >
                    <option value="" disabled defaultValue>
                      Select profession
                    </option>
                    <option value="instructor">Instructor</option>
                    <option value="gynaecologist">Gynaecologist</option>
                    <option value="pharmacist">Pharmacist</option>
                  </select>
                
              
                <input
                  type="text"
                  className="form-control mb-2 p-1 h-10 "
                  placeholder="Enter your address"
                  onChange={handleChange}
                  value={creds.address}
                  name="address"
                /> */}
              
              <input
                type="password"
                className="form-control mb-2 p-1 h-10"
                placeholder="Enter your password"
                onChange={handleChange}
                value={creds.password}
                name="password"
              />
            </div>

            <div className="userauth_btndiv">
              <button
                className="btn mt-2  p-2 "
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;

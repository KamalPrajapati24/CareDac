import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/index";
import SignIn from "./pages/signin/index";
import ForgotPassword from "./pages/forgotpassword/index";
import OtpVerification from "./pages/otpverification/index";
import ResetPassword from "./pages/resetpassword/index";
import Example from "./pages/example/index";
import TermsandConditions from "./pages/termsandcondition/index";
import ChoosePatient from "./pages/choose-patient";
import PatientInfo from "./pages/patient-info";
import ServiceNeed from "./pages/service-need";
import PatientDetails from "./pages/patient-details";
import MemberDetails from "./pages/member-details";
import HomePage from "./pages/homepage";
import CaregiverProfile from "./pages/caregiver-profile";
import PublicLayout from "./Layout/index";
import AppointmentPage from "./pages/appointment";
import MakePayment from "./pages/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QynzNQP1oQVAW7AhlyvQQRqFDDJRcQWkefEMSPyTQo7XuM0wHnPrbCSnuDC3eWMeCLpjwBFvFX71LsQrqAJbkmN001J2vBoSH");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/caregiver-profile/:id" element={<CaregiverProfile />} />
          <Route path="/appointment" element={<AppointmentPage/>}/>
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <MakePayment />
              </Elements>
            }
          />
        </Route>

        <Route>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/Otpverification" element={<OtpVerification />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/example" element={<Example />} />
          <Route path="/termsandcondition" element={<TermsandConditions />} />
          <Route path="/choose-patient" element={<ChoosePatient />} />
          <Route path="/patient-info" element={<PatientInfo />} />
          <Route path="/service-need" element={<ServiceNeed />} />
          <Route path="/patient-details" element={<PatientDetails />} />
          <Route path="/member-details" element={<MemberDetails />} />
          
          
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

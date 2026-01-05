import React, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";

const Otpveriefy = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();



  const inputRefs = useRef([]);

  // 📩 Email tum register ke baad localStorage ya state me rakhoge
  const email = localStorage.getItem("email"); // example

  // ⏱ OTP resend timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔢 OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // ⬅️ Backspace handle
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ✅ VERIFY OTP API CALL
  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter a valid OTP");
      return;
    }
    const otpToken = localStorage.getItem("otpToken");
    try {
      setLoading(true);
      const BASEURL = import.meta.env.VITE_SERVER_URL;
      console.log(" the BASEURL is",BASEURL)
      // const res = await fetch(`${BASEURL}/api/otpverify`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     verifyuser : localStorage.getItem("otpToken"),
      //     otp: finalOtp,
      //   }),
      // });

      const res = await fetch(`${BASEURL}/api/otpverify`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${otpToken}`, // ✅ token ko header me bhejna
  },
  body: JSON.stringify({
    otp: finalOtp, // ✅ sirf OTP
  }),
});


      const data = await res.json();
      console.log(data);

    

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

     toast.success("OTP verified");
      // ✅ Redirect to login page
      navigate("/login");

    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const resendOtp = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setOtp(Array(6).fill(""));
      setTimer(60);
      inputRefs.current[0].focus();

      toast.success("OTP resent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verify OTP</h2>
      <p>Enter the 6-digit OTP sent to your email</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "45px",
              height: "45px",
              fontSize: "20px",
              textAlign: "center",
            }}
          />
        ))}
      </div>

      <br />

      <button onClick={verifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <br /><br />

      <button onClick={resendOtp} disabled={timer > 0}>
        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
      </button>
    </div>
  );
};

export default Otpveriefy;


import { LucideEyeOff, LucideEyeClosed, LucideLock, LucideUser, LucideMessageSquare, Loader2 } from 'lucide-react';
import { Mail } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom'; 
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { toast } from 'react-hot-toast';
const SignUpPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:""
  });

  const {signup,isSigningUp}=useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();

    const success=validateForm();
    if(success===true)signup(formData)
  }

  return (
    <div  className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center p-6 sm:p-12">
        {/* Logo */}
        <div className="w-full max-w-full space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center  group-hover:bg-primary/20 transition-colors">
            <LucideMessageSquare />

            </div>
            <h1 className="text-2xl font-bold mt-2 ">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>
        </div>
        </div>


      <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full mx-auto">


        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium ">Full Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none z-10 ">
              <LucideUser className="w-6 h-6 text-gray-500" />
            </div>
            <input
            type="text"
            className={`input input-bordered w-full pl-10`}
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
            ></input>
          </div>
        </div>



      <div className="form-control">
          <label className="label">
            <span className="label-text font-medium ">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Mail className="w-6 h-6 text-gray-500" />
            </div>
            <input
            type="email"
            className={`input input-bordered w-full pl-10`}
            placeholder="You@example.com"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            />
          </div>
        </div>



       <div className="form-control">
          <label className="label">
            <span className="label-text font-medium ">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0  pl-3 flex items-center pointer-events-none z-10">
              <LucideLock className="w-6 h-6 text-gray-500" />
            </div>
            <input
            type={showPassword ? "text" : "password"}
            className={`input input-bordered w-full pl-12`}
            placeholder="........."
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            ></input>
            <button type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={()=>setShowPassword(!showPassword)}>
              {showPassword?(
                <LucideEyeOff/>

                
              ):<LucideEyeClosed/>}
            </button>
          </div>
        </div>


              <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                {isSigningUp?(
                  <>
                  <Loader2 className="size-5 animate-spin"></Loader2>
                  Loading...
                  </>
                ):("Create Account"

                )}

              </button>

      </form>

                <div className="text-center">
                  <p className="text-base-content/60" >
                  Already have an account?{" "}
                  <Link to="/login" className="link link-primary">
                  Sign In
                  </Link>
                  </p>
                </div>

      </div>



      {/* right side */}


      <AuthImagePattern
      title="Join Our Community"
      subtitle="Connect with friends and the world around you on ChatApp."
      />

    </div>
  )
}

export default SignUpPage
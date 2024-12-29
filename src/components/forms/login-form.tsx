"use client"

import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from '@/schemas';
import {useRef, useState, useTransition } from 'react';
import * as z from "zod"
import { useRouter } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { login } from '@/actions/login';


const LoginForm = () => {
  
  const router = useRouter();
  
  const [isPending,startTransition] = useTransition();

  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [isLoading,setLoading] = useState<boolean>(false);
  const inpRef = useRef<HTMLDivElement | null>(null);


  const {handleSubmit, register, formState: {errors, isSubmitting}, reset} = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
        email: "",
        password: "",
    }
  });


  const onSubmit = async (values:z.infer<typeof LoginSchema>) => {

    setOpenSnackbar(false);

 
    startTransition(()=>{
        login(values)
            .then((data)=>{
                if(data?.error){
                    setOpenSnackbar(true);
                }
            })
            .catch(()=>setOpenSnackbar(true));
        }
    );
    
    setLoading(false);

  }

  const closeSnackbar = () => setOpenSnackbar(false);



  return (
    <>
        <div className="auth_form_wrapper">
            <div className="form_content">
                <div className="form_title">
                    <p>Log in</p>
                    <span>Enter your email and password</span>
                </div>
                <div className="form_inputs">
                    <form id="loginForm" className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="frm-input">
                            <span>Email</span>
                            <label htmlFor="email">
                                <input 
                                    type="text" 
                                    id="email" 
                                    placeholder={"Enter your email"} 
                                    className={`${errors.email && "inp-err-br"}`}
                                    {...register("email")}
                                />
                            </label>
                            {errors.email && errors.email.message && <p className="inp-err-mess">{errors.email.message}</p>}
                        </div>
                        <div className="frm-input" ref={inpRef}>
                            <span>Password</span>
                            <label htmlFor="password">
                                <input 
                                    type={`${showPassword ? "text": "password"}`} 
                                    id="password" 
                                    placeholder="Enter your password"
                                    className={`${errors.password && "inp-err-br"}`}
                                    {...register("password")}
                                />
                                <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword   
                                        ?<svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="#042759"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                            fill="#042759"
                                            d="M12 16.972c1.25 0 2.313-.437 3.188-1.312.875-.874 1.313-1.937 1.312-3.188 0-1.25-.437-2.312-1.312-3.187-.875-.874-1.937-1.312-3.188-1.313-1.25 0-2.312.438-3.187 1.313-.875.876-1.312 1.938-1.313 3.187 0 1.25.438 2.313 1.313 3.188.875.876 1.938 1.313 3.187 1.312zm0-1.8c-.75 0-1.387-.262-1.912-.788a2.609 2.609 0 01-.788-1.912c0-.75.263-1.387.788-1.912A2.609 2.609 0 0112 9.772c.75 0 1.388.263 1.913.788a2.6 2.6 0 01.787 1.912c0 .75-.262 1.388-.787 1.913a2.6 2.6 0 01-1.913.787zm0 4.8c-2.233 0-4.271-.6-6.113-1.8-1.842-1.2-3.296-2.783-4.362-4.75a1.952 1.952 0 01-.187-1.438c.042-.158.104-.312.187-.462 1.067-1.966 2.52-3.55 4.363-4.75 1.842-1.2 3.88-1.8 6.112-1.8 2.233 0 4.27.6 6.113 1.8 1.842 1.2 3.296 2.784 4.362 4.75.083.15.146.305.188.463a1.93 1.93 0 01-.188 1.437c-1.067 1.967-2.52 3.55-4.362 4.75-1.841 1.2-3.88 1.8-6.113 1.8zm0-2a9.55 9.55 0 005.188-1.487 9.76 9.76 0 003.612-4.013 9.768 9.768 0 00-3.613-4.012A9.554 9.554 0 0012 6.972 9.54 9.54 0 006.813 8.46 9.786 9.786 0 003.2 12.472a9.775 9.775 0 003.613 4.013A9.537 9.537 0 0012 17.972z"
                                            ></path>
                                        </svg>
                                        :<svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="#042759"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="#042759"
                                                d="M16.1 12.6l-1.45-1.45c.15-.784-.075-1.517-.675-2.2-.6-.684-1.375-.95-2.325-.8L10.2 6.7a4.24 4.24 0 01.863-.3c.292-.067.604-.1.937-.1 1.25 0 2.313.437 3.188 1.313.875.875 1.313 1.937 1.312 3.187 0 .333-.033.646-.1.938-.067.292-.167.579-.3.862zm3.2 3.15l-1.45-1.4a10.98 10.98 0 001.688-1.587A8.84 8.84 0 0020.8 10.8c-.833-1.684-2.03-3.021-3.588-4.012C15.653 5.796 13.916 5.3 12 5.3c-.483 0-.958.033-1.425.1a9.625 9.625 0 00-1.375.3L7.65 4.15a11.107 11.107 0 012.1-.638A11.505 11.505 0 0112 3.3c2.517 0 4.758.695 6.725 2.087C20.692 6.777 22.117 8.582 23 10.8a11.696 11.696 0 01-1.513 2.738A11.002 11.002 0 0119.3 15.75zm.5 6.15l-4.2-4.15c-.583.183-1.17.32-1.762.413-.591.092-1.204.137-1.838.137-2.517 0-4.758-.696-6.725-2.087C3.308 14.82 1.883 13.017 1 10.8c.35-.884.792-1.705 1.325-2.463A11.475 11.475 0 014.15 6.3L1.4 3.5l1.4-1.4 18.4 18.4-1.4 1.4zM5.55 7.7c-.483.433-.925.908-1.325 1.425A9.015 9.015 0 003.2 10.8c.833 1.683 2.03 3.02 3.588 4.013C8.347 15.805 10.084 16.3 12 16.3c.333 0 .658-.021.975-.062.317-.042.642-.088.975-.138l-.9-.95c-.183.05-.358.087-.525.113A3.41 3.41 0 0112 15.3c-1.25 0-2.313-.438-3.188-1.312-.875-.875-1.313-1.938-1.312-3.188 0-.184.013-.359.038-.525.025-.167.063-.342.112-.525L5.55 7.7z"
                                            ></path>
                                        </svg>
                                    }
                                </span>
                            </label>
                            {errors.password && errors.password.message && <p className="inp-err-mess">{errors.password.message}</p>}
                        </div>
                    </form>
                    <div className="form-approve">
                        <button 
                            type="submit" 
                            form="loginForm"
                            disabled={isPending}
                        >
                            {!isPending
                                ?"Log in"
                                :<CircularProgress size={20} style={{color: "#fff"}} />
                            }
                        </button>
                        <div className="have-account">
                            <p>Don't have an account?</p>
                            <Link href={"/signup"}>Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Snackbar 
            open={openSnackbar} 
            autoHideDuration={4000} 
            onClose={closeSnackbar}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}
            key={"topcenter"}
            style={{width: inpRef.current ? inpRef.current.offsetWidth : 'auto',top:"27%"}}
        >
            <Alert
                onClose={closeSnackbar}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
                style={{fontSize:".825rem"}}
            >
                Invalid login credentials. Please try again.
            </Alert>
        </Snackbar>
    </>
  )
}

export default LoginForm
"use client";

import styles from "./layout.module.css";
import "../../styles/global.css";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../atoms/atoms";

type Inputs = {
  email: string;
  password: string;
};

async function login(email, password) {
  const data = await fetch("https://junggo-server.run.goorm.app/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (data.status == 401) {
    console.log("unauthorized");
    return 401;
  }
  const json = await data.json();
  return json;
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [internalServerError, setInternalServerError] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [token, setToken] = useRecoilState(tokenAtom);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const jwt = await login(email, password);
    console.log(jwt);
    if (jwt == 401) {
      setToken(null);
      setUnauthorized(true);
    } else if (jwt == 404) {
      setToken(null);
      setInternalServerError(true);
    } else {
      setToken(jwt);
      router.push("/");
    }
  };

  return (
    <section>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
      {internalServerError ? (
        <p className="error">We have a little problem.</p>
      ) : unauthorized ? (
        <p className="error">Your email address and password are incorrect.</p>
      ) : errors.email ? (
        <p className="error">It is not an email format.</p>
      ) : errors.password ? (
        <p className="error">Your password is required.</p>
      ) : null}
      <Link href={"/signup"} className={styles.title}>
        <div>Sign Up</div>
      </Link>
    </section>
  );
}

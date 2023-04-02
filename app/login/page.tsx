"use client";

import styles from "./layout.module.css";
import "../../styles/global.css";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const json = await data.json();
  return json?.posts as any[];
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    login(email, password);
  };

  return (
    <section>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email", { required: true })} />
        <input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <input type="submit" />
      </form>
    </section>
  );
}

import Link from "next/link";
import styles from "./Header.module.css";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../atoms/atoms";

export default function Header() {
  const router = useRouter();
  const jwt = localStorage.jwt ? JSON.parse(localStorage.jwt) : null;
  const [token, setToken] = useRecoilState(tokenAtom);

  const logout = () => {
    setToken(null);
    router.refresh();
  };

  return (
    <div className={styles.header_container}>
      <Link className={styles.homeBtn} href={"/"}>
        Home
      </Link>
      {!token ? (
        <Link href={"/login"} className={styles.title}>
          <div>Log In</div>
        </Link>
      ) : (
        <button onClick={logout}>
          <div>Sign Out</div>
        </button>
      )}
    </div>
  );
}

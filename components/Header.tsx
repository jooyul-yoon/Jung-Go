import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header_container}>
      <Link className={styles.homeBtn} href={"/"}>
        Home
      </Link>
      <Link href={"/login"} className={styles.title}>
        <div>Log In</div>
      </Link>
      <Link href={"/signup"} className={styles.title}>
        <div>Sign Up</div>
      </Link>
    </div>
  );
}

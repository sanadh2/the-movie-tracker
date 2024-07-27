import styles from "../css/Loader.module.css";
export default function Loading() {
  return (
    <div className="min-h-[80dvh] flex justify-center items-center">
      <div className={styles.loader + " border dark:border-white"} />
    </div>
  );
}

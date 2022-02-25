import styles from './index.less';

export default function Index(props) {

  return (
    <>
      <h1 className={styles.title}>
        {props.children}
        hello
      </h1>
    </>
  );
}

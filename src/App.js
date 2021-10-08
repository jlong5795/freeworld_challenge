import StudentTable from "./components/StudentTable";
import Header from "./components/Header";

import styles from "./styles/App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <StudentTable />
    </div>
  );
}

export default App;

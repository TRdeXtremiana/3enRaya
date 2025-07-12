import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";
import styles from "./components/App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Game />
      </main>
      <Footer />
    </div>
  );
}

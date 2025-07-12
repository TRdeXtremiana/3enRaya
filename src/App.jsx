import Header from "./components/Header";
import Game from "./components/Game";
import Footer from "./components/Footer";

import './index.css'; // CSS global (html, body, etc.)
import styles from './App.module.css'; // CSS modular para App

export default function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

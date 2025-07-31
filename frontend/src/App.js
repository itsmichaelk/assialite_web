import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Story from "./components/Story";
import Bonus from "./components/Bonus";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <section id="benefits">
        <Benefits />
      </section>
      <section id="story">
        <Story />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <Bonus />
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
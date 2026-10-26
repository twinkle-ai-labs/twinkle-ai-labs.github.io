"use client";
import HomeHero from "./HomeHero";
import HomeCollection from "./HomeCollection";
import HomeStudio from "./HomeStudio";
import HomeDesign from "./HomeDesign";
import HomeContact from "./HomeContact";
import s from "./AuroraHome.module.css";

export default function AuroraHome() {
  return (
    <div className={s.home}>
      <HomeHero />
      <HomeCollection />
      <HomeStudio />
      <HomeDesign />
      <HomeContact />
    </div>
  );
}

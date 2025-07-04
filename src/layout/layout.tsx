import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import React from "react";

type Props = {
  children: React.ReactNode;
  showHero?: Boolean;
};

export default function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}

      <div className="container mx-auto flex-1 py-10 px-2 md:px-4">{children}</div>
      <Footer />
    </div>
  );
}

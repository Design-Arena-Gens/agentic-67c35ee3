"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo } from "react";

type StoryBeat = {
  id: string;
  title: string;
  description: string;
  highlight: string;
};

const storyBeats: StoryBeat[] = [
  {
    id: "thar",
    title: "तपता राजस्थान",
    description:
      "राजस्थान की गर्म तपती दोपहर थी। आसमान से धूप बरस रही थी और चारों तरफ सुनहरी रेत फैली थी।",
    highlight:
      "दादी को हमेशा से ठंड पसंद थी। उन्होंने मन ही मन ठान लिया— क्यों न इन रेत के बीच कुछ अनोखा किया जाए?"
  },
  {
    id: "magic-ice",
    title: "जादुई बर्फ़ की तलाश",
    description:
      "दादी मैदान में पहुँचीं और अपने जादुई मटके से ठंडी-ठंडी बर्फ़ निकालने लगीं। हर पिघलती बूंद आस-पास की गरमी को ठंडा कर रही थी।",
    highlight:
      "बर्फ़ को गेंदों में बदलते हुए दादी की कलाइयाँ थक गईं, लेकिन उम्मीद अभी बाकी थी।"
  },
  {
    id: "monkey",
    title: "शरारती दोस्त",
    description:
      "पास के पेड़ से एक शरारती बंदर फुदक कर नीचे आया। उसके कदमों से रेत उछलती रही और आँखों में चमक थी।",
    highlight:
      "“दादी, मैं मदद करूँ?” — बंदर ने मुस्कराकर पूछा। दादी ने हँसते हुए उसकी मदद स्वीकार कर ली।"
  },
  {
    id: "palace",
    title: "बर्फ़ का महल",
    description:
      "दादी और बंदर ने मिलकर गोल-गोल बर्फ़ के ब्लॉक बनाए और उन्हें जोड़कर एक सुंदर सफेद महल खड़ा कर दिया।",
    highlight:
      "दरवाज़े पर दादी ने बर्फ़ की रंगोली बनाई और बंदर ने अपनी पूँछ से छत साफ की। महल पूरा राजसी लग रहा था!"
  },
  {
    id: "evening",
    title: "ठंडी शाम",
    description:
      "शाम होते-होते रेगिस्तान की गरमी कम हो गई। दोनों ने बर्फ़ के घर में बैठकर छाछ पी और ठंडक महसूस की।",
    highlight:
      "राजस्थान की गरमी के बीच यह ठंडा घर उनके दोस्ती और कल्पना की जीत थी।"
  }
];

function useParallax(offset = 0) {
  const cursor = useMotionValue(0);
  const spring = useSpring(cursor, { damping: 30, stiffness: 200 });
  const y = useTransform(spring, (value) => value * -0.15 + offset);
  return { cursor, y };
}

export default function Page() {
  const iceLayer = useParallax(0);
  const duneLayer = useParallax(20);
  const cloudLayer = useParallax(-10);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const offset = event.clientY - window.innerHeight / 2;
      iceLayer.cursor.set(offset);
      duneLayer.cursor.set(offset);
      cloudLayer.cursor.set(offset);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [iceLayer.cursor, duneLayer.cursor, cloudLayer.cursor]);

  const shimmerVariants = useMemo(
    () => ({
      initial: { opacity: 0.4, y: 0 },
      animate: {
        opacity: [0.4, 1, 0.4],
        y: [-5, 0, -5],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }),
    []
  );

  return (
    <main className="page">
      <section className="hero">
        <motion.div className="sun" variants={shimmerVariants} initial="initial" animate="animate" />
        <motion.div className="cloud cloud-left" style={{ y: cloudLayer.y }} />
        <motion.div className="cloud cloud-right" style={{ y: cloudLayer.y }} />
        <motion.div className="dune dune-back" style={{ y: duneLayer.y }} />
        <motion.div className="dune dune-front" style={{ y: duneLayer.y }} />
        <motion.div className="ice-platform" style={{ y: iceLayer.y }}>
          <motion.div className="ice-palace" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div className="palace-tower tower-left" />
            <div className="palace-tower tower-right" />
            <div className="palace-body">
              <div className="palace-door" />
              <div className="palace-rangoli">
                <div className="floret" />
                <div className="floret" />
                <div className="floret" />
                <div className="floret" />
              </div>
            </div>
            <div className="palace-flag" />
          </motion.div>
          <motion.div
            className="character dadi"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="face" />
            <div className="dress" />
            <div className="hands" />
          </motion.div>
          <motion.div
            className="character monkey"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="face" />
            <div className="belly" />
            <div className="tail" />
          </motion.div>
        </motion.div>
        <header className="intro">
          <span className="tag">AI CARTOON TALE</span>
          <h1 className="display">राजस्थान में बर्फ़ का महल</h1>
          <p>
            एक दादी और उनके नए बंदर दोस्त ने रेगिस्तान की तपिश में ठंडी कल्पना से जादुई दुनिया बना
            दी। नीचे स्क्रॉल करके कहानी का अनुभव करें।
          </p>
        </header>
      </section>

      <section className="story">
        {storyBeats.map((beat, index) => (
          <motion.article
            key={beat.id}
            className="story-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
          >
            <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
            <h2>{beat.title}</h2>
            <p>{beat.description}</p>
            <p className="highlight">{beat.highlight}</p>
            <div className="sparkles">
              <motion.span
                className="sparkle"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
              />
              <motion.span
                className="sparkle"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.3 + 0.5 }}
              />
            </div>
          </motion.article>
        ))}
      </section>

      <section className="closing">
        <motion.div
          className="closing-card"
          initial={{ scale: 0.92, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>बर्फ़ीली प्रेरणा</h2>
          <p>
            यह कहानी दोस्ती, कल्पना और सहयोग की ठंडी हवा लेकर आती है। राजस्थान की धूप में भी सपनों को
            जमाया जा सकता है— बस दिल में ठंडक और साथ में एक शरारती दोस्त होना चाहिए।
          </p>
          <div className="cta">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="cta-button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              फिर से शुरुआत करें
            </motion.button>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Rajasthan Ice Palace Tale</p>
      </footer>

      <style jsx>{`
        .page {
          min-height: 100vh;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: grid;
          place-items: center;
          text-align: center;
          overflow: hidden;
          padding: 4rem 1.25rem 3rem;
        }

        .intro {
          position: relative;
          max-width: 680px;
          padding-top: 12rem;
        }

        .tag {
          display: inline-block;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .display {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin: 1rem 0;
          color: #1f3b50;
        }

        .intro p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(47, 39, 51, 0.9);
        }

        .sun {
          position: absolute;
          top: 8%;
          right: 18%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle at 30% 30%, #ffeab2, #ffbc6b 60%, rgba(255, 188, 107, 0));
          border-radius: 50%;
          filter: blur(0.2px);
        }

        .cloud {
          position: absolute;
          width: 260px;
          height: 120px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          filter: blur(1px);
        }

        .cloud::after,
        .cloud::before {
          content: "";
          position: absolute;
          background: inherit;
          border-radius: inherit;
        }

        .cloud::before {
          width: 160px;
          height: 100px;
          top: -40px;
          left: 30px;
        }

        .cloud::after {
          width: 140px;
          height: 80px;
          top: -20px;
          right: 30px;
        }

        .cloud-left {
          top: 18%;
          left: 12%;
        }

        .cloud-right {
          top: 24%;
          right: 8%;
        }

        .dune {
          position: absolute;
          width: 140%;
          height: 320px;
          border-radius: 50%;
          filter: blur(0.8px);
          left: 50%;
          transform: translateX(-50%);
        }

        .dune-back {
          bottom: -180px;
          background: radial-gradient(circle at top, rgba(241, 194, 125, 0.5), rgba(233, 170, 92, 0));
        }

        .dune-front {
          bottom: -220px;
          background: radial-gradient(circle at top, rgba(233, 170, 92, 0.8), rgba(197, 133, 62, 0));
        }

        .ice-platform {
          position: absolute;
          bottom: 8%;
          display: grid;
          place-items: center;
          padding: 2rem 3rem 3rem;
          border-radius: 40px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(149, 200, 246, 0.7));
          box-shadow: 0 30px 60px rgba(73, 130, 198, 0.35);
        }

        .ice-palace {
          position: relative;
          width: 320px;
          height: 240px;
          background: linear-gradient(160deg, rgba(204, 236, 255, 0.9), rgba(138, 190, 255, 0.9));
          border-radius: 40% 40% 20% 20%;
          display: grid;
          place-items: center;
          animation: floaty 6s ease-in-out infinite;
        }

        .palace-tower {
          position: absolute;
          bottom: 60px;
          width: 70px;
          height: 160px;
          background: linear-gradient(160deg, rgba(204, 236, 255, 0.8), rgba(138, 190, 255, 0.8));
          border-radius: 40px;
        }

        .tower-left {
          left: -20px;
        }

        .tower-right {
          right: -20px;
        }

        .palace-body {
          position: absolute;
          bottom: 0;
          width: 240px;
          height: 160px;
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(149, 200, 246, 0.95));
          border-radius: 30px 30px 20px 20px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 1.8rem;
        }

        .palace-door {
          width: 70px;
          height: 90px;
          background: linear-gradient(180deg, rgba(122, 189, 252, 0.9), rgba(28, 111, 216, 0.8));
          border-radius: 999px 999px 20px 20px;
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.7);
        }

        .palace-rangoli {
          position: absolute;
          bottom: -26px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(149, 200, 246, 0.9), rgba(255, 255, 255, 0.2));
          display: grid;
          place-items: center;
          gap: 0.2rem;
        }

        .floret {
          width: 24px;
          height: 24px;
          border-radius: 40% 40% 50% 50%;
          background: var(--accent-sunset);
          opacity: 0.85;
          animation: twinkle 4s ease-in-out infinite;
        }

        .palace-flag {
          position: absolute;
          top: -56px;
          width: 10px;
          height: 80px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(149, 200, 246, 0.8));
          border-radius: 999px;
        }

        .palace-flag::after {
          content: "";
          position: absolute;
          top: 0;
          left: 100%;
          width: 70px;
          height: 40px;
          background: linear-gradient(90deg, rgba(255, 197, 143, 0.95), rgba(149, 200, 246, 0.9));
          clip-path: polygon(0 0, 100% 0, 80% 50%, 100% 100%, 0 100%);
          animation: floaty 5s ease-in-out infinite;
        }

        .character {
          position: absolute;
          bottom: -10px;
          width: 120px;
          display: grid;
          place-items: center;
        }

        .character .face {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #ffe3c2;
          box-shadow: inset -8px -10px 0 rgba(255, 200, 150, 0.6);
        }

        .dadi {
          left: -120px;
        }

        .dadi .dress {
          width: 90px;
          height: 110px;
          margin-top: -10px;
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(149, 200, 246, 0.9));
          border-radius: 50% 50% 32% 32%;
          box-shadow: 0 10px 24px rgba(28, 111, 216, 0.25);
        }

        .dadi .hands {
          position: absolute;
          bottom: 24px;
          width: 70px;
          height: 30px;
          background: rgba(255, 226, 194, 0.9);
          border-radius: 999px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .monkey {
          right: -120px;
        }

        .monkey .face {
          background: #f4c08d;
          box-shadow: inset -8px -10px 0 rgba(191, 110, 60, 0.5);
        }

        .monkey .belly {
          width: 80px;
          height: 100px;
          margin-top: -6px;
          background: linear-gradient(160deg, rgba(191, 110, 60, 0.9), rgba(243, 194, 149, 0.9));
          border-radius: 50% 50% 30% 30%;
          box-shadow: 0 10px 24px rgba(191, 110, 60, 0.3);
        }

        .monkey .tail {
          position: absolute;
          bottom: 20px;
          right: -50px;
          width: 120px;
          height: 120px;
          border: 16px solid rgba(191, 110, 60, 0.9);
          border-left-color: transparent;
          border-top-color: transparent;
          border-radius: 50%;
          transform: rotate(30deg);
          animation: floaty 5s ease-in-out infinite;
        }

        .story {
          padding: 6rem 1.5rem;
          display: grid;
          gap: 2rem;
          max-width: 960px;
          margin: 0 auto;
        }

        .story-card {
          position: relative;
          padding: 2.5rem 2rem;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.85);
          box-shadow: 0 24px 50px rgba(68, 109, 163, 0.15);
          text-align: left;
          overflow: hidden;
        }

        .card-number {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          font-size: 3.5rem;
          font-weight: 700;
          color: rgba(149, 200, 246, 0.3);
        }

        .story-card h2 {
          margin: 0;
          font-size: 1.8rem;
          color: #1f3b50;
        }

        .story-card p {
          margin: 1rem 0 0;
          line-height: 1.7;
          font-size: 1.05rem;
        }

        .highlight {
          margin-top: 1.2rem;
          padding: 1rem 1.2rem;
          border-radius: 16px;
          background: rgba(149, 200, 246, 0.2);
          border: 1px solid rgba(149, 200, 246, 0.45);
          font-weight: 600;
          color: #21507a;
        }

        .sparkles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          width: 16px;
          height: 16px;
          top: 18%;
          right: 16%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(149, 200, 246, 0));
          border-radius: 50%;
        }

        .sparkle + .sparkle {
          top: auto;
          bottom: 18%;
          right: 30%;
        }

        .closing {
          padding: 4rem 1.5rem 6rem;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(149, 200, 246, 0.3));
        }

        .closing-card {
          max-width: 720px;
          padding: 3rem;
          border-radius: 32px;
          text-align: center;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 24px 60px rgba(68, 109, 163, 0.2);
        }

        .closing-card h2 {
          margin: 0;
          font-size: 2.2rem;
          color: #1f3b50;
        }

        .closing-card p {
          margin-top: 1rem;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .cta {
          margin-top: 2.5rem;
        }

        .cta-button {
          padding: 0.9rem 2.6rem;
          border-radius: 999px;
          border: none;
          background: linear-gradient(135deg, rgba(149, 200, 246, 1), rgba(255, 141, 106, 0.9));
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          box-shadow: 0 16px 30px rgba(68, 109, 163, 0.3);
        }

        .cta-button:focus-visible {
          outline: 3px solid rgba(255, 141, 106, 0.6);
          outline-offset: 4px;
        }

        .footer {
          padding: 2rem 1rem 3rem;
          text-align: center;
          font-size: 0.9rem;
          color: rgba(47, 39, 51, 0.7);
        }

        @media (max-width: 960px) {
          .ice-platform {
            transform: scale(0.8);
            padding: 1.5rem 2rem;
          }
        }

        @media (max-width: 720px) {
          .hero {
            padding: 3rem 1rem 4rem;
          }

          .intro {
            padding-top: 14rem;
          }

          .ice-platform {
            position: relative;
            bottom: auto;
            margin-top: 4rem;
            transform: scale(0.9);
          }

          .character {
            display: none;
          }

          .story-card {
            padding: 2rem 1.6rem;
          }

          .card-number {
            font-size: 2.8rem;
          }
        }
      `}</style>
    </main>
  );
}

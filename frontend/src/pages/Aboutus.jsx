import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users,
  Heart,
  ShieldCheck,
  Zap,
  Globe,
  MessageCircle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'
import Styles from './Aboutus.module.css'
import Dummy_face from '../assets/hpictures/img3.avif'
import Savina from '../assets/hpictures/Savina-Edirisinghe.png'
import Isumi from '../assets/hpictures/Isumi-Livisarani.jpeg'
import Heshan from '../assets/hpictures/Heshan-Jayasinghe.jpeg'
import Isuru from '../assets/hpictures/Isuru-Akalanka.jpeg'
import Nethmika from '../assets/hpictures/Nethmika-Mendis.jpeg'
import Nishanthan from '../assets/hpictures/V-Nishanthan.png'
import Thinil from '../assets/hpictures/Thinil-Sandaru.jpeg'
import Shehani from '../assets/hpictures/Shehani-Yashoda.jpeg'

const Aboutus = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/login');
  };

  const founderArray = [
    { name: "Heshan Jayasinghe", image: Heshan, role: "Core Founder" },
    { name: "Savina Hansindu", image:Savina, role: "Core Founder" },
    { name: "Isumi Livisarani", image: Isumi, role: "Core Founder" },
    { name: "Isuru Akalanka", image: Isuru, role: "Core Founder" },
    { name: "Nethmika Mendis", image: Nethmika, role: "Core Founder" },
    { name: "V. Nishanthan", image: Nishanthan, role: "Core Founder" },
    { name: "Thinil Sandaru", image: Thinil, role: "Core Founder" },
    { name: "Shehani Yashoda", image: Shehani, role: "Core Founder" }
  ];

  const factArray = [
    { title: "200+", info: "Recipients have found hope through our platform.", icon: <Users size={32} /> },
    { title: "100+", info: "Generous donors have made a difference.", icon: <Heart size={32} /> }
  ];

  const features = [
    "Simple and secure donation processes",
    "Transparent fundraising with updates",
    "Real-time progress tracking",
    "Direct communication",
    "Verified campaigns for safe giving"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className={Styles.AboutUs}>
      <div className={Styles.AboutUs_box}>

        {/* Hero Section */}
        <section className={Styles.AboutUs_box_hero}>
          <motion.div
            className={Styles.AboutUs_box_hero_left}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className={Styles.emoji_yellow}>🙌</span> Hey There!
            </motion.h1>
            <p>At Project Hope, we believe that no one should struggle alone.
              Everyday millions of people face financial hardships that could be eased with a little help from someone who cares.
              Our mission is to bridge that gap—connecting compassionate donors with individuals and communities in need.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinClick}
            >
              Join Us
            </motion.button>
          </motion.div>
          <motion.div
            className={Styles.AboutUs_box_hero_right}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className={Styles.hero_image_wrapper}>
              <img src={Dummy_face} alt="About Us Hero" />
              <div className={Styles.floating_card_1}>
                <ShieldCheck className={Styles.green_icon} />
                <span>Verified Plans</span>
              </div>
              <div className={Styles.floating_card_2}>
                <TrendingUp className={Styles.green_icon} />
                <span>Real-time Impact</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <motion.div
          className={Styles.AboutUs_box_title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}><span>🌿</span> Our Vision</motion.h2>
          <motion.p variants={itemVariants}>
            We are a dedicated team committed to building a transparent, trustworthy, and user-friendly
            platform where kindness meets opportunity. Whether someone is raising funds for
            emergency medical care, education, food, shelter, or community upliftment, our platform
            empowers them to share their story and receive support from generous donors worldwide.
          </motion.p>
        </motion.div>

        {/* Team Section */}
        <div className={Styles.AboutUs_box_founder}>
          <motion.div
            className={Styles.AboutUs_box_title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants}><span>👥</span> Meet Our Founders</motion.h2>
          </motion.div>
          <motion.div
            className={Styles.AboutUs_box_founder_box}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {founderArray.map((el, i) => (
              <motion.div key={i} className={Styles.AboutUs_box_founder_box_img} variants={itemVariants}>
                <div className={Styles.avatar_wrapper}>
                  <img className={Styles.AboutUs_box_founder_box_img_img}
                    src={el.image} alt={el.name} />
                </div>
                <h3>{el.name}</h3>
                <p className={Styles.founder_role}>{el.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className={Styles.AboutUs_box_title}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          ><span>✨</span> What We Do</motion.h2>
          <div className={Styles.AboutUs_box_title_content}>
            <p>Our platform acts as a meeting point for recipients who need help and donors who want to make a real impact.</p>
            <p>Whether you want to support a family in crisis or help a student achieve their dreams, we make the connection effortless.</p>
          </div>

          <motion.div
            className={Styles.features_grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className={Styles.feature_card}>
              <ShieldCheck className={Styles.feature_icon} />
              <h4><span className={Styles.emoji_span}>🛡️</span> <span className={Styles.feature_text}>Secure Trust</span></h4>
              <p>Simple and secure donation processes with total transparency.</p>
            </div>
            <div className={Styles.feature_card}>
              <Globe className={Styles.feature_icon} />
              <h4><span className={Styles.emoji_span}>🌍</span> <span className={Styles.feature_text}>Global Care</span></h4>
              <p>Connecting compassionate donors with communities worldwide.</p>
            </div>
            <div className={Styles.feature_card}>
              <Zap className={Styles.feature_icon} />
              <h4><span className={Styles.emoji_span}>⚡</span> <span className={Styles.feature_text}>Live Progress</span></h4>
              <p>Real-time campaign tracking and instant donor feedback.</p>
            </div>
          </motion.div>
        </div>

        {/* Facts Section */}
        <div className={Styles.AboutUs_box_facts}>
          <div className={Styles.AboutUs_box_facts_box}>
            {factArray.map((el, i) => (
              <motion.div
                key={i}
                className={Styles.AboutUs_box_facts_box_item}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className={Styles.fact_icon_wrapper}>{el.icon}</div>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className={Styles.JoinUs_section}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>🌟 Join Our Movement 🌍</h2>
          <p>Whether you're here to give or to seek support, you are part of something bigger. A movement of humanity. A community built on hope.
            Together, we are proving that small acts of kindness can create big change.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoinClick}
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}

export default Aboutus

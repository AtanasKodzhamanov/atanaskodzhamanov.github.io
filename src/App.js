import React, { useRef, useState, useEffect } from 'react';
import './App.css'; // Import the CSS file
import SideHeader from './components/SideHeader';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Experience from './components/Experience';
import CV from './components/CV';
import { useLocation } from 'react-router-dom';
import { animated, useSpring, config } from 'react-spring';

const useInView = (ref) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);


  return inView;
};

function App() {

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const inView1 = useInView(ref1);
  const inView2 = useInView(ref2);
  const inView3 = useInView(ref3);
  const inView4 = useInView(ref4);


  const animation1 = useSpring({ opacity: inView1 ? 1 : 0.2, config: config.slow });
  const animation2 = useSpring({ opacity: inView2 ? 1 : 0.2, config: config.slow });
  const animation3 = useSpring({ opacity: inView3 ? 1 : 0.2, config: config.slow });
  const animation4 = useSpring({ opacity: inView4 ? 1 : 0.2, config: config.slow });

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
      }
    }
  }, [location]);

  return (
    <div className="page-body">
      <SideHeader />

      <div className="content-container">

        <div id="about" className="element">
          <section ref={ref1} >
            <animated.div style={animation1}>
              <About />
            </animated.div>
          </section>
        </div>

        <div id="projects" className="element">
          <section ref={ref2} >
            <animated.div style={animation2}>
              <Projects />
            </animated.div>
          </section>
        </div>

        <div id="education" className="element">
          <section ref={ref3} >
            <animated.div style={animation3}>
              <Education />
            </animated.div>
          </section>
        </div>

        <div id="experience" className="element">
          <section ref={ref4} >
            <animated.div style={animation4}>
              <Experience />
            </animated.div>
          </section>
        </div>

        <CV />

      </div>
    </div>
  );
}

export default App;

import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import corazonRojo from './assets/heartR.png';
import corazonAzul from './assets/heartA.png';
import dilucJugo from './assets/dilucJugoR.png';
import dilucCH from './assets/dilucchibir.png';
import dilucEscribiendo from './assets/DilucEs.jpg';
import jugoUva from './assets/grapejuice2.png';
import nota from './assets/note.png';
import usuarios from './assets/users.png';

import cero from './assets/zero.png';
import uno from './assets/one.png';
import dos from './assets/two.png';
import tres from './assets/three.png';
import nueve from './assets/nine.png';


function App() {
  const [count, setCount] = useState(0)
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showThirdPopup, setShowThirdPopup] = useState(false);
  const [showDilucPopup, setShowDilucPopup] = useState(false);
  const [showCodePopup, setShowCodePopup] = useState(false);

  const [showVentajasPopup, setShowVentajasPopup] = useState(false);
  const [showDesventajasPopup, setShowDesventajasPopup] = useState(false);

  const [showEleccion, setShowEleccion] = useState(false);

  const [inputCode, setInputCode] = useState(['', '', '', '']);
  const [correctCode] = useState(['2', '0', '0', '3']);

  const [timeLeft, setTimeLeft] = useState(5);

  const [screen, setScreen] = useState('inicio');

  const [showConfetti, setShowConfetti] = useState(false); // Nuevo estado para el confetti

  const [mostrarImagen, setMostrarImagen] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    audioElement.volume = 0.2; // 🔉 Establece el volumen (valores entre 0.0 y 1.0)
  
    const playAudio = () => {
      if (screen !== 'final') {
        audioElement.play().catch((error) => {
          console.warn('El navegador bloqueó la reproducción automática:', error);
        });
      } else {
        audioElement.pause(); // 🔇 Detiene la música si la pantalla es "final"
        audioElement.currentTime = 0; // 🔄 Reinicia el audio para que empiece desde el inicio la próxima vez
      }
    };
  
    // Intentar reproducir al cargar
    playAudio();
  
    // Intentar reproducir nuevamente al hacer clic en cualquier parte
    window.addEventListener('click', playAudio);
  
    return () => {
      window.removeEventListener('click', playAudio);
      audioElement.pause();
    };
  }, [screen]); // 👈 Ahora el efecto depende de `screen`
  
  

  const handleImageClick = () => {
    setShowPopup(true);
  };

  // Función para manejar el cambio en los inputs del código
  const handleInputChange = (e, index) => {
    const newCode = [...inputCode];
    newCode[index] = e.target.value;
    setInputCode(newCode);
  };

   // Función para validar el código
   const validateCode = () => {
    if (JSON.stringify(inputCode) === JSON.stringify(correctCode)) {
      // Si el código es correcto, cambiar a la siguiente pantalla
      setScreen('siguiente8');
    } else {
      alert('Código incorrecto. Intenta de nuevo.');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowSecondPopup(true);
  };

  const closeSecondPopup = () => {
    setShowSecondPopup(false);
    setShowThirdPopup(true);
  };

  const closeThirdPopup = () => {
    setShowThirdPopup(false);
    setScreen('siguiente');
  };

  const terceraInterfaz = () => {
    setScreen('siguiente2');
  };

  const cuartaInterfaz = () => {
    setScreen('siguiente3');
  };

  const quintaInterfaz = () => {
    setScreen('siguiente4');
  };

  const sextaInterfaz = () => {
    setScreen('siguiente5');
  };

  const septimaInterfaz = () => {
    setScreen('siguiente6');
  };

  const octavaInterfaz = () => {
    setScreen('siguiente7');
  };

  const handleAceptar = () => {
    setScreen('respuestasi');  // Cambiar a la pantalla de confetti
  };

  const handleNegar = () => {
    setScreen('respuestano');  // Cambiar a la pantalla de confetti
  };

  const novenaInterfaz = () => {
    setShowDilucPopup(true);
  };

  const ventajasButton = () => {
    setShowVentajasPopup(true);
  };

  const ventDown = () => {
    setShowVentajasPopup(false);
  };

  const desventajasButton = () => {
    setShowDesventajasPopup(true);
  };

  const desventDown = () => {
    setShowDesventajasPopup(false);
  };

  const abrirOpcion = () => {
    setShowEleccion(true);
  };

  const cerrarOpcion = () => {
    setShowEleccion(false);
  };

  const showCode = () => {
    setShowDilucPopup(false);
    setShowCodePopup(true);
  };

  useEffect(() => {
    if(showPopup){
      const audio = new Audio('/sounds/pop.mp3');
      audio.play();
    }
  }, [showPopup]);

  useEffect(() => {
    if(showSecondPopup){
      const audio = new Audio('/sounds/huh.mp3');
      audio.play();
    }
  }, [showSecondPopup]);

  useEffect(() => {
    if(showThirdPopup){
      const audio = new Audio('/sounds/button.mp3');
      audio.play();
    }
  }, [showThirdPopup]);



  // Iniciar la cuenta regresiva cuando se pase a la pantalla "siguiente8"
  useEffect(() => {
    if (screen === 'siguiente8' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Decrementa cada 1 segundo

      return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
    } else if (timeLeft === 0) {
      // Acción al terminar la cuenta regresiva (ejemplo: cambiar pantalla)
      setScreen('final');
    }
  }, [screen, timeLeft]);

  // Sonido de regresiva
  useEffect(() => {
    if (screen === 'siguiente8' && timeLeft > 0) {
      const beep = new Audio('/sounds/count.mp3');
      beep.play();
    }
  }, [timeLeft, screen]);

  useEffect(() => {
    if(screen === 'final'){
      const song = new Audio('/sounds/quieres.mp3');
      song.play();
    }
  }, [screen]);
  

  return (
    <>
    {screen === 'inicio' && (
      <>
        <div>
          <a target="_blank">
            <img src={corazonRojo} className="logo" alt="Vite logo" />
          </a>
          <a target="_blank">
            <img src={corazonAzul} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>¡Bienvenida, mi hermosa Reina!</h1>
        <h2> Antes de comenzar... </h2>
        <h3>Acepta el juguito que Diluc te ofrece para disfrutar mejor de este no tan largo pero hecho con mucho amor recorrido</h3>
        
        <div className="card">
          <a >
            <img src={dilucJugo} className="diluc" alt="React logo" onClick={handleImageClick}></img>
          </a>
          <p className="read-the-docs">
            (Haz clic en Diluc)
          </p>
        </div>

        <div className='container'>
          {showPopup && (
            <div className="popupOverlay">
              <div className="popup">
                <h2>¡Enhorabuena!</h2>
                <p>Has conseguido un juguito de uva, que rico gRrR</p>
                <img src={jugoUva} className='jugo' />
                <button onClick={closePopup} className="button">
                  ¡Genial!
                </button>
              </div>
            </div>
          )}
        </div>

        {showSecondPopup && (
          <div className="popupOverlay">
            <div className="popup">
              <h2>¿Oh?</h2>
              <p>Parece que hay una nota pegada debajo del vaso</p>
              <img src={nota} className='jugo' />
              <button className="button" onClick={closeSecondPopup}>
                Ver contenido
              </button>
            </div>
          </div>
        )}

        {showThirdPopup && (
          <div className="popupOverlay">
            <div className="popup">
              <h2>¡Un código!</h2>
              <p>Será mejor memorizar este número, puede ser MUY importante</p>
              <img src={dos} className='numero' />
              <img src={cero} className='numero' />
              <img src={cero} className='numero' />
              <img src={tres} className='numero' />
              <button className="button" onClick={closeThirdPopup}>
                ¡Sigamos!
              </button>
            </div>
          </div>
        )}
      </>
    )}

    {/* Elemento de audio oculto que no se interrumpe */}
    <audio ref={audioRef} src="/sounds/golden.mp3" autoPlay loop />

    
    {screen === 'siguiente' && (
      <div>
        <h1>Ahora... ¿Por dónde debería empezar?</h1>
        <h2>Durante el tiempo que hemos estado hablando te he dicho muchas cosas</h2>
        <h2>Demasiadas</h2>
        <h4>Porque soy bien pegostre MUEJEJE</h4>
        <h2> Pero todo lo he dicho con completa sinceridad</h2>
        <button className='next' onClick={terceraInterfaz}>
          Siguiente
        </button>
      </div>
    )}

    {screen === 'siguiente2' && (
      <div>
        <h1>¡Eres Increíble!</h1>
        <h2>Un Cielo</h2>
        <h2>Un Amor</h2>
        <h2>Un Ángel</h2>
        <h2>Una Diosa</h2>
        <h2>Eres simplemente...</h2>
        <h1 className='s21'>✨ Maravillosa ✨</h1>

        <button className='next' onClick={cuartaInterfaz}>
          Siguiente
        </button>

      </div>
    )}

    {screen === 'siguiente3' && (
      <div>
        <h1 className='s31'>Amo lo que hacemos</h1>
        <h2>Cada rolcito</h2>
        <h2>Cada trama</h2>
        <h2>En este punto estoy más que segura de que, no importa lo que roleemos:</h2>
        <h1>Siempre será igual de divertido</h1>

        <button className='next' onClick={quintaInterfaz}>
          Siguiente
        </button>
      </div>
      
    )}

    {screen === 'siguiente4' && (
      <div>
        <h1>Adoro tus respuestas</h1>
        <h2> ES QUE- ¿Cómo es que escribes tan pinche precioso?</h2>
        <h2>DIOSSS, te rezo todos los días 🛐</h2>
        <h3>Luego nada más estoy como perro hambreado esperando su hueso con tus respuestas</h3>
        <h2 className='s41'>Todas espectaculares</h2>

        <button className='next' onClick={sextaInterfaz}>
          Siguiente
        </button>
      </div>
      
    )}
      
      {screen === 'siguiente5' && (
      <div>
        <h1>Pero bueno</h1>
        <h2>Podría pasar páginas y páginas solo hablándote de lo feliz que me haces</h2>
        <h2>De lo agradecida que estoy por haberte conocido y de abrirme las puertitas hacia ti</h2>
        <h2>Pero creo que habrá tiempo para poder hacértelo saber hasta el cansancio</h2>

        <button className='next' onClick={septimaInterfaz}>
          Siguiente
        </button>
      </div>
      
    )}

    {screen === 'siguiente6' && (
      <div>
        <h2>La razón principal de esta sorpresita es porque...</h2>

        <button className='next' onClick={octavaInterfaz}>
          Siguiente
        </button>
      </div>
      
    )}

    {screen === 'siguiente7' && (
      <div>
        <h1>Hay algo que quiero preguntarte</h1>
        <h1>👉👈</h1>

        <button className='next' onClick={novenaInterfaz}>
          ¿Qué es?
        </button>

        {showDilucPopup && (
            <div className="popupOverlay">
              <div className="popup">
                <h2>¡Vaya! Parece que hay un pequeño guardián</h2>
                <p>"Para continuar solo tienes que ingresar el código de antes"</p>
                <img src={dilucCH} className='chibi' />
                <button onClick={showCode} className="button">
                  ¡Tengo el código!
                </button>
              </div>
            </div>
          )}

        {showCodePopup && (
            <div className="popupOverlay">
              <div className="popup">
                <h2>Ingresa los 4 dígitos</h2>
                <img src={dilucEscribiendo} className='chibi' />
                <div className='code-input'>
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key = {index}
                      type="number"
                      maxLength="1"
                      value={inputCode[index]}
                      onChange={(e) => handleInputChange(e, index)}
                      className='code-input-field'>
                    </input>
                  ))}
                </div>
                <button onClick={validateCode} className='button'>
                    Validar código
                  </button>
              </div>
            </div>
          )}
      </div>
      
    )}

    {screen === 'siguiente8' && (
      <div className='cuenta'>
          <h3 className='correcto'>¡Código Correcto!</h3>
          <h2>¿Lista?</h2>
          <h1 className='regresiva'>{timeLeft}</h1>
          <p>La pregunta se revelará cuando llegue a 0...</p>
        </div>
      )}

    {screen === 'final' && (
        <div className='todo'>
          <div className='fondo'>
            <div className='partner'>
              <p>Me gustaría saber si...</p>
              <h1>¿Quieres ser mi Partner?</h1>
              <img src={usuarios} className='uss' />
            </div>
          </div>
          
          <div>
            <button className='ventajasB' onClick={ventajasButton}>
              Ventajas
            </button>

            {showVentajasPopup && (
              <div className="popupOverlay">
                <div className="popup">
                  <h2>Ventajas</h2>
                  <div className='lasventajas'>
                    <p>➜ Roles bonitos, preciosos, divinos</p>
                    <p>➜ Rolear tramas frustradas y todo tipo de ideas que vengan a nuestra mente</p>
                    <p>➜ Matchs preciosos con nuestros niños</p>
                    <p>➜ Prioridad 24/7 en respuestas de todo tipo (incluso más que ahora como buena pegostre que soy 🛐)</p>
                    <p>➜ Exclusividad en ciertas cositas y todo lo que pidas</p>
                    <p>➜ Joteo intenso</p>
                    <p>➜ Presumirte como mi esposa</p>
                    <p>➜ Adorarte cada que respires</p>
                    <p>➜ Preñar a tu muchacho</p>
                    <p>➜ Ediciones aesthetic siempre que haya tiempo</p>
                    <p>➜ Amor y muchos mimos</p>
                    <p>➜ Esperarte siempre hasta el fin de los tiempos</p>
                    <p>➜ Tendrás siempre una confidente con quien hablar de todo lo que quieras y te preguntará si dormiste bien</p>
                  </div>
                  <button className="button" onClick={ventDown}>
                    cerrar
                  </button>
                </div>
              </div>
            )}

            <button className='desventajasB' onClick={desventajasButton}>
              Desventajas
            </button>
          </div>

          {showDesventajasPopup && (
              <div className="popupOverlay">
                <div className="popup">
                  <h2>Desventajas</h2>
                  <div className='lasdesventajas'>
                    <p>➜ Ninguna</p>
                    <p>➜ Seré yo (?)</p>
                  </div>
                  <button className="button" onClick={desventDown}>
                    cerrar
                  </button>
                </div>
              </div>
            )}

          <div>
            <button className='dar' onClick={abrirOpcion}>
              Estoy lista para dar mi respuesta
            </button>

            {showEleccion && (
              <div className="popupOverlay">
                <div className="popup">
                  <h2>Mi respuesta es...</h2>

                  <button className='buttonSi' onClick={() => window.location.href ='https://drive.google.com/file/d/1_KenEmxRhqF7d7hRblkuXOh43PI6dqbM/view?usp=sharing'}>
                    ¡Si, acepto!
                  </button>

                  <button className='buttonNo' onClick={() => window.location.href = 'https://www.youtube.com/watch?v=WznOYgm8KqY'}>
                    No :´(
                  </button>
                  <p className='ninos'>porfavor piensa en los niños</p>

                  <button className='buttonCerrar' onClick={cerrarOpcion}>
                    Quiero cerrar esta ventana y por eso existe este botón
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      
    )}

  

    </>
  )
}

export default App


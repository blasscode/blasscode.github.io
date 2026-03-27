// Registrar plugin de GSAP
gsap.registerPlugin(ScrollTrigger);

// Efecto de desvanecimiento para los cuadros de pergamino al hacer scroll
gsap.utils.toArray('.parchment-box').forEach(box => {
    gsap.from(box, {
        scrollTrigger: {
            trigger: box,
            start: "top 85%", // Inicia cuando la parte superior del elemento toca el 85% del viewport
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});

// Oscurecer ligeramente el mapa a medida que bajamos para que el texto sea más legible
gsap.to('#map-overlay', {
    scrollTrigger: {
        trigger: ".content-scroller",
        start: "top top",
        end: "bottom bottom",
        scrub: true
    },
    backgroundColor: "rgba(0, 0, 0, 0.65)"
});

// TIMELINE DE ZOOM Y PANEO DEL MAPA
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".content-scroller",
        start: "top top",
        end: "bottom bottom",
        scrub: 1 // Suavizado de 1 segundo para seguir el scroll
    }
});

// En la sección Habilidades (Fuente - Centro o ligeramente abajo)
tl.to('#village-map', {
    scale: 2.2,
    xPercent: 10,
    yPercent: -15,
    ease: "power1.inOut"
}, "0"); // Empieza desde el principio y dura hasta el primer tercio del scroll

// En la sección Proyectos (Gremio - Usualmente estructuras grandes a un lado)
tl.to('#village-map', {
    scale: 2.8,
    xPercent: -25,
    yPercent: -5,
    ease: "power1.inOut"
}, "+=0.2");

// En la sección Contacto (Taberna)
tl.to('#village-map', {
    scale: 2.0,
    xPercent: 15,
    yPercent: 20,
    ease: "power1.inOut"
}, "+=0.2");


/* =======================================
   LÓGICA DEL DADO D20 INTERACTIVO
   ======================================= */
const d20Wrapper = document.querySelector('.d20-wrapper');
const d20Result = document.getElementById('d20-result');
const messageBox = document.getElementById('d20-message');
let isRolling = false;

// Array de comentarios
const lootMessages = [
    "¡Pifia Crítica! Borraste la base de datos de producción accidentalmente. (-10 Carisma)",
    "Encuentras un bug de hace 5 años... decides ignorarlo y seguir caminando.",
    "El cliente pide un cambio 'rápido' un viernes a las 17:00 P.M.",
    "Tiras iniciativa: Ganas la batalla contra los conflictos de Git Merge.",
    "Te tomas una poción de café. +5 Concentración durante 4 horas.",
    "Un misterioso NPC te ofrece trabajo a cambio de 'exposición'. Lo ignoras.",
    "Descubres código sin documentar. Pierdes 2 Puntos de Cordura.",
    "Haces un deploy exitoso al primer intento. Sientes que algo malo va a pasar...",
    "Logras centrar un div en el primer intento. Recibes el título 'Señor del CSS'.",
    "Tu código compila, pero no sabes por qué. Magia Salvaje ejecutada.",
    "Refactorizas una función de 800 líneas a solo 10. ¡Subes de nivel rápido!",
    "Se te cae el internet en medio de la daily. Tiras salvación de Destreza.",
    "¡Descubres un atajo de teclado nuevo! +2 Velocidad de tipeo.",
    "Tu commit message es 'Fix bugs'. El master de la mesa suspira decepcionado.",
    "Encuentras oro: Un proyecto de código libre con tu stack favorito.",
    "¡Crítico de lectura! Logras entender la documentación antigua de la API.",
    "¡Esquivas una reunión inútil tirando Persuasión exitosa contra tu Project Manager!",
    "Terminas tu sprint un día antes. Recibes 'Inspiración Bárdica'.",
    "Poción de Energía Restauradora: Tu café está a la temperatura perfecta.",
    "¡Acierto Crítico (Pífia de tu enemigo)! El código de otro programador hace crashear el servidor, pero el tuyo funciona excelente."
];

d20Wrapper.addEventListener('click', () => {
    if(isRolling) return;
    isRolling = true;
    
    // Ocultar mensaje previo si existía
    messageBox.classList.add('hidden');
    
    // Agregar clase que dispara animación CSS
    d20Wrapper.classList.add('rolling');
    
    // Efecto de cambio rápido de números
    let counter = 0;
    const rollerInterval = setInterval(() => {
        d20Result.innerText = Math.floor(Math.random() * 20) + 1;
        counter++;
        if(counter > 10) clearInterval(rollerInterval);
    }, 50);

    // Finalizar tirada
    setTimeout(() => {
        d20Wrapper.classList.remove('rolling');
        
        // Resultado final real
        const finalRoll = Math.floor(Math.random() * 20) + 1;
        d20Result.innerText = finalRoll;
        
        // Mostrar mensaje
        messageBox.innerText = `[Sacaste un ${finalRoll}]: ${lootMessages[finalRoll - 1]}`;
        messageBox.classList.remove('hidden');
        
        // Permitir volver a tirar después de que se esconda (4 segundos)
        setTimeout(() => {
            messageBox.classList.add('hidden');
            setTimeout(() => isRolling = false, 400); // 400ms después se destraba
        }, 5000);
        
    }, 600); // Duración de la animación en CSS (.rolling)
});

// Botón de scroll para bajar rápido
const heroBtn = document.getElementById('scroll-hint');
if(heroBtn) {
    heroBtn.addEventListener('click', () => {
        gsap.to(window, {duration: 1.5, scrollTo: "#section-skills", ease: "power2.inOut"});
    });
}

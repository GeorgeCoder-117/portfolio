// En versiones modernas (v4+), PDF.js se maneja preferentemente como módulo ES
import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';

// Traducción con librería i18next
import i18next from 'https://cdn.jsdelivr.net/npm/i18next/+esm';
import es from '../languages/es.json' with { type: 'json' };
import en from '../languages/en.json' with { type: 'json' };

// 1. Inicializar i18next
i18next.init({
	lng: 'es', // Idioma por defecto
	debug: true,
	resources: {
		es: { translation: es },
		en: { translation: en }
	}
}, function (err, t) {
	if (err) return console.error('Error cargando traducciones:', err);
	updateContent();
});

// 2. Función para actualizar el DOM
function updateContent() {
	document.querySelectorAll('[data-i18n]').forEach(el => {
		const key = el.getAttribute('data-i18n');
		el.innerHTML = i18next.t(key);
	});
}

// 3. Manejar el cambio de idioma
let langBtn = document.querySelector(".language-btn");
let langActive = "es";

langBtn.addEventListener('click', () => {
	langActive = langActive === "es" ? "en" : "es";
	i18next.changeLanguage(langActive, (err, t) => {
		if (err) return console.error('Error cambiando idioma:', err);
		updateContent();
	});
});

// Funcionalidad Select Pdf Certificates

// Configurar el worker (DEBE coincidir la versión con la librería principal)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';
//Renderizamos 1° certificado desde el inicio
renderPDF(pdfjsLib, "./pdf/ReactNativeIntermediate.pdf");

//Select Pdf Certificate
let selectOptions = document.querySelector('#selectRoutine');
selectOptions.addEventListener('change', () => {
	let opcionSelected = selectOptions.value;

	if (opcionSelected === "1") {
		renderPDF(pdfjsLib, "./pdf/ReactNativeIntermediate.pdf");
	} else if (opcionSelected === "2") {
		renderPDF(pdfjsLib, "./pdf/CssResponsiveDesign.pdf");
	} else if (opcionSelected === "3") {
		renderPDF(pdfjsLib, "./pdf/BuildingJavaScriptWebsite.pdf");
	} else if (opcionSelected === "4") {
		renderPDF(pdfjsLib, "./pdf/SoftwareDesignPrinciples.pdf");
	}
});

async function renderPDF(pdfLib, url) {
    const loadingTask = pdfLib.getDocument(url);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    // 1. Definimos la escala (puedes ajustarla a 1.0, 1.5, etc.)
    const scale = 1.5; 
    const viewport = page.getViewport({ scale: scale });

    // 2. Preparamos el Canvas
    const canvas = document.getElementById('pdf-canvas');
    const context = canvas.getContext('2d');

// 1. Limpiamos cualquier rastro previo en el buffer
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Asignamos dimensiones (Esto reinicia el canvas internamente)
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    // 3. Forzamos fondo blanco (Para eliminar las ondas/cuadrícula si el PDF es transparente)
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
        // Intentar renderizar solo el contenido visible si el PDF tiene bordes extra
        intent: 'display' 
    };

    // 3. Renderizado
    await page.render(renderContext).promise;
    console.log('Renderizado exacto completado sin espacios extra.');
}



// function renderPDF(pdfLib, url) {
// 	pdfLib.getDocument(url).promise.then(pdf => {
// 		// 3. Renderizar la primera página
// 		pdf.getPage(1).then(page => {
// 			const scale = 1.5;
// 			const viewport = page.getViewport({ scale });

// 			const canvas = document.getElementById('pdf-canvas');
// 			const context = canvas.getContext('2d');
// 			canvas.height = viewport.height;
// 			canvas.width = viewport.width;

// 			const renderContext = {
// 				canvasContext: context,
// 				viewport: viewport
// 			};
// 			page.render(renderContext);
// 		});
// 	}).catch(err => {
//         console.error('Error al cargar el PDF: ', err);
//     });
// }

$(document).ready(function(){
	$('.scroll-up').hide();

	$(window).scroll(function(){
		if ($(this).scrollTop() > 300){ //this --> esta ventana .. scrollTop -->posicion arriba de la ventana 100-->pixeles de arriba a abajo
			$('.scroll-up').show('1000'); //fadeIn -->mostrar de nuevo
		}

		else {
			$('.scroll-up').hide('1000'); // fadeOut -->  desaparezca  1000 --> efecto de aparición en tiempo
		}
	});

	$('.scroll-up').click(function(){
		$('body, html').animate({
			scrollTop: 0 //Para que regrese al Inicio de arriba
		},200); // 200 velocidad de efecto hacia arriba
	});
});

(function () {
	//Detectamos screen orientation
	window.addEventListener("orientationchange", () => {
		if (screen.orientation.type.includes("portrait")) {
			location.reload();
		}
		// if (screen.orientation && screen.orientation.lock) {
		// 	screen.orientation.lock('landscape')
		// 		.catch(function () { //No se pudo bloquear la orientación con el uso de API		
		// 			location.reload();
		// 		});
		// }
	})

	//WEB Animation reload

	window.addEventListener("load", () => {
		const loader = document.querySelector(".loader");
		loader.className += " hidden";
	});

	window.onload = function () {

		/*=============== SCROLL HEADER ===============*/
		const header = document.querySelector('header');
		function scrollHeader() {
			if (window.matchMedia("(min-width: 1023px)").matches) {
				//Cuando el scroll es mayor al viewport de 40 , añade los estilos nuevos a la etiqueta del header
				if (this.scrollY >= 40) {
					// header.classList.add('scroll-header');
					header.style.position = "fixed";
					header.style.top = "25px";
					header.style.left = "50%";
					header.style.transform = "translate(-50%)";
					header.style.width = "75%";
					header.style.padding = "0px 15px";
					header.style.borderRadius = "50px";
					header.style.background = "#000000";
					header.style.boxShadow = "0 0.2rem 0.3rem rgba(255, 255, 255, 0.05)";
				} else {
					// header.classList.remove('scroll-header');
					header.style.position = "relative";
					header.style.top = "0";
					// header.style.left = "none";
					// header.style.transform = "none";
					// header.style.padding = "none";
					header.style.width = "100%";
					header.style.borderRadius = "none";
					header.style.boxShadow = "none";
					header.style.zIndex = "none";
					header.style.background = "transparent";
					header.style.boxShadow = "none";
					// header.style.marginBottom = "2rem";
				}
			}
		}
		window.addEventListener('scroll', scrollHeader);

		// BTN Plus Function

		let btnPlusActive = 0;
		let btnPlus = document.querySelector(".uil-plus-circle");

		btnPlus.addEventListener('click', () => {

			if (btnPlusActive == 0) {
				btnPlusActive += 1;
				btnPlus.className = "uil-times-circle";
			}

			else if (btnPlusActive == 1) {
				btnPlusActive = 0;
				btnPlus.className = "uil-plus-circle";
			}

		});

		// SKILL Function
		let options = {
			startAngle: -1.55,
			size: 150,
			value: 0.75,
			fill: { color: "#00CBCE" }
		}
		$(".circle .bar").circleProgress(options).on('circle-animation-progress',
			function (event, progress, stepValue) {
				$(this).parent().find("span").text(String(stepValue.toFixed(2).substring(2)) + "%");
			});

		$(".php .bar").circleProgress({
			value: 0.70,
		});

		$(".react .bar").circleProgress({
			value: 0.60,
		});

		//PORTFOLIO SWIPER FUNCTION
		var swiper = new Swiper(".portfolio__container", {
			spaceBetween: 40,
			// grabCursor: true,
			centeredSlides: true,
			slidesPerView: 'auto',
			loop: true,
			// noSwiping: true,
			// noSwipingClass: 'swiper-slide',
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				350: {
					spaceBetween: 15,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 50,
				},
				1023: {
					slidesPerView: 3,
					spaceBetween: 40,
					centeredSlides: true,
					loop: true,
					grabCursor: true,
				},
			},
		});

		//Funcionalidad efecto hover sobre cards de proyectos
		let portfolioCards = document.querySelectorAll(".portfolio__card");
		//Efecto solo con hover
		if (window.matchMedia("(min-width: 1025px)").matches) {
			portfolioCards.forEach((swpCard) => {
				swpCard.addEventListener("mouseover", function (e) {
					swpCard.style.marginTop = '-50px';
				});
				swpCard.addEventListener("mouseout", function (e) {
					swpCard.style.marginTop = '0px';
				});
			});
		}

		/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
		const sections = document.querySelectorAll('section .section-title');
		// console.log(sections);

		function scrollActive() {
			const scrollY = window.pageYOffset;

			if (window.matchMedia("(min-width: 1025px)").matches) {
				sections.forEach(current => {
					const sectionHeight = current.offsetHeight,
						sectionTop = current.offsetTop - 58,
						sectionId = current.getAttribute('id');

					if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
						// console.log(sectionId);
						if (sectionId === "myportfolio" || sectionId === "myexperience" || sectionId === "myknowledge") {
							if (header.className.includes("showing")) {
								header.className = "";
							}
							header.className += " hidden";
						} else {
							if (header.className.includes("hidden")) {
								header.className = "";
							}
							header.className += " showing";
						}
					}
				});
			}
		}
		window.addEventListener('scroll', scrollActive);



		//FUNCIONALIDAD IMG RESPONSIVA CON ZOOM
		const image = document.getElementById('zoom-image');
		const lens = document.querySelector('.zoom-lens');
		const container = document.querySelector('.image-container');

		// Mostrar lupa al pasar el mouse
		container.addEventListener('mousemove', function (e) {
			if (window.innerWidth > 768) { // Solo para desktop
				lens.style.display = 'block';

				// Posicionar la lupa
				let posX = e.pageX - this.offsetLeft - lens.offsetWidth / 2;
				let posY = e.pageY - this.offsetTop - lens.offsetHeight / 2;

				// Mantener la lupa dentro de los límites
				const maxX = this.offsetWidth - lens.offsetWidth;
				const maxY = this.offsetHeight - lens.offsetHeight;

				posX = Math.min(Math.max(posX, 0), maxX);
				posY = Math.min(Math.max(posY, 0), maxY);

				lens.style.left = posX + 'px';
				lens.style.top = posY + 'px';

				// Calcular la posición del fondo para el efecto de zoom
				const bgPosX = -posX * 1.5;
				const bgPosY = -posY * 1.5;

				lens.style.backgroundImage = `url(${image.src})`;
				lens.style.backgroundSize = `${this.offsetWidth * 1.5}px ${this.offsetHeight * 1.5}px`;
				lens.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
			}
		});

		// Ocultar lupa al salir del contenedor
		container.addEventListener('mouseleave', function () {
			lens.style.display = 'none';
			image.style.transform = 'scale(1)';
		});

		// Para dispositivos táctiles
		let touchZoomEnabled = false;

		//container.addEventListener('touchstart', function (e) {
		//if (window.innerWidth <= 768) {
		//touchZoomEnabled = !touchZoomEnabled;
		//image.style.transform = touchZoomEnabled ? 'scale(2)' : 'scale(1)';
		//e.preventDefault();
		//}
		//});
	}

	// IMPROVEMENT WEB

	/** F12 TOOLS .. DEVELOPER ACCESS PERSONALIZATION **/
	// console.error('%cStop!', 'color: red;font-size:2.5rem;font-weight:bold;');
	// console.warn('%cThis console was destinated for developers. If you copy or paste code here to enable some function that unset the integrity of the website you will be reported and we will take actions against you executing a XSS attack.. you were notified.', 'font-size:1.25rem;line-height:1.1;');

	// /** DISABLE RIGHT CLICK **/
	// document.oncontextmenu = function () {
	// 	alert('WARNING \nThe security on the website was improved.');

	// 	return false;
	// };

	// /** DISABLE SCREEN SHOT **/
	// document.addEventListener('keyup', (e) => {

	// 	if (e.key == 'PrintScreen') {
	// 		navigator.clipboard.writeText('');

	// 		alert('ERROR SCREENSHOT DISABLED! \nDont try it again or you will be reported');
	// 	}

	// });

	// /** DISABLE SCREEN IMPRESSION OR PDF EXPORT WITH (CTRL+P) & DISABLE SCREENCUTS (CTRL+SHIFT+S)**/
	// document.addEventListener('keydown', (e) => {

	// 	if (e.ctrlKey && e.key == 'p' || e.ctrlKey && e.key == 'P') {
	// 		alert('ERROR This section doesnt allow impression or PDF export \nDont try it again or your access will be denied and reported');

	// 		e.preventDefault();
	// 	}

	// 	else if (e.metaKey && e.shiftKey) {
	// 		alert('SCREENCUTS DETECTED! \nDont try it again or your access will be denied and reported');

	// 	}

	// 	else if (e.ctrlKey && e.key == 's' || e.ctrlKey && e.key == 'S') {
	// 		alert('ERROR This Website cant be downloaded \nDont try it again or your access will be denied and reported');

	// 		e.preventDefault();
	// 	}

	// 	else if (e.ctrlKey && e.key == 'c' || e.ctrlKey && e.key == 'C') {
	// 		alert('ERROR This Website doesnt allow copy \nDont try it again or your access will be denied and reported');

	// 		e.preventDefault();
	// 	}

	// 	else if (e.ctrlKey && e.key == 'x' || e.ctrlKey && e.key == 'X') {
	// 		alert('ERROR This Website doesnt allow cut \nDont try it again or your access will be denied and reported');

	// 		e.preventDefault();
	// 	}

	// 	else if (e.ctrlKey && e.key == 'v' || e.ctrlKey && e.key == 'V') {
	// 		alert('ERROR This Website doesnt allow paste \nDont try it again or your access will be denied and reported');

	// 		e.preventDefault();
	// 	}

	// });

})();

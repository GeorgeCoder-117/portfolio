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

		// $(function(){
		//   	    $("#skillcircle-1").percircle({progressBarColor: '#00CBCE'});
		//   	    $("#skillcircle-2").percircle({progressBarColor: '#00CBCE'});
		//   	    $("#skillcircle-3").percircle({progressBarColor: '#00CBCE'});
		//   	    $("#skillcircle-4").percircle({progressBarColor: '#00CBCE'});
		//   	});

		// NEW SKILL Function
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





		// CERT SLIDER FUNCTION

		let slider1 = document.querySelector(".slider div:nth-child(1)");
		let slider2 = document.querySelector(".slider div:nth-child(2)");
		let slider3 = document.querySelector(".slider div:nth-child(3)");

		slider2.style.display = "none";
		slider3.style.display = "none";

		let sliderInterval = window.setInterval(changeSlider, 6000);

		function changeSlider() {

			if (slider2.style.display == "none" && slider3.style.display == "none") {
				slider1.style.display = "none";
				slider2.style.display = "block";
			}

			else if (slider2.style.display == "block") {
				slider3.style.display = "block";
				slider2.style.display = "none";
			}

			else if (slider3.style.display == "block") {
				slider1.style.display = "block";
				slider3.style.display = "none";
			}

			// else if (slider2.style.display == "block") {
			// 	slider1.style.display = "block";
			// 	slider2.style.display = "none";
			// }

		}

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

		/*=============== SCROLL SECTIONS ACTIVE LINK FOR BOTH BAR MENUS ===============*/
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
						if (sectionId === "myportfolio" || sectionId === "myexperience") {
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

		// CHANGE LANGUAGE

		let langBtn = document.querySelector(".language-btn");

		let langBtnActive = 0;

		langBtn.addEventListener('click', () => {

			if (langBtnActive == 0) {

				langBtn.innerHTML = "<i class='uil uil-globe' style='color:#FFFFFF;'></i> <p>ES</p>";
				langBtn.style = "background-color: #00CBCE; border: solid 3px #FFFFFF;";

				let mainmenu = document.querySelector(".main-menu");
				let Ulmainmenu = mainmenu.firstChild.nextSibling;

				Ulmainmenu.querySelector("li:nth-child(1)").innerHTML = "<a href='#beginning'>Main</a>";
				Ulmainmenu.querySelector("li:nth-child(2)").innerHTML = "<a href='#myskills'>Skills</a>";
				Ulmainmenu.querySelector("li:nth-child(3)").innerHTML = "<a href='#myportfolio'>Portfolio</a>";
				Ulmainmenu.querySelector("li:nth-child(4)").innerHTML = "<a href='#myexperience'>Experience</a>";
				Ulmainmenu.querySelector("li:nth-child(5)").innerHTML = "<a href='#myknowledge'>Knowledge</a>";
				Ulmainmenu.querySelector("li:nth-child(6)").innerHTML = "<a href='#contactme'><i class='uil uil-envelope-exclamation'></i> Contact</a>";

				let me = document.querySelector(".me");
				let Divme = me.firstChild.nextSibling;

				Divme.querySelector("h1:nth-child(1)").innerHTML =
					"<h1 style='font-size:2.8rem; line-height: 4.2rem;'>Hi ! <br> My name is Jorge <br> I'm a computer <br> systems engineer</h1>";

				Divme.querySelector("a").innerHTML =
					"<a id='beginning' href='#aboutmyself'><i class='uil uil-angle-double-right'></i> Let's go!</a>";

				//me.querySelector("img").style = "width: 20vw;";

				let aboutMyself = document.querySelector("#aboutmyself");
				aboutMyself.querySelector("h1").innerHTML = "<h1>About me</h1>";

				let aboutMee = document.querySelector(".aboutme");
				aboutMee.querySelector("p").innerHTML =
					"<p>Web developer and React Native app developer with almost 5 years of experience on the field, front end and back end , I love coding.</p>";

				let certificate = document.querySelector(".slider-container");
				certificate.querySelector("h1").innerHTML = "Certificates";

				let mySkills = document.querySelector("#myskills");
				mySkills.querySelector("h1").innerHTML = "<h1>Web skills</h1>";

				let myPortfolio = document.querySelector("#myportfolio");
				myPortfolio.querySelector("h1").innerHTML = "<h1>Portfolio</h1>";
				let myPortfolioSmall = myPortfolio.getElementsByTagName("small");
				myPortfolioSmall[0].innerHTML = "Here are some projects that I've developed";

				let divEnlaces = document.querySelector("#enlaces");
				divEnlaces.querySelector("h1").innerHTML = "<h1>Last projects done</h1>";
				let divEnlacesAnchor = divEnlaces.getElementsByTagName("a");
				divEnlacesAnchor[0].innerHTML = "<b>Web Link 1</b>";
				divEnlacesAnchor[1].innerHTML = "<b>Web Link 2</b>";

				let divInfoApp = document.querySelector("#infoApp");
				divInfoApp.querySelector("small").innerHTML = "I'm also currently in charge of the new version of the Scholastico app developed with React Native, which I already finished it and the creation of a new app focus on our drivers.";

				let experiences = document.querySelector("#myexperience");
				experiences.querySelector("h1").innerHTML = "<h1>Experience</h1>";

				let jobs = document.querySelectorAll(".experience");
				jobs[0].querySelector("p:nth-child(1)").innerHTML = "Bilingual technical support";
				jobs[0].querySelector("p:nth-child(3)").innerHTML =
					"English Test EFSET Result -> Link <a href='http://links.t-educationfirst.mkt4686.com/servlet/MailView?ms=NTY0Mzg4NTES1&r=LTc3MTA5MDc1NzcS1&j=MTc2NDI3MjMxMgS2&mt' target='_blank'><i class='uil uil-link-alt'></i></a>";
				jobs[1].querySelector("p:nth-child(1)").innerHTML = "Junior web developer and Junior App developer";
				jobs[2].querySelector("p:nth-child(1)").innerHTML = "Web developer";
				jobs[2].querySelector("p:nth-child(2)").innerHTML = "<i class='uil uil-calendar-alt'></i> 2021-July 2021";
				jobs[3].querySelector("p:nth-child(1)").innerHTML = "Full stack web developer and React Native app developer";
				jobs[3].querySelector("p:nth-child(2)").innerHTML = "<i class='uil uil-calendar-alt'></i> August 2021-Today";

				let myknowledge = document.querySelector("#myknowledge");
				myknowledge.querySelector("h1").innerHTML = "<h1>Knowledge</h1>";

				let serviceDiv = document.querySelectorAll(".service");
				serviceDiv[0].querySelector("h3").innerHTML = "<h3>Web development</h3>";
				serviceDiv[0].querySelector("p").innerHTML = "<p>Focused on giving a nice user experience and awesome intuitive user interface.</p>";
				serviceDiv[1].querySelector("h3").innerHTML = "<h3>App development</h3>";
				serviceDiv[1].querySelector("p").innerHTML = "<p>Multiplatform apps that works well in Android and iOS.</p>";
				serviceDiv[2].querySelector("h3").innerHTML = "<h3>Api development</h3>";
				serviceDiv[2].querySelector("p").innerHTML = "<p>Data packages to use in apps and webs.</p>";
				serviceDiv[3].querySelector("h3").innerHTML = "<h3>Technical support</h3>";
				serviceDiv[3].querySelector("p").innerHTML = "<p>Preventive and corrective maintenance of your desktop computer or laptop, as well as smooth O.S.</p>";

				let contactMeDiv = document.querySelectorAll(".links");

				contactMeDiv[0].querySelector("h3").innerHTML = "<h3>Contact</h3>";

				let contactMeDiv1Ul = contactMeDiv[0].querySelector("ul");
				contactMeDiv1Ul.querySelector("li:nth-child(1)").innerHTML =
					"<li><a id='callme' href='tel:+525576578841'><i class='uil uil-outgoing-call'></i> Call me!</a></li>";
				document.querySelector(".btn-sms").innerHTML =
					"<a href='sms:+525576578841' class='btn-sms'><i class='uil uil-comment-alt-lines'></i> Send me a SMS</a>";

				contactMeDiv[1].querySelector("h3").innerHTML = "<h3>Shortcuts</h3>";

				let contactMeDiv2Ul = contactMeDiv[1].querySelector("ul");
				contactMeDiv2Ul.querySelector("li:nth-child(1)").innerHTML =
					"<li><a href='#beginning'>Main</a></li>";
				contactMeDiv2Ul.querySelector("li:nth-child(2)").innerHTML =
					"<li><a href='#myskills'>Skills</a></li>";
				contactMeDiv2Ul.querySelector("li:nth-child(3)").innerHTML =
					"<li><a href='#myportfolio'>Portfolio</a></li>";
				contactMeDiv2Ul.querySelector("li:nth-child(4)").innerHTML =
					"<li><a href='#myknowledge'>Knowledge</a></li>";


				langBtnActive = 1;

			}

			else if (langBtnActive == 1) {

				location.reload();

			}

		});

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

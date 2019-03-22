/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	    var infoembarazo = (function(){

		
		//init datepicker function
	        function initdatepicker(){
	              zdpicker.datepicker({ //Initialize datepicker
	              altFormat: "dd-mm-yyyy",
				  changeMonth: true,
                  changeYear: true,
	            });
	        }
		
		
	    

	        //cache DOM variables
	        var ztargetlist = $('.week-list-calculator');
	        var zmw = $('#cmainwrapper'); //Dom search (only once)

	        var zdpicker = zmw.find('#datepicker');

	        initdatepicker(); //call previous function

	        var zbutton = zmw.find('button');

	        var zpanel = zmw.find('.panel');

	        var zstatus = zmw.find('.status');
	        var zstatusli = zmw.find('.statusli');

	        var zpgbar = zmw.find('.pgbar');
	        var zpgbartext = zmw.find('.pgbartext');
	        var zpgbarli = zmw.find('.pgbarli');

	        var zrecommendation = zmw.find('.recommendation');
	        var zrecommendationli = zmw.find('.recommendationli');

	        var zfpp = zmw.find('.fpp');
	        var zfppli = zmw.find('.fppli');

	        var zactualstate = zmw.find('.actualstate');
	        var zactualstateli = zmw.find('.actualstateli');

	        var zmonth = zmw.find('.actualmonth');
	        var zmonthli = zmw.find('.actualmonthli');

	        var ztrimester = zmw.find('.actualtrimester');
	        var ztrimesterli = zmw.find('.actualtrimesterli');


	        var info = { //init satus info
	            "difference": 0,
	            "weeks" : 0,
	            "days": 0,
	            "month": 0,
	            "trimester": 0,
	            "situation": "",
	            "color1": "",
	            "color2": ""
	        }

	        //bind events
	        zbutton.on('click', getData);

	        //require modules
	        var datefunctions = __webpack_require__(1);
	        var ginfo = __webpack_require__(2);
	        var status = __webpack_require__(3);
	        var progressbar = __webpack_require__(4);
	        var recommendation = __webpack_require__(5);
	        var fpp = __webpack_require__(7);
	        var actualstate = __webpack_require__(8);
	        var monthandtrimester = __webpack_require__(9);
	        var weekcolors = __webpack_require__(6);

	        weekcolors.savelist(ztargetlist);
	        zpanel.hide();

	        function hidefields(){
	            zstatusli.hide();
	            zpgbarli.hide();
	            zrecommendationli.hide();
	            zfppli.hide();
	            zactualstateli.hide();
	            zmonthli.hide();
	            ztrimesterli.hide();
	            weekcolors.whitencolourweeks();
	        }

	        hidefields(); //clean all fields

	        function getData(){
	            var currentDate = new Date();
	            info.difference = ginfo.diferencia_entre_fechas(currentDate, zdpicker.datepicker("getDate"));
	            info.situation = ginfo.situation(info.difference);
	            info.weeks = datefunctions.weeks(info.difference);
	            info.days = datefunctions.days(info.difference);
	            info.month = datefunctions.month(info.difference);
	            info.trimester = datefunctions.trimester(info.difference);
	            execute();
	        }

	        function execute(){
	            zpanel.show();
	            hidefields();
	            status[info.situation](zstatus, zstatusli, info.weeks, info.days); /*Agregar semana actual en paréntesis*/
	            progressbar[info.situation](zpgbar, zpgbartext, zpgbarli, info.difference);
	            recommendation[info.situation](zrecommendation, zrecommendationli, info.weeks, info.days);
	            fpp[info.situation](zfpp, zfppli, zdpicker.datepicker("getDate"));
	            actualstate[info.situation](zactualstate, zactualstateli, info.difference);
	            monthandtrimester[info.situation](info.month, info.trimester, zmonth, ztrimester, zmonthli, ztrimesterli);
	        }

	        return { //API
	            executeAPI: execute
	        };

	    })();


/***/ },
/* 1 */
/***/ function(module, exports) {

	function days(n){
	   n = n % 7;
	   return (n);
	}

	function weeks(n){
	  n = n/7;
	  n = Math.floor(n);
	  if (n == 0) n = 1;
	  return n;
	}

	function month(n){
	    month = n/30;
	    month = Math.floor(month);
	    month++;
	    if (month == 10) month = 9;
	    return month;
	}

	function trimester(n){
	    var trimester;
	    trimester = n/90;
	    trimester = Math.floor(trimester);
	    trimester++;
	    if (trimester == 4) trimester = 3;
	    return trimester;
	}

	function numFormat(date){
	  var d = (date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear());
	  return d;
	}

	function normalFormat(date){
	    var d =  (nombreDia(date.getDay()) + ' ' + date.getDate() + ' '  + nombreMes(date.getMonth()) + '  ' + date.getFullYear());
	    return d;
	}

	function nombreDia(n){
	  switch(n) {
	      case 0: return "Pazar"; break;
	      case 1: return "Pazartesi"; break;
	      case 2: return "Salı"; break;
	      case 3: return "Çarşamba"; break;
	      case 4: return "Perşembe"; break;
	      case 5: return "Cuma"; break;
	      case 6: return "Cumartesi"; break;
	  }
	}

	function nombreMes(n){
	  switch(n) {
	      case 0:  return "ocak"; break;
	      case 1:  return "şubat"; break;
	      case 2:  return "mart"; break;
	      case 3:  return "nisan"; break;
	      case 4:  return "mayıs"; break;
	      case 5:  return "haziran"; break;
	      case 6:  return "temmuz"; break;
	      case 7:  return "ağustos"; break;
	      case 8:  return "eylül"; break;
	      case 9:  return "ekim"; break;
	      case 10: return "kasım"; break;
	      case 11: return "aralık"; break;
	  }
	}

	module.exports = {
	    days: days,
	    weeks: weeks,
	    month: month,
	    trimester: trimester,
	    numFormat: numFormat,
	    normalFormat: normalFormat
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	function diferencia_entre_fechas(fecha_actual, fecha_ingresada){
	    var diferencia =  fecha_actual.getTime() - fecha_ingresada.getTime();
	    diferencia_dias = Math.ceil(diferencia / (1000 * 3600 * 24));
	    diferencia_dias--; //Arreglo de la incongruencia de la resta de fechas
	    return diferencia_dias;
	}

	function situation(d){
	    if (d > 280) return "born";
	    if (d==280) return "lastday";
	    if ((273<=d) && (d<=279)) return "lastweek";
	    if ((22<=d) && (d<=272)) return "normal";
	    if ((8<=d) && (d<=21)) return "early";
	    if ((1<=d) && (d<=7)) return "veryearly";
	    if (d==0) return "sameday";
	    if (d<0) return "future";
	}


	module.exports = {
	  diferencia_entre_fechas: diferencia_entre_fechas,
	  situation: situation,
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	function born(status, statusli, w, d){}
	function lastday(status, statusli, w, d){_render(status, statusli, w, d)}
	function lastweek(status, statusli, w, d){_render(status, statusli, w, d)}
	function normal(status, statusli, w, d){_render(status, statusli, w, d)}
	function early(status, statusli, w, d){_render(status, statusli, w, d)}
	function veryearly(status, statusli, w, d){}
	function sameday(status, statusli, w, d){}
	function future(status, statusli, w, d){}

function writeStatus(w, d){
	    if (d == 0){
	        if (w == 40){
	            return ("Tebrikler hamilesiniz " + w + " semanas.");
	        }else{
	            return ("Tebrikler " + w + " haftalık hamilesiniz. (Gebelik haftanız:  " + (w+1) + ")");
	        }
	    }
	    else{
	        return("Tebrikler " + w + " hafta  " + d + " günlük hamilesiniz. (Gebelik haftanız: " + (w+1) + ")");
	    }
	}

	function _render(status, statusli, w, d){
	    status.text(writeStatus(w,d));
	    statusli.show();
	}

	module.exports = {
	    born: born,
	    lastday: lastday,
	    lastweek: lastweek,
	    normal: normal,
	    early: early,
	    veryearly: veryearly,
	    sameday: sameday,
	    future: future,
	    writeStatus: writeStatus
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	function born(pgbar, pgbartext, pgbarli, d){}
	function lastday(pgbar, pgbartext, pgbarli, d){_render(pgbar, pgbartext, pgbarli, d);}
	function lastweek(pgbar, pgbartext, pgbarli, d){_render(pgbar, pgbartext, pgbarli, d);}
	function normal(pgbar, pgbartext, pgbarli, d){_render(pgbar, pgbartext, pgbarli, d);}
	function early(pgbar, pgbartext, pgbarli, d){_render(pgbar, pgbartext, pgbarli, d);}
	function veryearly(pgbar, pgbartext, pgbarli, d){}
	function sameday(pgbar, pgbartext, pgbarli, d){}
	function future(pgbar, pgbartext, pgbarli, d){}

	function embarazoPorcentaje(n){
	    var p = Math.floor(n * (100/280));
	    return p;
	}

	function _render(pgbar, pgbartext, pgbarli, d){
	    pgbartext.text(embarazoPorcentaje(d) + "%");
	    var v = embarazoPorcentaje(d) + "%";
	    pgbar.css('width', v);
	    pgbarli.show();
	}

	module.exports = {
	    born: born,
	    lastday: lastday,
	    lastweek: lastweek,
	    normal: normal,
	    early: early,
	    veryearly: veryearly,
	    sameday: sameday,
	    future: future,
	    porcentaje: embarazoPorcentaje
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cw = __webpack_require__(6);

function born(recommend, recommendli, w, d){
	    recommend.text('40 Haftanız doldu. Muhtemelen doğum yapmış olmalısınız. Umarız bebeğinizle ilgili her şey yolunda gitti ve çok mutlusunuz!');
	    recommendli.show();
	}


	function lastday(recommend, recommendli, w, d){
	    recommend.text('Buğün hamileliğinizin son günü olabilir. Sakin olmanızı ve 40. haftanın bilgilerini okumanızı öneririz.');
	    recommendli.show();
	    cw.colourweeks(0, 40);
	}

	function lastweek(recommend, recommendli, w, d){
	    recommend.text('Bugün hamileliğinizin son günü olabilir. Sakin olmanızı ve aşağıdan 40. haftaya giderek okumanızı öneririz. Bebeğiniz çoktan doğmuşda olabilir, umarım bebeğinizle her şey yolunda gitti ve çok mutlusunuz!');
	    recommendli.show();
	    cw.colourweeks(0, 40);
	}

	function normal(recommend, recommendli, w, d){ recommendnormal(recommend, recommendli, w, d);}

	function early(recommend, recommendli, w, d){
	    recommend.text('Hamile olup oladığınızı söylemek için henüz  erken. Eğer hamile olduğunuzu düşünüyorsanız, ilk üç hafta hakkındaki bilgileri okuyabilirsiniz.!');
	    recommendli.show();
	    cw.colourweeks(0, 3);
	}

	function veryearly(recommend, recommendli, w, d){
	    recommend.text('Hamile olup oladığınızı söylemek için henüz erken. Eğer hamile olduğunuzu düşünüyorsanız, sayfa sonundan 1,2,3. haftalara giderek gebelik belirtilerini okuyabilirsiniz.');
	    recommendli.show();
	    cw.colourweeks(0, 3);
	}

	function sameday(recommend, recommendli, w, d){
	    recommend.text('Hamile olup oladığınızı söylemek için henüz erken. Eğer hamile olduğunuzu düşünüyorsanız, sayfa sonundan 1,2,3. haftalara giderek gebelik belirtilerini okuyabilirsiniz.!');
	    recommendli.show();
	    cw.colourweeks(0, 3);
	}

	function future(recommend, recommendli, w, d){
	    recommend.text('Girdiğiniz tarih bugünden daha büyük!. Bu konuda şu an için bir şeyler söylemek mümkün değil. Keske söyleyebilsek :)');
	    recommendli.show();
	}

	function recommendnormal(recommend, recommendli, w, d){
	     var week = w+1;
	    if (w == 3){
	         recommend.text("Haftanız Hakkında Kısa Bilgi: Bebeğinizin boyu 1 mm, kilodan bahsedilemez. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 4){
	         recommend.text("Haftanız Hakkında Kısa Bilgi: Artık 1 ay 5 günlük gebesiniz. Bu hafta itibari ile bebeğinizin görüntülerini ve kese boyunu ultrasonla görebilirsiniz. Kalp Atışları hala duyulmaz. Bebeğiniz boyu 3-4 mm, henüz kilosundan bahsetmek mümkün değildir.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 5){
	         recommend.text("Haftanız Hakkında Kısa Bilgi: Bebeğinizin boyu 5 mm, kilosundan henüz bahsedilemez.Bu hafta ultason ile bebeğinizin görüntüsünü görebilir, kalp atış sesini duyabilirsiniz. Artık bebeğiniz canlıdır diyebiliriz. Bebeğin göbek kordonu oluşur. Gözler, kulaklar ve ağız boşluğu belirmeye başlar. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 6){
	         recommend.text("Haftanız Hakkında Kısa Bilgi : Bebeğinizin boyu 9 mm, kilosu 0,4 gram. Bebeğiniz bu hali ile böğürtlen kadar oldu. Artık 1 ay 19 günlüksünüz. Bebeğinizin gözü oluşturacak tomurcuklar belirmeye başladı. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 7){
	         recommend.text("Haftanız Hakkında Kısa Bilgi: Hamileliğinizin 7. haftasında artık 1 ay 19 günlük oldunuz. Bu hafta bebeğinizin boyu iki katına çıkarak 9 mm oldu, kilosu 0,4 gramdır. 7. haftada bebeğinizin gözü oluşturacak tomurcuklar belirmeye başladı. Bu haftada göz, kulak, ağız,burun, dil taslak halinde oluşmaya başladı. Kol ve bacak tomurcukları oluştu. Akciğer, karaciğer, mide, pankreas, safra kesesi gelişimini sürdürmeye devam ediyor. el, ayak tabakaları oluştu, kalp 4 odacıklı hale geldi. Kalp ortalama 100-120 arasında atıyor. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 8){
	         recommend.text(" Hamileliğinizin 8. haftası:  1 ay 26 günlük oldunuz. Bebeğinizin boyu 13 mm, kilosu ise 1 gr'a ulaştı. El ve ayak tomurcukları artık perdeli yapılar halinde dönüştü. Yani el ve ayakları oluşmaya başladı denilebilir. Bacakları, eklemler, diyafram, diş taslakları oluşmaya başladı. Beyinde sinir üretimi başlıyor. Kulak kepçesi, ağız, üst dudak ve damak oluşumları başlamıştır. Yine bu haftada kalp atımı ultrasonla görüntülenebilir. Bebeğinizin el ve ayak parmakları perdeli olarak oluşmuştur, ilerleyen haftalarda aradaki perdeler kalkacaktır. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 9){
	         recommend.text(" Bu hafta bebeğiniz bir üzüm tanesi kadar. Yani yaklaşık 2.54 cm. El ayak parmakları tamamen oluştu ve perdeli yapı ayrılmaya başladı. Dış kulak ve kulak kepçesi daha da belirginleşmeye başladı. Kalp tamamen yetişkindeki şeklini alıyor. Yumurtalık ve testisler oluştu ama cinsiyet henüz belli değil. Diz eklemleri oluşmaya başladı aynı zamanda bebekte ilk hareketlenmeler bu hafta başlıyor ama anne bu hareketleri hissedemez. Bebeğin ilk hareketlerini anne ilk gebeliğinde 20-21. haftada, daha sonraki gebeliklerde ise 16-17. haftada hissedebilir. Göz gelişimi devam ediyor, gözünü ise 27 haftada açacak. Kan, alyuvar, akyuvarların yapımı başladı. Bu hafta kıkırdak dokuları ve köpürcük kemiği oluşmaya başladı. Bebeğin meme başları belirginleşmeye başladı.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 10){
	         recommend.text("Merhaba Sevgili anne adayı! Artık hamileliğini 10. haftasındasın. Bu hafta itibari ile kötü günler geride kalmaya başlayacak. 10 haftalık hamile olarak 2 Ay 10 (iki buçuk ay denilebilir) günlük gebesiniz. Bebeğinizin boyu 3 cm, kilosu ise 3 gr'a ulaştı. Tırnaklar oluşmaya başladı, erkek bebekte testestoron üretimi başlıyor, kemik oluşumu başlıyor. Bu haftanın genel olarak özeti bu şekilde. 10. haftayı şimdi daha detaylı olarak inceleyelim.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 11){
	         recommend.text("Merhaba Sevgili anne adayı! hamileliğin 11. haftasında 2 ay 17 günlük gebesiniz. Bu hafta itibarı ile bir çok kritik dönemi atlattın. Düşük yapma riskin ortadan kalktı sayılır. Bebeğinizin boyu 6 cm, kilosu 17 gram oldu. Bu hafta itibarı ile bebeğinizin hareketleri iyice artıyor ama anne bu hareketleri hissedemez. Ağzını açmaya başlıyor, dilini hareket ettiriyor, kız bebeklerde yumurtalıklarda yumurta üretimi başlıyor. Cinsiyetini söylemek için henüz erken.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 12){
	         recommend.text("12 haftalık bebek boyu 7,5-8 cm , ağırlığı 23 gram civarındadır. Kemik oluşumu iyice artıyor, el, ayak tırnakları ve bebeğinizin parmak izi tamamen oluştu. Hareketleri iyice belirginleşmeye başladı, gözlerini tamamen kapadı, kız çocuklarda rahim gelişmeye başladı. Göz ve kulaklar asıl alması gereken yerler çekildi. Ses telleri oluşmaya başlıyor. Bebekte vajina ve penis oluşmuş olmasına rağmen cinsiyet için 4 hafta daha beklemeniz gerekecektir. Yeni teknolojilerle bazı doktorlar 12. haftadan itibaren cinsiyetini söylese bile bu tam olarak doğru bir cevap olmaz.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 13){
	         recommend.text("Bebeğiniz yaklaşık 6 cm ve ortalama 40 gram oldu. Bu haftada burun ve dudaklar tamamen oluştu. Bebeğiniz artık karmaşık yüz hareketlerini yapabilir ve bazı araştırmacılara göre gülümseyebilir. Tüm diğer vücudu gibi yüz ifadeleri de hayatının her döneminde değişecek. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 14){
	         recommend.text("Bebeğinizin boyu 12 cm, kilosu 60 gram. İdrar üretimi başlıyor. Bebeğiniz artık daha hareketli el ve avuçlarını açabiliyor, parmağını ağzına götürüp emebiliyor, esneme hareketi yapıyor. Bu hafta tat tomurcukları oluşmaya başladı bebeğiniz artık annenin yediği şeylerin tadını alabiliyor.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 15){
	         recommend.text("Bebeğinizin boyu 15 cm, ağırlığı ortalama 90 gram oldu. Bebeğiniz 15 haftalıkken tüm eklemlerini hareket ettirebiliyor ama siz hala bunu hissedemezsiniz. Bebeğiniz artık hıçkırabiliyor. Bebeğinizin dilindeki tat alma sinirleri oluşmaya başladı. Sonraki haftalarda bebeğiniz sizin yediğiniz tatları alabilecektir. Bu haftadan itibaren bebeğinizin cildini Lanugo adı verilen tüy kaplamaya başlacak, bu tüyler 26. haftadan itibaren tekrar dökülecektir. Bu hafta doktorunuz üçlü tarama testi isteyebilir. Eğer ikili tarama testinizde her şey normal çıktıysa doktorunuz üçlü tarama testi istemeyebilir. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 16){
	         recommend.text("Bebeğinizin boyu ortalamam 17 cm, ağırlığı ise 100 gram. Bebeğinizin bu hafta bol bol hareket eder. Eğer ilk gebeliğinizin değilse artık hareketlerini hissedebilirsiniz. İlk gebeliğiniz ise hareketleri hissetmek için 21. haftayı beklemeniz gerekebilir. Bebeğiniz artık başını dik tutabiliyor. el ve ayak tırnakları uzamaya devam ediyor. Kulak ve gözleri ön kısma gelerek asıl yerini aldı. Genellikle 16-19 hafta arası yapılan üçlü test bu hafta yapılabilir. (Eğer ikili testiniz normal çıkmışsa doktorunuz 3. teste ihtiyaç duymayabilir) Gebeliğin 16. Haftasında bebeğin cinsiyeti kesinleşir. Her ne kadar 13. haftadan itibaren tahmin edilebilse de cinsiyetin kesinleştiği hafta 16. haftadır. Artık alışverişe ve isim aramaya başlayabilirsiniz.  ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }	   
		  if (w == 17){
	         recommend.text("Bebeğin boyu 20 cm, ağırlığı ise 130 gram oldu. Bebeğiniz bol bol hareket etmeye devam ediyor. Cinsiyeti kesinleşti. Hareketleri eğer ilk gebeliğinizse 20 haftadan itibaren siz de hissetmeye başlayacaksınız. 2. ya da daha sonraki gebeliğinizse anne bebeğin hareketlerini 16. haftadan itibaren hissedebilir.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 18){
	         recommend.text("Bebeğin boyu 21 cm, ağırlığı ise 170 gram oldu. Bebeğiniz iyice hareketlenmeye başladı. Bebek anne karnında ufak ufak dalga dalga hareketler yapıyor. Eğer ilk gebeliğiniz ise bu hareketleri henüz hissedemezsiniz. Bu hafta dişleri oluşmaya başlıyor. Bebeğiniz artık bazı şiddetli sesleri duyabiliyor. Ani korna sesi, şiddetli patlama sesi, kapı çarpması gibi. Yine bebeğiniz aşırı hareketli ve sıkı sık pozisyon değiştiriyor. Eğer bebeğiniz erkekse dış genital organları iyice belli olmaya başladı bile. Doktorunuz siz bebeğinizin genital fotoğrafını verebilir. :) El ve ayaklardaki kıvrımlar daha da belirginleşti. Mekanyum adı verilen bebeğin ilk dışkısı bu hafta oluştu. Esneme, hıçkırma, ekşitme gibi yüz mimikleri yapabilir.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 19){
	         recommend.text("Bebeğinizin boyu 23 cm, ağırlığı ise 210 gram oldu. Bu hafta deri üzerinde Vernix caseosa denilen koruyucu bir katman deri üzerinde oluşmaya başladı. Bu madde beyaz kremsi bir yapıya sahip olan madde bebeğinizin cildini kaplayacak ve hamilelik boyunca ve amnion sıvısına sürekli temastan ve sürtünmelerden koruyacak. Bir kaç saat su içerisinde kalsanız cildiniz muhtemelen buruşacak ve zarar görecektir. Bu Vernix caseosa denilen madde bebeği tam olarak bu buruşukluklardan ve zararlardan koruyor.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 20){
	         recommend.text("Bebeğinizin boyu 25 cm, ağırlığı ise 250 gram oldu. Kulak oluşumu 20. hafta itibarı ile tamamlandı. Dışarıdan gelen sesleri artık algılayabiliyor anne adayları artık bebeği ile konuşabilir. Bebeğinize klasik müzik dinletme, ninni söylemenin vakti geldi. Anne 20 haftalık bebek hareketlerini hareketlerini hissedebiliyor. Anne ve bebek arasında bir hareket bağı oluştu. 20 hafta itibari ile artık bebeğin uyku düzeni oluşmaya başladı. Bebeğinizin tıpkı doğmuş bir bebek gibi bazen uyuyor bazen uyanıyor ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 21){
	         recommend.text("Bebeğinizin boyu 28 cm, ağırlığı ise 310 gram. 21 . hafta itibari ile artık büyüme yerini kilo artışına bırakacaktır. Uzama ve büyüme yavaşlıyor artık bebeğiniz kilo almaya başlayacak. Bebeğinizin sindirim sitemi iyece gelişiyor. 21 haftalık gebelikte bebek hareketleri daha da artacaktır. Siz de hareketleri artık daha kolay hissedebiliyorsunuz. Hatta zaman zaman oturup onun hareketlerini dinleyebilirsiniz. Ayrıca bebeğiniz duyabiliyor. Bebeğinize ninni söyleyebilirsiniz.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 22){
	         recommend.text("Bebeğinizin boyu 29 cm, ağırlığı ise 400 gram oldu. tüm organları artık daha da gelişti ve fonksiyonel bir hal almaya başladı. Bebeğiniz artık tıpkı yeni doğan bir bebeğe benzemeye başladı bile. Yeni doğan gibi uyku ve uyanıklık dönemleri var. Dışarıdan gelen sesler onu uyandırabilir. Lütfen ani ve şiddetli seslere maruz bırakmayın. Bebeğiniz önceki haftalara göre daha hızlı kilo almaya başladı. On günde ortalama 100 gram kilo artışı olacaktır. 22 haftalık gebelikte bebek artık kıpır kıpırdır hareketlerini net bir şekilde hissedersiniz.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 23){
	         recommend.text("Boyu 30 cm, ağırlığı da ortalama 500 gram oldu. Bebeğiniz artık sizi duyabiliyor hatta onunla konuşursanız tepki bile verebilir. Bebeğinizin hareketlerini ne olarak hissedebiliyorsunuz. Hatta hareketlerini bile ayırt edebilirsiniz. Tekme mi atıyor, hıçkırıyor mu, esniyor mu bunları bile ayırt etme ihtimaliniz var. 23 haftalık bebek hareketleri kıpır kıpır, kanat çırpması, hıçkırma, esneme şeklindedir.");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 24){
	         recommend.text("Bebeğinizin boyu 31 cm, ağırlığı ise ortalama 600 gram oldu. Bebeğiniz artık daha fazla ve şiddetli hareket ediyor. 24 haftalık gebelikte bebeğinizin hareketlerini artık babası da hissedebilir. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 25){
	         recommend.text("Hamilelik haftanız 26: Bebeğinizin boyu 35 cm, kilosu 850 gram. Bu hafta O’nun yeşil soğan kadar boyu var. Bebeğin göz kapakları bu haftada tamamen açılır ve görme yeteneği kısmen gelişmiştir. Bebeğin çevredeki bazı sesleri duyarak hareket etmesi veya kalp atımının değişmesi mümkündür. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 26){
	         recommend.text("Hamilelik haftanız 27: Bebeğinizin boyu 36 cm, kilosu 1000 gram. O bu hafta koca bir bostan patlıcanı kadar.  Bu haftada bebeğin dilindeki tat tomurcukları oldukça gelişmiştir, örneğin anne çok baharatlı, acı yiyecekler yediğinde bebek bunu algılayabilir. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 27){
	         recommend.text("Hamilelik haftanız 28: Bebeğinizin boyu 38 cm, kilosu 1200 gram. Bir karnabahar kadar oldu. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 28){
	         recommend.text("Hamilelik haftanız 29: Bebeğinizin boyu 39 cm, kilosu 1350 gram. O bir bal kabağı kadar oldu. Bu dönemle beraber bebek çok hızlı bir şekilde kilo almaya başlar. Artık bebeğin en ufak bir hareketi bile anne tarafından rahatlıkla hissedilecektir. Hatta birçok hareketi tekme olarak algılanabilir. Akciğerler artık iyice gelişmeye devam etmektedir. Bununla birlikte kas yapısı da olgunlaşmaktadır. Dolayısıyla bu haftalarda annenin bol miktarda kalsiyum tüketmesi çok önemlidir. Bebeğin kas ve kemik yapısı için bol bol vitamin ve protein içerikli gıdalar tüketmesinde yarar var. Ayrıca bebeğin bu haftayla beraber bağışıklık sistemi oluşmaya başlar. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 29){
	         recommend.text("Hamilelik haftanız 30: Bebeğinizin boyu 40 cm, kilosu 1500 gram.  Bu haliyle bebeğin orta boylu bir lahana kadar. Bu haftada bebek artık neredeyse doğmaya hazırdır diyebiliriz. Şimdiden bebeğinize hoş geldin demelisiniz. Çünkü artık sizi daha net algılıyor. Ruh sağlığı da sizin hamilelik dönemindeki ruh halinizin yansımasıdır. Kilo artışı bu haftada hızla devam eder. Yağ tabakası da gitgide kalınlaşmaktadır. Artık hıçkırıklarını ritmik atışlar şeklinde hissedebilirsiniz. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }	  
		  if (w == 30){
	         recommend.text("Hamilelik haftanız 31: Bebeğinizin boyu 41 cm, kilosu 1650 gram. Bu haliyle bebeğin bir  pırasa kadar. Bebeğin akciğerleri ve sindirim sistemi hemen hemen tamamen gelişmiştir. Bebeğin göz bebeği (iris) ışıkta genişleme  ve daralma yapabilir. Bebeğin cilt altında beyaz yağ depolanmasından dolayı ciltteki kırmızı renk yerini yeni doğan bebeklerdeki gibi pembe renge bırakır. Bebek gün içerisinde düzenli hareket etmeye başlar. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 31){
	         recommend.text("Hamilelik haftanız 32: Bebeğinizin boyu 43 cm, kilosu 1850 gram. Artık Hindistan cevizi kadar. Çalışan anneler için bu haftadan itibaren yasal olarak doğum izni başlar. Eğer kendinizi iyi hissediyorsanız ve doktorunuz da çalışmanızı uygun görüyorsa 37. haftaya kadar çalışmaya devam edebilirsiniz. Yüzündeki kırışıklıklar azalıyor, cilt altı yağ dokusu artmaya devam ediyor bu da cilt görünümünü daha da pembe yapıyor. Ayrıca kolları ve bacakları sevimli tombul görünüme doğru ilerliyor, el ve ayak tırnakları ise tamamen uzadı 🙂 Bebeğiniz doğuma kadar ciddi şekilde kilo almaya devam edecek. Gebeliğinizin 32. haftasından doğuma kadar bebeğinizin hareketlerini daha dikkatli bir şekilde izlemelisiniz ve saymalısınız. 1 saatte kaç kez hareket etti? veya 10 tane hareketi x dakika veya x saatte yapıyor gibi sayısal bilgileri yakından takip etmenizde fayda var. Eğer bebeğiniz az hareket ediyorsa tatlı bir şey yedikten sonra ne kadar hareket ettiğini sayın. Tatlı bir şeyler yemenize rağmen veya eskisine göre bebeğinizin hareketlerinde ciddi bir azalma varsa doktorunuz ile görüşün. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 32){
	         recommend.text("Hamilelik haftanız 33: Bebeğinizin boyu 44 cm, kilosu 2000 gram. Bu hafta bebeğiniz bir ananas kadar. 33 haftalık gebelik döneminde bebeğin çevresindeki pek çok sesi işitir. Yüksek sesler ve gürültülü ortamlar bebeğinin irkilmesine neden olur, onu rahatsız eder. 3Artık doğuma kadar bebeğinizin hareketlerini daha dikkatli bir şekilde izlemelisiniz ve saymalısınız. ciddi bir azalma varsa doktorunuz ile görüşün.  ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 33){
	         recommend.text("Hamilelik haftanız 34: Bebeğinizin boyu 45 cm, kilosu 2200 gram. İrice bir mor lahana kadar. Bu haftada bebeğin akciğer ve diğer organları oldukça olgunlaşmıştır o yüzden bu haftadan itibaren doğan bebeklerde solunum sıkıntısı ve diğer problemler çok az görülür. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 34){
	         recommend.text("Hamilelik haftanız 35: Bebeğinizin boyu 46 cm, kilosu 2500 gram. Bu haliyle Meleğin bu hafta ağırlık olarak bir kavun kadar. Doktorunuz artık sizi haftada bir kontrole çağırmaya başlayacak. Bunun sebebi her kontrolde anne adayına NST adı verilen testi uygulamaktır. Nst testi bir taraftan bebeğin kalp seslerini kaydeder ve bir taraftan da rahmin kasılmalarını kaydetmeye yarar. NST testi ile bebeğin o andaki iyilik halini öğrenebilmek mümkündür. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 35){
	         recommend.text("Hamilelik haftanız 36: Bebeğinizin boyu 47 cm, kilosu 2650 gram. irice bir marul kadar. 36. haftada bebek oldukça geliştiği için bu andan itibaren doğan bebekler genellikle yoğun bakıma gerek kalmadan yaşarlar ve çoğunlukla zamanında doğan bebekler gibi bir sıkıntı yaşamadan hayata devam ederler.  ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 36){
	         recommend.text("Hamilelik haftanız 37: Bebeğinizin boyu 48 cm, kilosu 2800 gram. O, bu hafta artık bir kavun kadar oldu!. Gebelik döneminin 37. haftası itibari ile artık bebeğiniz doğuma hazırdır.  ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 37){
	         recommend.text("Hamilelik haftanız 38: Bebeğinizin boyu 49 cm, kilosu 3000 gram. Bir karpuz kadar oldu. Artık doğum hazılıklarınızı tamamlamanız gerekiyor. Doğum çantanızı yanı başınızdan ayırmayınız. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 38){
	         recommend.text("Hamilelik haftanız 39: Bebeğinizin boyu 50 cm, kilosu 3150 gram. Bu haftalarda bebekte kilo almak dışında pek bir değişiklik olmaz. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 39){
	         recommend.text("Hamilelik haftanız 40: Bebeğinizin boyu 51 cm, kilosu 3350 gram. Bu haftalarda bebekte kilo almak dışında pek bir değişiklik olmaz. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		  if (w == 40){
	         recommend.text("Hamilelik haftanız 41:  Bebeğinizin boyu 52 cm, kilosu 3700 gram. Bu haftalarda bebekte kilo almak dışında pek bir değişiklik olmaz. ");
	         recommendli.show();
	         cw.colourweeks(0, week);
	     }
		
				
	}

	module.exports = {
	    born: born,
	    lastday: lastday,
	    lastweek: lastweek,
	    normal: normal,
	    early: early,
	    veryearly: veryearly,
	    sameday: sameday,
	    future: future
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	var cweeks = {
	    "list": '',
	    "cw1": 0,
	    "cw2": 0,
	}

	function savelist(l){
	    cweeks.list = l;
	}

	function colourweeks(x, y){
	    cweeks.cw1 = x;
	    cweeks.cw2 = y;
	    var zcw1 = cweeks.list.find('.i'+ cweeks.cw1);
	    var zcw2 = cweeks.list.find('.i'+ cweeks.cw2);
	    zcw1.css("background-color", "#66AFE9");
	    zcw2.css("background-color", "#66AFE9");
	}

	function whitencolourweeks(){
	    var zcw1 = (cweeks.list).find('.i'+ cweeks.cw1);
	    var zcw2 = (cweeks.list).find('.i'+ cweeks.cw2);
	    zcw1.css("background-color", "#fff");
	    zcw2.css("background-color", "#fff");
	}

	module.exports = {
	    savelist: savelist,
	    colourweeks: colourweeks,
	    whitencolourweeks: whitencolourweeks
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var date_functions = __webpack_require__(1);

	function born(){return '';}
	function lastday(fpp, fppli, date){_render(fpp, fppli, date);}
	function lastweek(fpp, fppli, date){_render(fpp, fppli, date);}
	function normal(fpp, fppli, date){_render(fpp, fppli, date);}
	function early(fpp, fppli, date){_render(fpp, fppli, date);}
	function veryearly(fpp, fppli, date){_render(fpp, fppli, date);}
	function sameday(fpp, fppli, date){_render(fpp, fppli, date);}
	function future(fpp, fppli, date){}

	function fechaprobableparto(d){
	    d.setDate(d.getDate() + 280);
	    return ("Muhtemel doğum tarihiniz: " + date_functions.normalFormat(d) + ' - ' + date_functions.numFormat(d));
	}

	function _render(fpp, fppli, d){
	    fpp.text(fechaprobableparto(d));
	    fppli.show();
	}

	module.exports = {
	    born: born,
	    lastday: lastday,
	    lastweek: lastweek,
	    normal: normal,
	    early: early,
	    veryearly: veryearly,
	    sameday: sameday,
	    future: future,
	    fechaprobableparto: fechaprobableparto
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	function born(state, stateli, d){}
	function lastday(state, stateli, d){ _render(state, stateli, d); }
	function lastweek(state, stateli, d){ _render(state, stateli, d); }
	function normal(state, stateli, d){ _render(state, stateli, d); }
	function early(state, stateli, d){ _render(state, stateli, d); }
	function veryearly(state, stateli, d){}
	function sameday(state, stateli, d){}
	function future(state, stateli, d){}

	function estado(d){
	    var estado = 280 - d;
	    return (" Gebeliğinizde " + d + " günü geride bıraktınız. Doğuma " + estado + " gün kaldı.");
	}

	function _render(state, stateli, d){
	    state.text(estado(d));
	    stateli.show();
	}

	module.exports = {
	    born: born,
	    lastday: lastday,
	    lastweek: lastweek,
	    normal: normal,
	    early: early,
	    veryearly: veryearly,
	    sameday: sameday,
	    future: future,
	    estado: estado
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	function born(){return '';}
	function lastday(m, t, month, trimester, monthli, trimesterli){_render(m, t, month, trimester, monthli, trimesterli);}
	function lastweek(m, t, month, trimester, monthli, trimesterli){_render(m, t, month, trimester, monthli, trimesterli);}
	function normal(m, t, month, trimester, monthli, trimesterli){_render(m, t, month, trimester, monthli, trimesterli);}
	function early(m, t, month, trimester, monthli, trimesterli){_render(m, t, month, trimester, monthli, trimesterli);}
	function veryearly(m, t, month, trimester, monthli, trimesterli){_render(m, t, month, trimester, monthli, trimesterli);}
	function sameday(m, t, month, trimester, monthli, trimesterli){_render(m, t, month, trimester, monthli, trimesterli);}
	function future(m, t, month, trimester, monthli, trimesterli){}

	function _render(m, t, month, trimester, monthli, trimesterli){
	    month.text("Gebeliğinizin : "  + m + ". ayındasınız " );
	    trimester.text('Trimester: ' + t);
	    monthli.show();
	    trimesterli.show();
	}

	module.exports = {
	    born: born,
	    lastday: lastday,
	    lastweek: lastweek,
	    normal: normal,
	    early: early,
	    veryearly: veryearly,
	    sameday: sameday,
	    future: future
	};


/***/ }
/******/ ]);

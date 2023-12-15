//CARGAMOS LOS DATOS DE LAS ACTIVIDADES CON ARRAYS
var titulo_es = ["Crossfit", "Haltero", "Gymnastics", "Mobility", "Competitors", "Academy"];
var texto_es = ["Clases dirigidas que estan formadas de un Warm-up, un apartado de fuerza y el WOD principal",
    "Clases especificas de los movimientos principales de halterofilia (squat clean, back squat, strict press...)",
    "Clases especificas de los movimientos principales gimnasticos (pull ups, muscle ups, handstand walk...)",
    "Clases enfocadas a la ganancia de ROM (rango optimo e movimiento).",
    "Clases de programacion mas especifica enfocada al crosffit de competicion. Si te gusta el crossfit y deseas tener mas nivel esta es tu clase.",
    "Clases dirigidas principalmente a la ganancia de fuerza y desarrollo de skills (habilidades mas tecnicas que nos valen para tranferirlos a los entrenos de crossfit).",
];

var titulo_eus = ["Crossfit", "Halteroa", "Gimnasia", "Mugikortasuna", "Lehiakideak", "Academia"];
var texto_eus = ["Beroketa, indar atal bat eta WOD nagusia osatzen duten klase zuzenak",
    "Halterofiliako mugimendu nagusien klase zehatzak (squat clean, back squat, press zorrotza ...)",
    "Mugimendu gimnastiko nagusien klase espezifikoak (tiraderak, giharrak, eskuko oinez ...)",
    "Programazio klase zehatzagoak lehiaketa lehiaketetara bideratuta daude. Crossfit gustatzen bazaizu eta maila altuagoa izan nahi baduzu hau da zure klasea.",
    "Indarrak hartu eta trebetasunak garatzera bideratutako klaseak (crossfit entrenamendura transferitzea merezi duten trebetasun tekniko gehiago).",
];



$(document).ready(function () {
    loadCategorias();
    $('#categoria').change(function (event) {
        cargarCategoria(event);
    });




})

//DEPENDIENDO DE LA ACTIVIDAD QUE CLIQUE CAMBIAMOS LOS DATOS

function datos(id) {

    if (window.location.href.search(/#eu/) !== -1) {

        $('#modal-titulo').html(titulo_eus[id]);
        $('#modal-texto').html(texto_eus[id]);

    } else {
        $('#modal-titulo').html(titulo_es[id]);
        $('#modal-texto').html(texto_es[id]);
    }
}

function loadCategorias() {

    // La variable url está declarada en main.js y esta contiene el path actual del navegador
    $.ajax({
        url: url + 'controller/cSelectCategorias.php',
        method: 'GET',
        contentType: 'application/json',
        dataType: 'json'
    }).done(response => {
        response.list.forEach(categoria => {
            $('#categoria').html(function (i, content) {
                return `${content}<option value="${categoria.idCategoria}">${categoria.nombre}</option>`;
            });
        })
    })
}
function changeBodyClaroIndex() {
   
    var modo1 = $('#modoclaro1').html();

    if (modo1 === "Modo Claro") {
        
        $('#modoclaro1').html("Modo Oscuro");
        //Para el index

        $("#img1").attr('src', url + 'view/iconos/historia.png');
        $("#img2").attr('src', url + 'view/iconos/localizacion.png');
        $("#img3").attr('src', url + 'view/iconos/coaches.png');
        $("#img4").attr('src', url + 'view/iconos/actividades.png');
        $("#img5").attr('src', url + 'view/iconos/horario.png');
        $("#img6").attr('src', url + 'view/iconos/tarifas.png');
        $("#img7").attr('src', url + 'view/iconos/atletas.png');

        document.body.style.background = 'white';

        $("#navbar").css("background-color", "#bfbcb2");
        $("#navbar a").css("color", "black");
        $("h2").css("color", "black");
        $(".texto-light").css("color", "black");
        $("#xx").css("color", "black");
        $("#langtext2").css("color", "black");
        $(".coachtable .info").css("background-color", "black").css("color", "white");
        $("#yy").css("color", "black");
        $("#footer").css("color", "grey");
        $(".enlace").css("color", "white");
        $("dl").css("color", "black");
        $("td").css("color", "black");
        $("th").css("color", "black");
        $("#div1, #div2, #div3").css("background-color", "#283747");
        $("footer").css("background-color", "#bfbcb2");
        $("footer a").css("color", "black");

    }
    if (modo1 === "Modo Oscuro") {
        
        $('#modoclaro1').html("Modo Claro");

        $("#img1").attr('src', url + 'view/iconos/historia1.png');
        $("#img2").attr('src', url + 'view/iconos/localizacion1.png');
        $("#img3").attr('src', url + 'view/iconos/coaches1.png');
        $("#img4").attr('src', url + 'view/iconos/actividades1.png');
        $("#img5").attr('src', url + 'view/iconos/horario1.png');
        $("#img6").attr('src', url + 'view/iconos/tarifas1.png');
        $("#img7").attr('src', url + 'view/iconos/atletas1.png');

        document.body.style.background = 'black';

        $("#navbar").css("background-color", "black");
        $("h2").css("color", "white");
        $(".texto-light").css("color", "white");
        $("#navbar a").css("color", "black");
        $("#xx").css("color", "white");
        $("#langtext2").css("color", "white");
        $(".coachtable .info").css("background-color", "white").css("color", "black");
        $("#yy").css("color", "white");
        $("#footer").css("color", "black");
        $(".enlace").css("color", "#008CBA");
        $("dl").css("color", "white");
        $("td").css("color", "white");
        $("th").css("color", "white");
        $("#div1, #div2, #div3").css("background-color", "white");
        $("footer").css("background-color", "black");
        $("footer a").css("color", "white");

    }

}
//Idiomas

$("#es_index").click(function () {
    loadCategorias();
    $("#historia_tit").html("Historia");
    $("#instalaciones").html("Conoce nuestras instalaciones");
    $("#competiciones").html("Competiciones");
    $("#categoria").html("Categorias");
    $("#entrenador").html("Coaches");
    $("#hora").html("Horarios");
    $("#actividad").html("Actividades");
    $("#xx").html("CrossFit es una técnica de entrenamiento que conecta movimientos de diferentes disciplinas, tales como la halterofilia, el entrenamiento metabólico o el gimnástico. Consiste en acometer un programa de ejercicios (flexiones, tracción, etc), en un tiempo determinado y con un número definido de veces. Esta noción tiene como principio mantener intacta la motivación de los deportistas a largoplazo. Se puede realizar de manera individual o en grupo, y las sesiones suelen ser cortas, variadas y adaptables en función del nivel de cada participante.");
    $("#langtext2").html("El creador del CrossFit, Greg Glassman ha diseñado varios grupos, unos bautizados con nombres de mujeres en referencia a los huracanes americanos, y otros con nombres de héroesmilitares, policías, o bomberos, entre otros, como homenaje.Existen también otros grupos que no tienen nombre, simplemente la descripción de los ejercicios.El tiempo de ejecución de cada grupo puede variar, desde solo 5 minutos hasta casi 30 minutos, sin contar el calentamiento y la vuelta a la calma.");
    $("#yy").html(" Nuestro centro deportivo de alto rendimiento se encuentra a escasos metros de la parada de tren de Zuhatzu, Galdakao.Si quieres probar tus habilidades ven a vernos.\n" +
        "<br><span>PRIMERA CLASE GRATIS.</span><br>");
    $("#langtext4").html("¿Quieres participar en una competición? <br>Te gustaria desafiarte a ti mismo poniendote a prueba contra las personas mas entrenadas del mundo.<br>Descubre las competiciones mas competitivas de este deporte.");
    $("#categoria-titulo").html("Tarifas");
    $("#l").html("Lunes");
    $("#ma").html("Martes");
    $("#mi").html("Miercoles");
    $("#j").html("Jueves");
    $("#v").html("Viernes");
    $("#s").html("Sabado");


})

$("#eus_index").click(function () {
    loadCategorias();
    $("#historia_tit").html("Historia");
    $("#instalaciones").html("Ezagutu gure instalazioak");
    $("#competiciones").html("Konpetizioak");
    $("#categoria").html("Kategoriak");
    $("#entrenador").html("Entrenatzaileak");
    $("#hora").html("Ordutegiak");
    $("#actividad").html("Aktibitateak");
    $("#xx").html("CrossFit diziplina desberdinetako mugimenduak lotzen dituen entrenamendu teknika da, hala nola halterofilia, entrenamendu metabolikoa edo gimnasia. Ariketa programa bat egitean datza (push-ups, trakzioa, etab.), Denbora jakin batean eta denbora kopuru jakin batekin. Ideia honen printzipioa kirolarien motibazioa epe luzera mantentzea da. Bakarka edo taldeka egin daiteke, eta saioak laburrak, askotarikoak eta moldagarriak izan ohi dira partaide bakoitzaren mailaren arabera.");
    $("#langtext2").html("Greg Glassman CrossFit-en sortzaileak hainbat talde diseinatu ditu, batzuk emakume izenekin bataiatuak Amerikako urakanak aipatuz eta beste batzuk heroi militarren, polizien edo suhiltzaileen izenekin, besteak beste, omenaldi gisa. Izenik ez duten beste talde batzuk ere badaude, ariketen deskribapena besterik ez. Talde bakoitzaren iraupena 5 minututik ia 30 minutura arte alda daiteke, beroketa eta hozte kontutan hartu gabe.");
    $("#yy").html("Errendimendu handiko gure kiroldegia Zuhatzu, Galdakaoko tren geltokitik metro gutxira dago. Zure gaitasunak probatu nahi badituzu, etorri gurekin. <p> DOAKO LEHEN KLASEA.");
    $("#langtext4").html("Nahi duzu parte hartu lehiaketa batean? Zeure buruari desafioa egin nahi zenioke trebatuenen aurka proba eginez. Ezagutu kirol honetako lehiaketa lehiakorrenak.");
    $("#categoria-titulo").html("Tarifak");
    $("#l").html("Astelehena");
    $("#ma").html("Asteartea");
    $("#mi").html("Asteazkena");
    $("#j").html("Osteguna");
    $("#v").html("Ostirala");
    $("#s").html("Larunbata");

})

$("#eus_contacto").click(function () {

    $('.titulo_contacto').html("KONTAKTUAK");
    $('.texto_contacto').html("ESKATU DOAKO PROBAKO KLASEAK EDO GALDERA EGIN DEZAGUN");
    $('.texto_covid').html("COVID-19 agerraldi berriak kontrolatu eta saihesteko, instalazio mota horiek hainbat jarraibide eta arreta-neurri ari dira gauzatzen, ahalik eta seguruen egiteko. Horien artean, eta Berjonek gogoratzen duenez, edukierak mugatu dira, eta aldez aurreko hitzorduak eta ordutegi-txandak ezarri dira. Gainera, nahitaezkoa da instalazioetan maskara erabiltzea inolako jarduerarik egiten ez den bitartean, eta eskuak gel hidroalkoholikoarekin desinfektatzea, bai eta saioa amaitutakoan erabilitako materiala ere.");
    $('.texto_covid2').html("Aipatutako neurrietatik, birologoarentzat garrantzitsuena edukiera murriztea da, edo aldez aurretik hitzordua eskatuta edo itxita, eremu bakoitzeko pertsona-kopuru jakin batera iristen denean. Horrela, errazagoa da instalazioetara doazen erabiltzaileen arteko segurtasun-distantzia bermatzea. Gainera, ariketa-eremuak bereizten ditu.");
    $('.titulo_contacto2').html(" KOKAPENA ");
    $('.texto_contacto2').html(" GURE HELMUGA EZ DA INOIZ LEKU BAT, GAUZAK IKUSTEKO MODU BERRI BAT BAIZIK");
    $('#instalaciones').html("Instalazioak");

})

$("#es_contacto").click(function () {

    $('.titulo_contacto').html("CONTACTO");
    $('.texto_contacto').html("PIDE TUS CLASES DE PRUEBA GRATUITA O PREGUNTANOS CUALQUIER DUDA");
    $('.texto_covid').html("Para controlar y evitar nuevos brotes de COVID-19, este tipo de instalaciones está llevando a cabo una serie de pautas y medidas de precaución, de cara a hacerlas lo más seguras posibles. Entre ellas y como recuerda Berjón, se han limitado aforos y establecido citas previas y turnos horarios. Además, es obligatorio el uso de mascarilla en las instalaciones mientras no se está realizando ninguna actividad y la desinfección de manos con gel hidroalcohólico, así como la del material utilizado una vez se acaba la sesión con él.");
    $('.texto_covid2').html("De las medidas comentadas, la más importante para el virólogo es la reducción del aforo, o bien por cita previa o cerrandolo cuando se llega a un número de personas por zona. De esta manera, es más fácil garantizar la distancia de seguridad entre los usuarios que acudan a las instalaciones. Además, distingue entre las distintas zonas de ejercicio.");
    $('.titulo_contacto2').html(" LOCALIZACIÓN");
    $('.texto_contacto2').html("Nuestro destino nunca es un lugar, sino una nueva forma de ver las cosas");
    $('#instalaciones').html("Instalaciones");


})

$("#eus_competis").click(function () {

    $('.titulo_principal').html("Konpetizioak");
    $('#textComp1').html("<p> Lehiaketa hau uda guztietan ospatzen da 2007ko ekainaren 30az geroztik eta bertan, atletak pistara irten baino ordu batzuk lehenago ematen zaizkien ariketa errutinetan lehiatzen dira. Errutina horietako askok igogailu estandarrak eta gimnasia mugimenduak biltzen dituzte, baina batzuetan CrossFit erregimen tipikoaren parte ez diren harridura elementuak biltzen dituzte; gertaera batzuetan igeriketa edo trebetasun ariketak daude, hala nola pilotak jaurtitzea. </p> <p> Gertaera hau Lurreko jenderik egokienak edo Lurreko egokienak ezagutzeko eskaintzen da. </p>");
    $('#textComp2').html("<p> Egungo sailkapen moduetako bat dira eta 2019tik eskualde zaharrak ordezkatzen dituzte. Zigortutako gertaerak CrossFit® markarekin loturarik ez zuten Fitness lehiaketak dira, beraz CrossFit-en paraleloan lan egin zuten Jokoak. </p> <p> Erregionalak deuseztatu zirenean, jokoen antolaketa lehiaketa horietako batzuekin harremanetan jarri zen CrossFit txapelketako partaide izateko eta, beraz, zigortutako Ekitaldi bakoitzeko irabazleek fase bat sortzeko. CrossFit Jokoetarako sailkapen zuzena izango lukete. 2019ko edizioan, aurrez fase honetan parte hartzeko baldintzak betetzen zituzten 15 gertaera zituzten jada </p> ");
    $('#textComp3').html("<p> Spartan Race distantzia eta zailtasun desberdinetako oztopo ibilbide sorta da. 3 kilometrotik maratoiko distantzietara doaz. Estatu Batuetan egiten dira batez ere, baina 30 herrialdetan ere izaten dira, Kanada, Hego Korea, Australia, Txile eta Europako hainbat herrialdetan. </p> <p> Lasterketa honen formak honako hauek dira: Spartan Sprint, non 3 mila 20 oztoporekin korrika egiten duzun, Spartan Super, 8 mila 25 oztoporekin, Spartan Beast, 13 milia 30 oztoporekin eta Spartan Ultra, 30 kilometro eta 60 oztopo. 11 Oztopoak berez aldatu egiten dira arraza batetik bestera .. </p> ");
})


$("#es_competis").click(function () {

    $('.titulo_principal').html("Competiciones");
    $('#textComp1').html(" <p>Esta competición se lleva a cabo cada verano desde el 30 de junio de 2007 y en ella, los atletas compiten en rutinas de ejercicios que les son entregadas pocas horas antes de salir a la pista. Muchas de estas rutinas, comprenden levantamientos estándar y movimientos gimnásticos, pero a veces incluyen elementos sorpresa que no forman parte del régimen típico de CrossFit; en algunos eventos se incluye la natación o ejercicios de habilidad como lanzamiento de pelotas..</p> <p>Este evento va dedicado a descubrir a las personas más en forma sobre La Tierra o «Fittest on Earth».</p>");
    $('#textComp2').html(" <p> Son uno de los modos de clasificación actuales y que sustituyen a los antiguos Regionals desde 2019. Los Sanctioned Events son competiciones ya existentes de Fitness que no estaban relacionadas con la marca CrossFit®, por lo que funcionaban de forma paralela a los CrossFit Games.</p> <p> Al suprimirse los Regionals, la organización de los juegos contactó con varias de estas competiciones para que pasasen a formar parte del campeonato de CrossFit y así crear una fase en la que los ganadores de cada Sanctioned Event, tendrían una clasificación directa para los CrossFit Games. En la edición de 2019, ya contaban con 15 eventos que cumplían los requisitos para formar parte de esta fase previa </p>");
    $('#textComp3').html(" <p>Spartan Race es una serie de carreras de obstáculos de distancias diversas y dificultades varias. Van desde las 3 millas hasta distancias de maratón. Se llevan a cabo principalmente en los Estados Unidos, pero también se realizan en 30 países, incluidos Canadá, Corea del Sur, Australia, Chile y varios países europeos. </p> <p> Las formas de esta carrera incluyen el Spartan Sprint, donde se corren 3 millas con 20 obstáculos, el Spartan Super, de 8 millas con 25 obstáculos, la Spartan Beast, de 13 millas con 30 obstáculos, y el Spartan Ultra, de 30 millas con 60 obstáculos. 11​ Los obstáculos en sí también varían de una carrera a otra..</p>");
})




function cargarCategoria(event) {
    const data = {
        idCategoria: event.target.value
    };
    // La variable url está declarada en main.js y esta contiene el path actual del navegador
    $.ajax({
        url: url + 'controller/cCategoriaId.php',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(response => {
        const categoria = response.answer;
        let content = '';
        if (typeof (response.answer) === 'object') {
            content = `
            <div class="card bg-dark text-light" style="width: 18rem;">
                <div class="card-title m-0 px-3">
                    <h5 class="card-title display-4">${categoria.nombre}</h5>
                    <hr class="bg-light"> 
                </div>
                <div class="card-body pt-0 text-left">
                    <p class="ml-5">Edades: ${categoria.edad}</p>
                    <p class="ml-5"><h1 class="text-center display-1"> ${categoria.precio} €</h1></p>
                    <p class="ml-5">Clases impartidas: Crossfit, Haltero, Gymnastics, Mobility..</p>
                </div>
            </div>`;
        }
        $('#card-categoria').html(content);
    })
}
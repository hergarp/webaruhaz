/* global termekObejektum */

$(function () {
    $("#kuld").click(mentes);
    $("#torol").click(torol);
    $.ajax(
            {url: "termekek.json",
                success: function (result) {
                    termekekTomb = (result);
                    kiir();
                }
            }
    );

    $("#torol").click(function () {
        $("article").remove("th");

    });
    $("article").on("click", "th", rendez);
}
);
var termekekTomb = [];
function mentes() {
    var termekObjektum = {};
    termekObjektum.nev = $("#nev").val();
    termekObjektum.cikkszam = $("#cikkszam").val();
    termekObjektum.ar = $("#ar").val();

    if ($("input:radio[name=keszleten]:checked").val() === "van") {
        termekObjektum.keszlet = "van";
    } else {
        termekObjektum.keszlet = "nincs";
    }
    termekObjektum.db = $("#darab").val();
//    var termekObejktum = {
//        név: $("#nev").val(),
//        cikkszám: $("#cikkszam").val(),
//        ár: $("#ar").val(),
//        mirelit: true,
//        db: $("#darab").val()
//    };
    termekekTomb.push(termekObjektum);
    console.log(termekObjektum);
    kiir();
}
var irany = true;
function kiemel() {
    $(this).toggleClass("kiemel");
}
function kiir() {

    $("article").empty();
    $("article").append("<table>");
    $("article table").append("<tr></tr>");
    for (var item in termekekTomb[0]) {
        $("article table tr").append("<th id='" + item + "'>" + item + " </th>");

    }
    $("article table tr").append("<th>Törlés</th>");
    for (let i = 0; i < termekekTomb.length; i++) {
        $("article table").append("<tr>");
        for (var item in termekekTomb[i]) {
//            console.log("aktuális objektum " + JSON.stringify(tomb[i]));
//            console.log("aktuális kulcs: " + item);
//            console.log("aktuális kulcshoz tartozó elem: " + tomb[i][item]);
            $("article table tr").eq(i + 1).append("<td>" + termekekTomb[i][item] + " </td>");

        }
        ;
        $("article table tr").eq(i + 1).append("<td>" + "<button id='" + i + "'>TÖRÖL</button>" + " </td>");
        $("#" + i).click(function () {
            console.log(i);
            $("article table tr").eq(i + 1).remove();
            termekekTomb.splice(i, 1);
//             kiir();
        }
        );
    }
    $("article th").hover(kiemel);
}
function torol() {
    $("#nev").val(null);
    $("#cikkszam").val(null);
    $("#ar").val(null);
    $("#darab").val(null);
}
function rendez() {
    var mezo = $(this).attr("id");

    if (mezo === "Név") {
        // rendezzük a tömböt Név szerint!
        if (irany) {
            termekekTomb.sort(
                    function (a, b) {
                        return a[mezo] - b[mezo];
                    }
            );
        } else {
            termekekTomb.sort(
                    function (a, b) {
                        return b[mezo] - a[mezo];
                    }
            );

        }

    } else {
        //rendezzük név szerint
        if (irany) {
            termekekTomb.sort(
                    function (a, b) {
                        return Number(a[mezo] > b[mezo]) - 0.5;
                    }
            );
        } else {
            termekekTomb.sort(
                    function (a, b) {
                        return Number(a[mezo] < b[mezo]) - 0.5;
                    }
            );
        }

    }
    irany = !irany;
    console.log("aktuális objektum " + JSON.stringify(termekekTomb));
    kiir();
}
//$("article th").hover( kiemel);

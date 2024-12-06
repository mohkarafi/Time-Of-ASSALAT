
// On créait un objet pour remplir les villes
let villes = [
    "Casablanca", "Rabat", "Tanger", "Agadir", "Fes", "kenitra"
]
// Ajouter les villes à l'élément select
for (let ville of villes) {
    let content = `
    <option>${ville}</option>
    `
    document.getElementById('options').innerHTML += content

}
// Modifier les horaires de la prière en fonction de la ville sélectionnée
document.getElementById('options').addEventListener('change', function () {
    let villeNom = "";
    for (ville of villes) {
        if (this.value == ville)
            villeNom = ville

    }
    HoraireSelonlaVille(villeNom);
    document.getElementById('ville').innerHTML = options.value;
    let villeDedansLACarte = document.getElementsByClassName("villeDedansLACarte")
    for (elemnt of villeDedansLACarte) {
        elemnt.innerHTML = options.value
    }

})
// Une fonction pour appeler l'API d'ASALAT avec la librairie Axios, et ajouter l'horaire de la prière selon la prière

function HoraireSelonlaVille(VilleNom) {

    let params = {
        country: "MA",
        city: VilleNom
    }

    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then(function (response) {
            const timings = response.data.data;
            const LeJour = timings.date.hijri.weekday.en
            const NombreDEJour = timings.date.hijri.day
            const LeMois = timings.date.hijri.month.en

            let laDate = document.getElementById('laDate')
            laDate.innerHTML = LeJour + " " + NombreDEJour + " " + LeMois


            TimePourLaPriere("FAJR-HORAIRE", (timings.timings.Fajr))
            TimePourLaPriere("CHOROK-HORAIRE", (timings.timings.Sunrise))
            TimePourLaPriere("DOHR-HORAIRE", (timings.timings.Dhuhr))
            TimePourLaPriere("ASR-HORAIRE", (timings.timings.Asr))
            TimePourLaPriere("MAGHREB-HORAIRE", (timings.timings.Maghrib))
            TimePourLaPriere("ICHAE-HORAIRE", (timings.timings.Isha))
        })


        .catch(function (error) {
            console.log(error);
        })


}
function TimePourLaPriere(id, time) {
    document.getElementById(id).innerHTML = time
}
// Initialiser les horaires de prière selon la ville de Casablanca
HoraireSelonlaVille("casablanca");


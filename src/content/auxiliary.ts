export type AuxiliaryItem = {
  id: string;
  verb: string;
  context: string;
  correct: string;
  options: string[];
  category: "vandertramp" | "reflexive" | "ambiguous" | "avoir";
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeOptions(correct: string, wrong1: string, wrong2: string): string[] {
  return shuffle([correct, wrong1, wrong2]);
}

export const auxiliaryItems: AuxiliaryItem[] = [
  // DR MRS VANDERTRAMP (être verbs)
  { id: "a1", verb: "aller", context: "Elle ___ à Paris hier.", correct: "Elle est allée à Paris hier.", options: makeOptions("Elle est allée à Paris hier.", "Elle a allée à Paris hier.", "Elle est allé à Paris hier."), category: "vandertramp" },
  { id: "a2", verb: "venir", context: "Ils ___ nous voir.", correct: "Ils sont venus nous voir.", options: makeOptions("Ils sont venus nous voir.", "Ils ont venus nous voir.", "Ils sont venues nous voir."), category: "vandertramp" },
  { id: "a3", verb: "arriver", context: "Le train ___ en retard.", correct: "Le train est arrivé en retard.", options: makeOptions("Le train est arrivé en retard.", "Le train a arrivé en retard.", "Le train est arrivée en retard."), category: "vandertramp" },
  { id: "a4", verb: "partir", context: "Nous ___ tôt ce matin.", correct: "Nous sommes partis tôt ce matin.", options: makeOptions("Nous sommes partis tôt ce matin.", "Nous avons partis tôt ce matin.", "Nous sommes parties tôt ce matin."), category: "vandertramp" },
  { id: "a5", verb: "entrer", context: "Elle ___ dans la pièce.", correct: "Elle est entrée dans la pièce.", options: makeOptions("Elle est entrée dans la pièce.", "Elle a entrée dans la pièce.", "Elle est entré dans la pièce."), category: "vandertramp" },
  { id: "a6", verb: "sortir", context: "Il ___ de la maison.", correct: "Il est sorti de la maison.", options: makeOptions("Il est sorti de la maison.", "Il a sorti de la maison.", "Il est sortie de la maison."), category: "vandertramp" },
  { id: "a7", verb: "monter", context: "Elle ___ au premier étage.", correct: "Elle est montée au premier étage.", options: makeOptions("Elle est montée au premier étage.", "Elle a montée au premier étage.", "Elle est monté au premier étage."), category: "vandertramp" },
  { id: "a8", verb: "descendre", context: "Ils ___ du bus.", correct: "Ils sont descendus du bus.", options: makeOptions("Ils sont descendus du bus.", "Ils ont descendus du bus.", "Ils sont descendues du bus."), category: "vandertramp" },
  { id: "a9", verb: "naître", context: "Mon frère ___ en 1990.", correct: "Mon frère est né en 1990.", options: makeOptions("Mon frère est né en 1990.", "Mon frère a né en 1990.", "Mon frère est née en 1990."), category: "vandertramp" },
  { id: "a10", verb: "mourir", context: "Le soldat ___ au combat.", correct: "Le soldat est mort au combat.", options: makeOptions("Le soldat est mort au combat.", "Le soldat a mort au combat.", "Le soldat est morte au combat."), category: "vandertramp" },
  { id: "a11", verb: "rester", context: "Elle ___ à la maison.", correct: "Elle est restée à la maison.", options: makeOptions("Elle est restée à la maison.", "Elle a restée à la maison.", "Elle est resté à la maison."), category: "vandertramp" },
  { id: "a12", verb: "tomber", context: "Il ___ par terre.", correct: "Il est tombé par terre.", options: makeOptions("Il est tombé par terre.", "Il a tombé par terre.", "Il est tombée par terre."), category: "vandertramp" },
  { id: "a13", verb: "revenir", context: "Nous ___ à minuit.", correct: "Nous sommes revenus à minuit.", options: makeOptions("Nous sommes revenus à minuit.", "Nous avons revenus à minuit.", "Nous sommes revenues à minuit."), category: "vandertramp" },
  { id: "a14", verb: "devenir", context: "Elle ___ médecin.", correct: "Elle est devenue médecin.", options: makeOptions("Elle est devenue médecin.", "Elle a devenue médecin.", "Elle est devenu médecin."), category: "vandertramp" },
  { id: "a15", verb: "rentrer", context: "Je ___ tard hier soir.", correct: "Je suis rentré tard hier soir.", options: makeOptions("Je suis rentré tard hier soir.", "J'ai rentré tard hier soir.", "Je suis rentrée tard hier soir."), category: "vandertramp" },
  { id: "a16", verb: "retourner", context: "Elle ___ en France.", correct: "Elle est retournée en France.", options: makeOptions("Elle est retournée en France.", "Elle a retournée en France.", "Elle est retourné en France."), category: "vandertramp" },
  { id: "a17", verb: "passer", context: "Nous ___ par Lyon.", correct: "Nous sommes passés par Lyon.", options: makeOptions("Nous sommes passés par Lyon.", "Nous avons passés par Lyon.", "Nous sommes passées par Lyon."), category: "vandertramp" },
  
  // REFLEXIVE VERBS (always être)
  { id: "a18", verb: "se lever", context: "Elle ___ tôt ce matin.", correct: "Elle s'est levée tôt ce matin.", options: makeOptions("Elle s'est levée tôt ce matin.", "Elle s'a levée tôt ce matin.", "Elle s'est levé tôt ce matin."), category: "reflexive" },
  { id: "a19", verb: "se coucher", context: "Ils ___ à onze heures.", correct: "Ils se sont couchés à onze heures.", options: makeOptions("Ils se sont couchés à onze heures.", "Ils se ont couchés à onze heures.", "Ils se sont couchées à onze heures."), category: "reflexive" },
  { id: "a20", verb: "se laver", context: "Je ___ les mains.", correct: "Je me suis lavé les mains.", options: makeOptions("Je me suis lavé les mains.", "Je me ai lavé les mains.", "Je me suis lavée les mains."), category: "reflexive" },
  { id: "a21", verb: "se réveiller", context: "Tu ___ en sursaut.", correct: "Tu t'es réveillé en sursaut.", options: makeOptions("Tu t'es réveillé en sursaut.", "Tu t'as réveillé en sursaut.", "Tu t'es réveillée en sursaut."), category: "reflexive" },
  { id: "a22", verb: "s'habiller", context: "Elle ___ vite.", correct: "Elle s'est habillée vite.", options: makeOptions("Elle s'est habillée vite.", "Elle s'a habillée vite.", "Elle s'est habillé vite."), category: "reflexive" },
  { id: "a23", verb: "se promener", context: "Nous ___ dans le parc.", correct: "Nous nous sommes promenés dans le parc.", options: makeOptions("Nous nous sommes promenés dans le parc.", "Nous nous avons promenés dans le parc.", "Nous nous sommes promenées dans le parc."), category: "reflexive" },
  { id: "a24", verb: "se souvenir", context: "Je ___ de toi.", correct: "Je me suis souvenu de toi.", options: makeOptions("Je me suis souvenu de toi.", "Je me ai souvenu de toi.", "Je me suis souvenue de toi."), category: "reflexive" },
  { id: "a25", verb: "se taire", context: "Elle ___ pendant le film.", correct: "Elle s'est tue pendant le film.", options: makeOptions("Elle s'est tue pendant le film.", "Elle s'a tue pendant le film.", "Elle s'est tui pendant le film."), category: "reflexive" },
  { id: "a26", verb: "s'asseoir", context: "Ils ___ près de la fenêtre.", correct: "Ils se sont assis près de la fenêtre.", options: makeOptions("Ils se sont assis près de la fenêtre.", "Ils se ont assis près de la fenêtre.", "Ils se sont assises près de la fenêtre."), category: "reflexive" },
  { id: "a27", verb: "s'en aller", context: "Elle ___ sans dire au revoir.", correct: "Elle s'en est allée sans dire au revoir.", options: makeOptions("Elle s'en est allée sans dire au revoir.", "Elle s'en a allée sans dire au revoir.", "Elle s'en est allé sans dire au revoir."), category: "reflexive" },
  { id: "a28", verb: "se sentir", context: "Je ___ mieux hier.", correct: "Je me suis senti mieux hier.", options: makeOptions("Je me suis senti mieux hier.", "Je me ai senti mieux hier.", "Je me suis sentie mieux hier."), category: "reflexive" },
  { id: "a29", verb: "s'occuper", context: "Elle ___ des enfants toute la journée.", correct: "Elle s'est occupée des enfants toute la journée.", options: makeOptions("Elle s'est occupée des enfants toute la journée.", "Elle s'a occupée des enfants toute la journée.", "Elle s'est occupé des enfants toute la journée."), category: "reflexive" },
  
  // AMBIGUOUS (transitive = avoir, intransitive = être)
  { id: "a30", verb: "monter (transitive)", context: "Il ___ les escaliers.", correct: "Il a monté les escaliers.", options: makeOptions("Il a monté les escaliers.", "Il est monté les escaliers.", "Il a montés les escaliers."), category: "ambiguous" },
  { id: "a31", verb: "monter (intransitive)", context: "Elle ___ au premier étage.", correct: "Elle est montée au premier étage.", options: makeOptions("Elle est montée au premier étage.", "Elle a montée au premier étage.", "Elle est monté au premier étage."), category: "ambiguous" },
  { id: "a32", verb: "descendre (transitive)", context: "Il ___ les valises.", correct: "Il a descendu les valises.", options: makeOptions("Il a descendu les valises.", "Il est descendu les valises.", "Il a descendues les valises."), category: "ambiguous" },
  { id: "a33", verb: "descendre (intransitive)", context: "Elle ___ de la voiture.", correct: "Elle est descendue de la voiture.", options: makeOptions("Elle est descendue de la voiture.", "Elle a descendue de la voiture.", "Elle est descendu de la voiture."), category: "ambiguous" },
  { id: "a34", verb: "sortir (transitive)", context: "Il ___ les poubelles.", correct: "Il a sorti les poubelles.", options: makeOptions("Il a sorti les poubelles.", "Il est sorti les poubelles.", "Il a sorties les poubelles."), category: "ambiguous" },
  { id: "a35", verb: "sortir (intransitive)", context: "Elle ___ de la maison.", correct: "Elle est sortie de la maison.", options: makeOptions("Elle est sortie de la maison.", "Elle a sortie de la maison.", "Elle est sorti de la maison."), category: "ambiguous" },
  { id: "a36", verb: "rentrer (transitive)", context: "Il ___ les vélos.", correct: "Il a rentré les vélos.", options: makeOptions("Il a rentré les vélos.", "Il est rentré les vélos.", "Il a rentrés les vélos."), category: "ambiguous" },
  { id: "a37", verb: "rentrer (intransitive)", context: "Elle ___ tard.", correct: "Elle est rentrée tard.", options: makeOptions("Elle est rentrée tard.", "Elle a rentrée tard.", "Elle est rentré tard."), category: "ambiguous" },
  { id: "a38", verb: "passer (transitive)", context: "Il ___ un examen.", correct: "Il a passé un examen.", options: makeOptions("Il a passé un examen.", "Il est passé un examen.", "Il a passés un examen."), category: "ambiguous" },
  { id: "a39", verb: "passer (intransitive)", context: "Elle ___ par Paris.", correct: "Elle est passée par Paris.", options: makeOptions("Elle est passée par Paris.", "Elle a passée par Paris.", "Elle est passé par Paris."), category: "ambiguous" },
  
  // AVOIR (common verbs, for contrast)
  { id: "a40", verb: "manger", context: "Elle ___ une pomme.", correct: "Elle a mangé une pomme.", options: makeOptions("Elle a mangé une pomme.", "Elle est mangée une pomme.", "Elle a mangée une pomme."), category: "avoir" },
  { id: "a41", verb: "boire", context: "Il ___ un café.", correct: "Il a bu un café.", options: makeOptions("Il a bu un café.", "Il est bu un café.", "Il a bus un café."), category: "avoir" },
  { id: "a42", verb: "parler", context: "Nous ___ au professeur.", correct: "Nous avons parlé au professeur.", options: makeOptions("Nous avons parlé au professeur.", "Nous sommes parlé au professeur.", "Nous avons parlés au professeur."), category: "avoir" },
  { id: "a43", verb: "travailler", context: "Elle ___ toute la nuit.", correct: "Elle a travaillé toute la nuit.", options: makeOptions("Elle a travaillé toute la nuit.", "Elle est travaillée toute la nuit.", "Elle a travaillée toute la nuit."), category: "avoir" },
  { id: "a44", verb: "lire", context: "Ils ___ le livre.", correct: "Ils ont lu le livre.", options: makeOptions("Ils ont lu le livre.", "Ils sont lu le livre.", "Ils ont lus le livre."), category: "avoir" },
  { id: "a45", verb: "écrire", context: "Je ___ une lettre.", correct: "J'ai écrit une lettre.", options: makeOptions("J'ai écrit une lettre.", "Je suis écrit une lettre.", "J'ai écrite une lettre."), category: "avoir" },
  { id: "a46", verb: "voir", context: "Elle ___ le film.", correct: "Elle a vu le film.", options: makeOptions("Elle a vu le film.", "Elle est vue le film.", "Elle a vus le film."), category: "avoir" },
  { id: "a47", verb: "prendre", context: "Nous ___ le bus.", correct: "Nous avons pris le bus.", options: makeOptions("Nous avons pris le bus.", "Nous sommes pris le bus.", "Nous avons prises le bus."), category: "avoir" },
  { id: "a48", verb: "faire", context: "Il ___ ses devoirs.", correct: "Il a fait ses devoirs.", options: makeOptions("Il a fait ses devoirs.", "Il est fait ses devoirs.", "Il a faits ses devoirs."), category: "avoir" },
  { id: "a49", verb: "dire", context: "Elle ___ la vérité.", correct: "Elle a dit la vérité.", options: makeOptions("Elle a dit la vérité.", "Elle est dite la vérité.", "Elle a dite la vérité."), category: "avoir" },
  { id: "a50", verb: "savoir", context: "J'___ la réponse.", correct: "J'ai su la réponse.", options: makeOptions("J'ai su la réponse.", "Je suis su la réponse.", "J'ai sue la réponse."), category: "avoir" },
  
  // PLUS-QUE-PARFAIT and other tenses
  { id: "a51", verb: "aller (plus-que-parfait)", context: "Elle ___ déjà à Paris avant ça.", correct: "Elle était déjà allée à Paris avant ça.", options: makeOptions("Elle était déjà allée à Paris avant ça.", "Elle avait déjà allée à Paris avant ça.", "Elle était déjà allé à Paris avant ça."), category: "vandertramp" },
  { id: "a52", verb: "venir (plus-que-parfait)", context: "Ils ___ nous voir la veille.", correct: "Ils étaient venus nous voir la veille.", options: makeOptions("Ils étaient venus nous voir la veille.", "Ils avaient venus nous voir la veille.", "Ils étaient venues nous voir la veille."), category: "vandertramp" },
  { id: "a53", verb: "manger (plus-que-parfait)", context: "Elle ___ déjà quand je suis arrivé.", correct: "Elle avait déjà mangé quand je suis arrivé.", options: makeOptions("Elle avait déjà mangé quand je suis arrivé.", "Elle était déjà mangée quand je suis arrivé.", "Elle avait déjà mangée quand je suis arrivé."), category: "avoir" },
  { id: "a54", verb: "se lever (plus-que-parfait)", context: "Elle ___ quand le téléphone a sonné.", correct: "Elle s'était levée quand le téléphone a sonné.", options: makeOptions("Elle s'était levée quand le téléphone a sonné.", "Elle s'avait levée quand le téléphone a sonné.", "Elle s'était levé quand le téléphone a sonné."), category: "reflexive" },
  { id: "a55", verb: "partir (futur antérieur)", context: "Elle ___ avant midi.", correct: "Elle sera partie avant midi.", options: makeOptions("Elle sera partie avant midi.", "Elle aura partie avant midi.", "Elle sera parti avant midi."), category: "vandertramp" },
  { id: "a56", verb: "arriver (futur antérieur)", context: "Ils ___ d'ici une heure.", correct: "Ils seront arrivés d'ici une heure.", options: makeOptions("Ils seront arrivés d'ici une heure.", "Ils auront arrivés d'ici une heure.", "Ils seront arrivées d'ici une heure."), category: "vandertramp" },
  { id: "a57", verb: "finir (futur antérieur)", context: "Nous ___ le travail demain.", correct: "Nous aurons fini le travail demain.", options: makeOptions("Nous aurons fini le travail demain.", "Nous serons fini le travail demain.", "Nous aurons finis le travail demain."), category: "avoir" },
  { id: "a58", verb: "aller (conditionnel passé)", context: "Elle ___ à Paris si elle avait eu le temps.", correct: "Elle serait allée à Paris si elle avait eu le temps.", options: makeOptions("Elle serait allée à Paris si elle avait eu le temps.", "Elle aurait allée à Paris si elle avait eu le temps.", "Elle serait allé à Paris si elle avait eu le temps."), category: "vandertramp" },
  { id: "a59", verb: "faire (conditionnel passé)", context: "Il ___ ses devoirs s'il avait su.", correct: "Il aurait fait ses devoirs s'il avait su.", options: makeOptions("Il aurait fait ses devoirs s'il avait su.", "Il serait fait ses devoirs s'il avait su.", "Il aurait faits ses devoirs s'il avait su."), category: "avoir" },
  { id: "a60", verb: "se coucher (conditionnel passé)", context: "Elle ___ plus tôt si elle avait été fatiguée.", correct: "Elle se serait couchée plus tôt si elle avait été fatiguée.", options: makeOptions("Elle se serait couchée plus tôt si elle avait été fatiguée.", "Elle s'aurait couchée plus tôt si elle avait été fatiguée.", "Elle se serait couché plus tôt si elle avait été fatiguée."), category: "reflexive" },
];

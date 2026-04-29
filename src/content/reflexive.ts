export type ReflexiveItem = {
  id: string;
  verb: string;
  correct: string;
  options: string[];
  category: "true-reflexive" | "idiomatic" | "reciprocal" | "optional" | "non-reflexive";
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeOptions(correct: string, wrong1: string, wrong2: string): string[] {
  return shuffle([correct, wrong1, wrong2]);
}

export const reflexiveItems: ReflexiveItem[] = [
  // TRUE REFLEXIVE (action on oneself)
  { id: "r1", verb: "se laver", correct: "Je me lave les mains.", options: makeOptions("Je me lave les mains.", "Je lave les mains.", "Je laves les mains."), category: "true-reflexive" },
  { id: "r2", verb: "se coucher", correct: "Elle se couche tôt.", options: makeOptions("Elle se couche tôt.", "Elle couche tôt.", "Elle couche-toi tôt."), category: "true-reflexive" },
  { id: "r3", verb: "se réveiller", correct: "Je me réveille à sept heures.", options: makeOptions("Je me réveille à sept heures.", "Je réveille à sept heures.", "Je réveilles à sept heures."), category: "true-reflexive" },
  { id: "r4", verb: "s'habiller", correct: "Il s'habille vite.", options: makeOptions("Il s'habille vite.", "Il habille vite.", "Il habilles vite."), category: "true-reflexive" },
  { id: "r5", verb: "se brosser", correct: "Elle se brosse les dents.", options: makeOptions("Elle se brosse les dents.", "Elle brosse les dents.", "Elle brosses les dents."), category: "true-reflexive" },
  { id: "r6", verb: "se regarder", correct: "Je me regarde dans le miroir.", options: makeOptions("Je me regarde dans le miroir.", "Je regarde dans le miroir.", "Je regardes dans le miroir."), category: "true-reflexive" },
  { id: "r7", verb: "se lever", correct: "Nous nous levons tôt.", options: makeOptions("Nous nous levons tôt.", "Nous levons tôt.", "Nous levez tôt."), category: "true-reflexive" },
  { id: "r8", verb: "se reposer", correct: "Elle se repose après le travail.", options: makeOptions("Elle se repose après le travail.", "Elle repose après le travail.", "Elle reposes après le travail."), category: "true-reflexive" },
  { id: "r9", verb: "se promener", correct: "Je me promène dans le parc.", options: makeOptions("Je me promène dans le parc.", "Je promène dans le parc.", "Je promènes dans le parc."), category: "true-reflexive" },
  { id: "r10", verb: "se sentir", correct: "Il se sent mal.", options: makeOptions("Il se sent mal.", "Il sent mal.", "Il sens mal."), category: "true-reflexive" },
  { id: "r11", verb: "se peigner", correct: "Elle se peigne les cheveux.", options: makeOptions("Elle se peigne les cheveux.", "Elle peigne les cheveux.", "Elle peignes les cheveux."), category: "true-reflexive" },
  { id: "r12", verb: "se doucher", correct: "Je me douche le matin.", options: makeOptions("Je me douche le matin.", "Je douche le matin.", "Je douches le matin."), category: "true-reflexive" },
  { id: "r13", verb: "se raser", correct: "Il se rase chaque jour.", options: makeOptions("Il se rase chaque jour.", "Il rase chaque jour.", "Il rases chaque jour."), category: "true-reflexive" },
  { id: "r14", verb: "se maquiller", correct: "Elle se maquille avant de sortir.", options: makeOptions("Elle se maquille avant de sortir.", "Elle maquille avant de sortir.", "Elle maquilles avant de sortir."), category: "true-reflexive" },
  
  // NON-REFLEXIVE counterparts (to contrast)
  { id: "r15", verb: "laver", correct: "Je lave la voiture.", options: makeOptions("Je lave la voiture.", "Je me lave la voiture.", "Je laves la voiture."), category: "non-reflexive" },
  { id: "r16", verb: "coucher", correct: "Elle couche le bébé.", options: makeOptions("Elle couche le bébé.", "Elle se couche le bébé.", "Elle couches le bébé."), category: "non-reflexive" },
  { id: "r17", verb: "réveiller", correct: "Je réveille mon frère.", options: makeOptions("Je réveille mon frère.", "Je me réveille mon frère.", "Je réveilles mon frère."), category: "non-reflexive" },
  { id: "r18", verb: "habiller", correct: "Elle habille son enfant.", options: makeOptions("Elle habille son enfant.", "Elle s'habille son enfant.", "Elle habilles son enfant."), category: "non-reflexive" },
  { id: "r19", verb: "brosser", correct: "Je brosse le chien.", options: makeOptions("Je brosse le chien.", "Je me brosse le chien.", "Je brosses le chien."), category: "non-reflexive" },
  { id: "r20", verb: "regarder", correct: "Il regarde le film.", options: makeOptions("Il regarde le film.", "Il se regarde le film.", "Il regardes le film."), category: "non-reflexive" },
  { id: "r21", verb: "lever", correct: "Je lève la main.", options: makeOptions("Je lève la main.", "Je me lève la main.", "Je lèves la main."), category: "non-reflexive" },
  { id: "r22", verb: "reposer", correct: "Elle repose le livre sur la table.", options: makeOptions("Elle repose le livre sur la table.", "Elle se repose le livre sur la table.", "Elle reposes le livre sur la table."), category: "non-reflexive" },
  { id: "r23", verb: "promener", correct: "Je promène le chien.", options: makeOptions("Je promène le chien.", "Je me promène le chien.", "Je promènes le chien."), category: "non-reflexive" },
  { id: "r24", verb: "sentir", correct: "Je sens la fleur.", options: makeOptions("Je sens la fleur.", "Je me sens la fleur.", "Je sent la fleur."), category: "non-reflexive" },
  { id: "r25", verb: "peigner", correct: "Elle peigne sa fille.", options: makeOptions("Elle peigne sa fille.", "Elle se peigne sa fille.", "Elle peignes sa fille."), category: "non-reflexive" },
  
  // IDIOMATIC (no literal reflexive meaning)
  { id: "r26", verb: "se souvenir", correct: "Je me souviens de mon voyage.", options: makeOptions("Je me souviens de mon voyage.", "Je souviens de mon voyage.", "Je souviens mon voyage."), category: "idiomatic" },
  { id: "r27", verb: "se taire", correct: "Elle se tait.", options: makeOptions("Elle se tait.", "Elle tait.", "Elle taits."), category: "idiomatic" },
  { id: "r28", verb: "s'occuper", correct: "Je m'occupe des enfants.", options: makeOptions("Je m'occupe des enfants.", "J'occupe des enfants.", "Je m'occupes des enfants."), category: "idiomatic" },
  { id: "r29", verb: "se mettre à", correct: "Il se met à pleuvoir.", options: makeOptions("Il se met à pleuvoir.", "Il met à pleuvoir.", "Il mets à pleuvoir."), category: "idiomatic" },
  { id: "r30", verb: "s'en aller", correct: "Je m'en vais.", options: makeOptions("Je m'en vais.", "Je vais.", "Je m'en vas."), category: "idiomatic" },
  { id: "r31", verb: "se passer", correct: "Qu'est-ce qui se passe ?", options: makeOptions("Qu'est-ce qui se passe ?", "Qu'est-ce qui passe ?", "Qu'est-ce qui passes ?"), category: "idiomatic" },
  { id: "r32", verb: "se rendre compte", correct: "Je me rends compte de mon erreur.", options: makeOptions("Je me rends compte de mon erreur.", "Je rends compte de mon erreur.", "Je me rend compte de mon erreur."), category: "idiomatic" },
  { id: "r33", verb: "se tromper", correct: "Elle se trompe d'adresse.", options: makeOptions("Elle se trompe d'adresse.", "Elle trompe d'adresse.", "Elle trompes d'adresse."), category: "idiomatic" },
  { id: "r34", verb: "se trouver", correct: "Où se trouve la gare ?", options: makeOptions("Où se trouve la gare ?", "Où trouve la gare ?", "Où trouves la gare ?"), category: "idiomatic" },
  { id: "r35", verb: "se fâcher", correct: "Il se fâche facilement.", options: makeOptions("Il se fâche facilement.", "Il fâche facilement.", "Il fâches facilement."), category: "idiomatic" },
  { id: "r36", verb: "s'ennuyer", correct: "Elle s'ennuie en classe.", options: makeOptions("Elle s'ennuie en classe.", "Elle ennuie en classe.", "Elle ennuyes en classe."), category: "idiomatic" },
  { id: "r37", verb: "s'intéresser", correct: "Je m'intéresse à la science.", options: makeOptions("Je m'intéresse à la science.", "J'intéresse à la science.", "Je m'intéresses à la science."), category: "idiomatic" },
  { id: "r38", verb: "se dépêcher", correct: "Nous nous dépêchons.", options: makeOptions("Nous nous dépêchons.", "Nous dépêchons.", "Nous dépêchez."), category: "idiomatic" },
  
  // RECIPROCAL (each other)
  { id: "r39", verb: "se parler", correct: "Ils se parlent tous les jours.", options: makeOptions("Ils se parlent tous les jours.", "Ils parlent tous les jours.", "Ils parlent-se tous les jours."), category: "reciprocal" },
  { id: "r40", verb: "se voir", correct: "Nous nous voyons demain.", options: makeOptions("Nous nous voyons demain.", "Nous voyons demain.", "Nous voyez demain."), category: "reciprocal" },
  { id: "r41", verb: "se téléphoner", correct: "Elles se téléphonent souvent.", options: makeOptions("Elles se téléphonent souvent.", "Elles téléphonent souvent.", "Elles téléphones souvent."), category: "reciprocal" },
  { id: "r42", verb: "se rencontrer", correct: "Ils se rencontrent au café.", options: makeOptions("Ils se rencontrent au café.", "Ils rencontrent au café.", "Ils rencontres au café."), category: "reciprocal" },
  { id: "r43", verb: "se quitter", correct: "Elles se quittent à minuit.", options: makeOptions("Elles se quittent à minuit.", "Elles quittent à minuit.", "Elles quittes à minuit."), category: "reciprocal" },
  { id: "r44", verb: "se disputer", correct: "Ils se disputent souvent.", options: makeOptions("Ils se disputent souvent.", "Ils disputent souvent.", "Ils disputes souvent."), category: "reciprocal" },
  { id: "r45", verb: "se marier", correct: "Ils se marient en juin.", options: makeOptions("Ils se marient en juin.", "Ils marient en juin.", "Ils maries en juin."), category: "reciprocal" },
  { id: "r46", verb: "se comprendre", correct: "Nous nous comprenons parfaitement.", options: makeOptions("Nous nous comprenons parfaitement.", "Nous comprenons parfaitement.", "Nous comprenez parfaitement."), category: "reciprocal" },
  
  // OPTIONAL (subtle meaning shift)
  { id: "r47", verb: "s'arrêter / arrêter", correct: "Je m'arrête au feu rouge.", options: makeOptions("Je m'arrête au feu rouge.", "J'arrête au feu rouge.", "J'arrêtes au feu rouge."), category: "optional" },
  { id: "r48", verb: "arrêter", correct: "J'arrête la voiture.", options: makeOptions("J'arrête la voiture.", "Je m'arrête la voiture.", "J'arrêtes la voiture."), category: "optional" },
  { id: "r49", verb: "se promener / promener", correct: "Je me promène dans la forêt.", options: makeOptions("Je me promène dans la forêt.", "Je promène dans la forêt.", "Je promènes dans la forêt."), category: "optional" },
  { id: "r50", verb: "promener", correct: "Je promène le chien.", options: makeOptions("Je promène le chien.", "Je me promène le chien.", "Je promènes le chien."), category: "optional" },
];

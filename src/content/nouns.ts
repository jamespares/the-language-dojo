export type NounItem = {
  id: string;
  noun: string;
  gender: "m" | "f";
  type: "regular" | "exception";
  phrase: string; // correct full phrase
  options: string[]; // 3 options including correct
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeOptions(correct: string, wrong1: string, wrong2: string): string[] {
  return shuffle([correct, wrong1, wrong2]);
}

export const nouns: NounItem[] = [
  // === REGULAR MASCULINE ===
  {
    id: "n1", noun: "voyage", gender: "m", type: "regular",
    phrase: "le voyage intéressant",
    options: makeOptions("le voyage intéressant", "la voyage intéressante", "la voyage intéressant")
  },
  {
    id: "n2", noun: "garage", gender: "m", type: "regular",
    phrase: "le garage plein",
    options: makeOptions("le garage plein", "la garage pleine", "la garage plein")
  },
  {
    id: "n3", noun: "nuage", gender: "m", type: "regular",
    phrase: "le nuage gris",
    options: makeOptions("le nuage gris", "la nuage grise", "la nuage gris")
  },
  {
    id: "n4", noun: "tableau", gender: "m", type: "regular",
    phrase: "le tableau noir",
    options: makeOptions("le tableau noir", "la tableau noire", "la tableau noir")
  },
  {
    id: "n5", noun: "bureau", gender: "m", type: "regular",
    phrase: "le bureau propre",
    options: makeOptions("le bureau propre", "la bureau propre", "la bureau propre")
  },
  {
    id: "n6", noun: "château", gender: "m", type: "regular",
    phrase: "le château ancien",
    options: makeOptions("le château ancien", "la château ancienne", "la château ancien")
  },
  {
    id: "n7", noun: "manteau", gender: "m", type: "regular",
    phrase: "le manteau chaud",
    options: makeOptions("le manteau chaud", "la manteau chaude", "la manteau chaud")
  },
  {
    id: "n8", noun: "bateau", gender: "m", type: "regular",
    phrase: "le bateau grand",
    options: makeOptions("le bateau grand", "la bateau grande", "la bateau grand")
  },
  {
    id: "n9", noun: "jeu", gender: "m", type: "regular",
    phrase: "le jeu amusant",
    options: makeOptions("le jeu amusant", "la jeu amusante", "la jeu amusant")
  },
  {
    id: "n10", noun: "feu", gender: "m", type: "regular",
    phrase: "le feu rouge",
    options: makeOptions("le feu rouge", "la feu rouge", "la feu rouge")
  },
  {
    id: "n11", noun: "genou", gender: "m", type: "regular",
    phrase: "le genou blessé",
    options: makeOptions("le genou blessé", "la genou blessée", "la genou blessé")
  },
  {
    id: "n12", noun: "cou", gender: "m", type: "regular",
    phrase: "le cou long",
    options: makeOptions("le cou long", "la cou longue", "la cou long")
  },
  {
    id: "n13", noun: "tourisme", gender: "m", type: "regular",
    phrase: "le tourisme important",
    options: makeOptions("le tourisme important", "la tourisme importante", "la tourisme important")
  },
  {
    id: "n14", noun: "journalisme", gender: "m", type: "regular",
    phrase: "le journalisme libre",
    options: makeOptions("le journalisme libre", "la journalisme libre", "la journalisme libre")
  },
  {
    id: "n15", noun: "gouvernement", gender: "m", type: "regular",
    phrase: "le gouvernement nouveau",
    options: makeOptions("le gouvernement nouveau", "la gouvernement nouvelle", "la gouvernement nouveau")
  },
  {
    id: "n16", noun: "moment", gender: "m", type: "regular",
    phrase: "le moment parfait",
    options: makeOptions("le moment parfait", "la moment parfaite", "la moment parfait")
  },
  {
    id: "n17", noun: "travail", gender: "m", type: "regular",
    phrase: "le travail difficile",
    options: makeOptions("le travail difficile", "la travail difficile", "la travail difficile")
  },
  {
    id: "n18", noun: "détail", gender: "m", type: "regular",
    phrase: "le détail important",
    options: makeOptions("le détail important", "la détail importante", "la détail important")
  },
  {
    id: "n19", noun: "cheval", gender: "m", type: "regular",
    phrase: "le cheval blanc",
    options: makeOptions("le cheval blanc", "la cheval blanche", "la cheval blanc")
  },
  {
    id: "n20", noun: "animal", gender: "m", type: "regular",
    phrase: "l'animal sauvage",
    options: makeOptions("l'animal sauvage", "l'animal sauvage", "la animal sauvage")
  },
  {
    id: "n21", noun: "objet", gender: "m", type: "regular",
    phrase: "l'objet perdu",
    options: makeOptions("l'objet perdu", "la objet perdue", "la objet perdu")
  },
  {
    id: "n22", noun: "secret", gender: "m", type: "regular",
    phrase: "le secret bien gardé",
    options: makeOptions("le secret bien gardé", "la secret bien gardée", "la secret bien gardé")
  },
  {
    id: "n23", noun: "soleil", gender: "m", type: "regular",
    phrase: "le soleil brillant",
    options: makeOptions("le soleil brillant", "la soleil brillante", "la soleil brillant")
  },
  {
    id: "n24", noun: "conseil", gender: "m", type: "regular",
    phrase: "le conseil utile",
    options: makeOptions("le conseil utile", "la conseil utile", "la conseil utile")
  },
  {
    id: "n25", noun: "jardin", gender: "m", type: "regular",
    phrase: "le jardin beau",
    options: makeOptions("le jardin beau", "la jardin belle", "la jardin beau")
  },
  {
    id: "n26", noun: "magasin", gender: "m", type: "regular",
    phrase: "le magasin cher",
    options: makeOptions("le magasin cher", "la magasin chère", "la magasin cher")
  },
  {
    id: "n27", noun: "café", gender: "m", type: "regular",
    phrase: "le café chaud",
    options: makeOptions("le café chaud", "la café chaude", "la café chaud")
  },
  {
    id: "n28", noun: "marché", gender: "m", type: "regular",
    phrase: "le marché animé",
    options: makeOptions("le marché animé", "la marché animée", "la marché animé")
  },
  {
    id: "n29", noun: "téléphone", gender: "m", type: "regular",
    phrase: "le téléphone neuf",
    options: makeOptions("le téléphone neuf", "la téléphone neuve", "la téléphone neuf")
  },
  {
    id: "n30", noun: "microscope", gender: "m", type: "regular",
    phrase: "le microscope puissant",
    options: makeOptions("le microscope puissant", "la microscope puissante", "la microscope puissant")
  },

  // === REGULAR FEMININE ===
  {
    id: "n31", noun: "nation", gender: "f", type: "regular",
    phrase: "la nation unie",
    options: makeOptions("la nation unie", "le nation uni", "le nation unie")
  },
  {
    id: "n32", noun: "question", gender: "f", type: "regular",
    phrase: "la question difficile",
    options: makeOptions("la question difficile", "le question difficile", "le question difficile")
  },
  {
    id: "n33", noun: "solution", gender: "f", type: "regular",
    phrase: "la solution évidente",
    options: makeOptions("la solution évidente", "le solution évident", "le solution évidente")
  },
  {
    id: "n34", noun: "décision", gender: "f", type: "regular",
    phrase: "la décision finale",
    options: makeOptions("la décision finale", "le decision final", "le décision finale")
  },
  {
    id: "n35", noun: "division", gender: "f", type: "regular",
    phrase: "la division claire",
    options: makeOptions("la division claire", "le division clair", "le division claire")
  },
  {
    id: "n36", noun: "passion", gender: "f", type: "regular",
    phrase: "la passion forte",
    options: makeOptions("la passion forte", "le passion fort", "le passion forte")
  },
  {
    id: "n37", noun: "liberté", gender: "f", type: "regular",
    phrase: "la liberté totale",
    options: makeOptions("la liberté totale", "le liberté total", "le liberté totale")
  },
  {
    id: "n38", noun: "vérité", gender: "f", type: "regular",
    phrase: "la vérité pure",
    options: makeOptions("la vérité pure", "le vérité pur", "le vérité pure")
  },
  {
    id: "n39", noun: "beauté", gender: "f", type: "regular",
    phrase: "la beauté naturelle",
    options: makeOptions("la beauté naturelle", "le beauté naturel", "le beauté naturelle")
  },
  {
    id: "n40", noun: "attitude", gender: "f", type: "regular",
    phrase: "l'attitude positive",
    options: makeOptions("l'attitude positive", "l'attitude positif", "le attitude positive")
  },
  {
    id: "n41", noun: "nature", gender: "f", type: "regular",
    phrase: "la nature belle",
    options: makeOptions("la nature belle", "le nature beau", "le nature belle")
  },
  {
    id: "n42", noun: "culture", gender: "f", type: "regular",
    phrase: "la culture riche",
    options: makeOptions("la culture riche", "le culture riche", "le culture riche")
  },
  {
    id: "n43", noun: "différence", gender: "f", type: "regular",
    phrase: "la différence nette",
    options: makeOptions("la différence nette", "le différence net", "le différence nette")
  },
  {
    id: "n44", noun: "patience", gender: "f", type: "regular",
    phrase: "la patience nécessaire",
    options: makeOptions("la patience nécessaire", "le patience nécessaire", "le patience nécessaire")
  },
  {
    id: "n45", noun: "chance", gender: "f", type: "regular",
    phrase: "la chance folle",
    options: makeOptions("la chance folle", "le chance fou", "le chance folle")
  },
  {
    id: "n46", noun: "distance", gender: "f", type: "regular",
    phrase: "la distance grande",
    options: makeOptions("la distance grande", "le distance grand", "le distance grande")
  },
  {
    id: "n47", noun: "vitesse", gender: "f", type: "regular",
    phrase: "la vitesse élevée",
    options: makeOptions("la vitesse élevée", "le vitesse élevé", "le vitesse élevée")
  },
  {
    id: "n48", noun: "richesse", gender: "f", type: "regular",
    phrase: "la richesse immense",
    options: makeOptions("la richesse immense", "le richesse immense", "le richesse immense")
  },
  {
    id: "n49", noun: "serviette", gender: "f", type: "regular",
    phrase: "la serviette propre",
    options: makeOptions("la serviette propre", "le serviette propre", "le serviette propre")
  },
  {
    id: "n50", noun: "silhouette", gender: "f", type: "regular",
    phrase: "la silhouette fine",
    options: makeOptions("la silhouette fine", "le silhouette fin", "le silhouette fine")
  },
  {
    id: "n51", noun: "vie", gender: "f", type: "regular",
    phrase: "la vie belle",
    options: makeOptions("la vie belle", "le vie beau", "le vie belle")
  },
  {
    id: "n52", noun: "maladie", gender: "f", type: "regular",
    phrase: "la maladie grave",
    options: makeOptions("la maladie grave", "le maladie grave", "le maladie grave")
  },
  {
    id: "n53", noun: "économie", gender: "f", type: "regular",
    phrase: "l'économie stable",
    options: makeOptions("l'économie stable", "l'économie stable", "le économie stable")
  },
  {
    id: "n54", noun: "journée", gender: "f", type: "regular",
    phrase: "la journée longue",
    options: makeOptions("la journée longue", "le journée long", "le journée longue")
  },
  {
    id: "n55", noun: "soirée", gender: "f", type: "regular",
    phrase: "la soirée magique",
    options: makeOptions("la soirée magique", "le soirée magique", "le soirée magique")
  },
  {
    id: "n56", noun: "année", gender: "f", type: "regular",
    phrase: "l'année nouvelle",
    options: makeOptions("l'année nouvelle", "l'année nouveau", "le année nouvelle")
  },
  {
    id: "n57", noun: "victoire", gender: "f", type: "regular",
    phrase: "la victoire éclatante",
    options: makeOptions("la victoire éclatante", "le victoire éclatant", "le victoire éclatante")
  },
  {
    id: "n58", noun: "mémoire", gender: "f", type: "regular",
    phrase: "la mémoire vive",
    options: makeOptions("la mémoire vive", "le mémoire vif", "le mémoire vive")
  },
  {
    id: "n59", noun: "maison", gender: "f", type: "regular",
    phrase: "la maison blanche",
    options: makeOptions("la maison blanche", "le maison blanc", "le maison blanche")
  },
  {
    id: "n60", noun: "saison", gender: "f", type: "regular",
    phrase: "la saison froide",
    options: makeOptions("la saison froide", "le saison froid", "le saison froide")
  },

  // === EXCEPTIONS (The Gotchas) ===
  {
    id: "n61", noun: "problème", gender: "m", type: "exception",
    phrase: "le problème difficile",
    options: makeOptions("le problème difficile", "la problème difficile", "la problème difficile")
  },
  {
    id: "n62", noun: "système", gender: "m", type: "exception",
    phrase: "le système complexe",
    options: makeOptions("le système complexe", "la système complexe", "la système complexe")
  },
  {
    id: "n63", noun: "thème", gender: "m", type: "exception",
    phrase: "le thème principal",
    options: makeOptions("le thème principal", "la thème principale", "la thème principal")
  },
  {
    id: "n64", noun: "groupe", gender: "m", type: "exception",
    phrase: "le groupe nombreux",
    options: makeOptions("le groupe nombreux", "la groupe nombreuse", "la groupe nombreux")
  },
  {
    id: "n65", noun: "manège", gender: "m", type: "exception",
    phrase: "le manège enchanté",
    options: makeOptions("le manège enchanté", "la manège enchantée", "la manège enchanté")
  },
  {
    id: "n66", noun: "temps", gender: "m", type: "exception",
    phrase: "le temps précieux",
    options: makeOptions("le temps précieux", "la temps précieuse", "la temps précieux")
  },
  {
    id: "n67", noun: "bras", gender: "m", type: "exception",
    phrase: "le bras cassé",
    options: makeOptions("le bras cassé", "la bras cassée", "la bras cassé")
  },
  {
    id: "n68", noun: "nez", gender: "m", type: "exception",
    phrase: "le nez rouge",
    options: makeOptions("le nez rouge", "la nez rouge", "la nez rouge")
  },
  {
    id: "n69", noun: "roi", gender: "m", type: "exception",
    phrase: "le roi puissant",
    options: makeOptions("le roi puissant", "la roi puissante", "la roi puissant")
  },
  {
    id: "n70", noun: "choix", gender: "m", type: "exception",
    phrase: "le choix difficile",
    options: makeOptions("le choix difficile", "la choix difficile", "la choix difficile")
  },
  {
    id: "n71", noun: "prix", gender: "m", type: "exception",
    phrase: "le prix élevé",
    options: makeOptions("le prix élevé", "la prix élevée", "la prix élevé")
  },
  {
    id: "n72", noun: "pays", gender: "m", type: "exception",
    phrase: "le pays voisin",
    options: makeOptions("le pays voisin", "la pays voisine", "la pays voisin")
  },
  {
    id: "n73", noun: "bois", gender: "m", type: "exception",
    phrase: "le bois sombre",
    options: makeOptions("le bois sombre", "la bois sombre", "la bois sombre")
  },
  {
    id: "n74", noun: "poids", gender: "m", type: "exception",
    phrase: "le poids lourd",
    options: makeOptions("le poids lourd", "la poids lourde", "la poids lourd")
  },
  {
    id: "n75", noun: "fond", gender: "m", type: "exception",
    phrase: "le fond de la mer",
    options: makeOptions("le fond de la mer", "la fond de la mer", "la fond de le mer")
  },
  {
    id: "n76", noun: "vent", gender: "m", type: "exception",
    phrase: "le vent fort",
    options: makeOptions("le vent fort", "la vent forte", "la vent fort")
  },
  {
    id: "n77", noun: "sang", gender: "m", type: "exception",
    phrase: "le sang frais",
    options: makeOptions("le sang frais", "la sang fraîche", "la sang frais")
  },
  {
    id: "n78", noun: "ventre", gender: "m", type: "exception",
    phrase: "le ventre plein",
    options: makeOptions("le ventre plein", "la ventre pleine", "la ventre plein")
  },
  {
    id: "n79", noun: "dentifrice", gender: "m", type: "exception",
    phrase: "le dentifrice mentholé",
    options: makeOptions("le dentifrice mentholé", "la dentifrice mentholée", "la dentifrice mentholé")
  },
  {
    id: "n80", noun: "sirop", gender: "m", type: "exception",
    phrase: "le sirop sucré",
    options: makeOptions("le sirop sucré", "la sirop sucrée", "la sirop sucré")
  },
  {
    id: "n81", noun: "linge", gender: "m", type: "exception",
    phrase: "le linge propre",
    options: makeOptions("le linge propre", "la linge propre", "la linge propre")
  },
  {
    id: "n82", noun: "foie", gender: "m", type: "exception",
    phrase: "le foie gras",
    options: makeOptions("le foie gras", "la foie grasse", "la foie gras")
  },
  {
    id: "n83", noun: "parfum", gender: "m", type: "exception",
    phrase: "le parfum doux",
    options: makeOptions("le parfum doux", "la parfum douce", "la parfum doux")
  },
  {
    id: "n84", noun: "bain", gender: "m", type: "exception",
    phrase: "le bain chaud",
    options: makeOptions("le bain chaud", "la bain chaude", "la bain chaud")
  },
  {
    id: "n85", noun: "main", gender: "f", type: "exception",
    phrase: "la main droite",
    options: makeOptions("la main droite", "le main droit", "le main droite")
  },
  {
    id: "n86", noun: "fin", gender: "f", type: "exception",
    phrase: "la fin triste",
    options: makeOptions("la fin triste", "le fin triste", "le fin triste")
  },
  {
    id: "n87", noun: "nuit", gender: "f", type: "exception",
    phrase: "la nuit noire",
    options: makeOptions("la nuit noire", "le nuit noir", "le nuit noire")
  },
  {
    id: "n88", noun: "foi", gender: "f", type: "exception",
    phrase: "la foi inébranlable",
    options: makeOptions("la foi inébranlable", "le foi inébranlable", "le foi inébranlable")
  },
  {
    id: "n89", noun: "loi", gender: "f", type: "exception",
    phrase: "la loi stricte",
    options: makeOptions("la loi stricte", "le loi strict", "le loi stricte")
  },
  {
    id: "n90", noun: "voix", gender: "f", type: "exception",
    phrase: "la voix douce",
    options: makeOptions("la voix douce", "le voix doux", "le voix douce")
  },
  {
    id: "n91", noun: "croix", gender: "f", type: "exception",
    phrase: "la croix rouge",
    options: makeOptions("la croix rouge", "le croix rouge", "le croix rouge")
  },
  {
    id: "n92", noun: "noix", gender: "f", type: "exception",
    phrase: "la noix dure",
    options: makeOptions("la noix dure", "le noix dur", "le noix dure")
  },
  {
    id: "n93", noun: "paix", gender: "f", type: "exception",
    phrase: "la paix mondiale",
    options: makeOptions("la paix mondiale", "le paix mondial", "le paix mondiale")
  },
  {
    id: "n94", noun: "peau", gender: "f", type: "exception",
    phrase: "la peau douce",
    options: makeOptions("la peau douce", "le peau doux", "le peau douce")
  },
  {
    id: "n95", noun: "peine", gender: "f", type: "exception",
    phrase: "la peine profonde",
    options: makeOptions("la peine profonde", "le peine profond", "le peine profonde")
  },
  {
    id: "n96", noun: "peinture", gender: "f", type: "exception",
    phrase: "la peinture abstraite",
    options: makeOptions("la peinture abstraite", "le peinture abstrait", "le peinture abstraite")
  },
  {
    id: "n97", noun: "mer", gender: "f", type: "exception",
    phrase: "la mer calme",
    options: makeOptions("la mer calme", "le mer calme", "le mer calme")
  },
  {
    id: "n98", noun: "mère", gender: "f", type: "exception",
    phrase: "la mère aimante",
    options: makeOptions("la mère aimante", "le mère aimant", "le mère aimante")
  },
  {
    id: "n99", noun: "lumière", gender: "f", type: "exception",
    phrase: "la lumière vive",
    options: makeOptions("la lumière vive", "le lumière vif", "le lumière vive")
  },
  {
    id: "n100", noun: "guerre", gender: "f", type: "exception",
    phrase: "la guerre froide",
    options: makeOptions("la guerre froide", "le guerre froid", "le guerre froide")
  },
  {
    id: "n101", noun: "terre", gender: "f", type: "exception",
    phrase: "la terre ferme",
    options: makeOptions("la terre ferme", "le terre ferme", "le terre ferme")
  },
  {
    id: "n102", noun: "pierre", gender: "f", type: "exception",
    phrase: "la pierre précieuse",
    options: makeOptions("la pierre précieuse", "le pierre précieux", "le pierre précieuse")
  },
  {
    id: "n103", noun: "couleur", gender: "f", type: "exception",
    phrase: "la couleur vive",
    options: makeOptions("la couleur vive", "le couleur vif", "le couleur vive")
  },
  {
    id: "n104", noun: "peur", gender: "f", type: "exception",
    phrase: "la peur bleue",
    options: makeOptions("la peur bleue", "le peur bleu", "le peur bleue")
  },
  {
    id: "n105", noun: "valeur", gender: "f", type: "exception",
    phrase: "la valeur sûre",
    options: makeOptions("la valeur sûre", "le valeur sûr", "le valeur sûre")
  },
  {
    id: "n106", noun: "hauteur", gender: "f", type: "exception",
    phrase: "la hauteur vertigineuse",
    options: makeOptions("la hauteur vertigineuse", "le hauteur vertigineux", "le hauteur vertigineuse")
  },
  {
    id: "n107", noun: "longueur", gender: "f", type: "exception",
    phrase: "la longueur impressionnante",
    options: makeOptions("la longueur impressionnante", "le longueur impressionnant", "le longueur impressionnante")
  },
  {
    id: "n108", noun: "doigt", gender: "m", type: "exception",
    phrase: "le doigt magique",
    options: makeOptions("le doigt magique", "la doigt magique", "la doigt magique")
  },
  {
    id: "n109", noun: "clou", gender: "m", type: "exception",
    phrase: "le clou rouillé",
    options: makeOptions("le clou rouillé", "la clou rouillée", "la clou rouillé")
  },
  {
    id: "n110", noun: "tapis", gender: "m", type: "exception",
    phrase: "le tapis persan",
    options: makeOptions("le tapis persan", "la tapis persane", "la tapis persan")
  },
  {
    id: "n111", noun: "départ", gender: "m", type: "exception",
    phrase: "le départ imminent",
    options: makeOptions("le départ imminent", "la départ imminente", "la départ imminent")
  },
  {
    id: "n112", noun: "sourire", gender: "m", type: "exception",
    phrase: "le sourire éclatant",
    options: makeOptions("le sourire éclatant", "la sourire éclatante", "la sourire éclatant")
  },
  {
    id: "n113", noun: "riz", gender: "m", type: "exception",
    phrase: "le riz blanc",
    options: makeOptions("le riz blanc", "la riz blanche", "la riz blanc")
  },
  {
    id: "n114", noun: "froid", gender: "m", type: "exception",
    phrase: "le froid glacial",
    options: makeOptions("le froid glacial", "la froid glaciale", "la froid glacial")
  },
  {
    id: "n115", noun: "chaud", gender: "m", type: "exception",
    phrase: "le chaud intense",
    options: makeOptions("le chaud intense", "la chaud intense", "la chaud intense")
  },
  {
    id: "n116", noun: "début", gender: "m", type: "exception",
    phrase: "le début prometteur",
    options: makeOptions("le début prometteur", "la début prometteuse", "la début prometteur")
  },
  {
    id: "n117", noun: "appartement", gender: "m", type: "exception",
    phrase: "l'appartement spacieux",
    options: makeOptions("l'appartement spacieux", "l'appartement spacieuse", "la appartement spacieux")
  },
  {
    id: "n118", noun: "outil", gender: "m", type: "exception",
    phrase: "l'outil tranchant",
    options: makeOptions("l'outil tranchant", "la outil tranchante", "la outil tranchant")
  },
  {
    id: "n119", noun: "oeil", gender: "m", type: "exception",
    phrase: "l'oeil bleu",
    options: makeOptions("l'oeil bleu", "l'oeil bleue", "la oeil bleu")
  },
  {
    id: "n120", noun: "ciel", gender: "m", type: "exception",
    phrase: "le ciel étoilé",
    options: makeOptions("le ciel étoilé", "la ciel étoilée", "la ciel étoilé")
  },
];

// Fix the broken entry
nouns[116] = {
  id: "n117", noun: "appartement", gender: "m", type: "exception",
  phrase: "l'appartement spacieux",
  options: makeOptions("l'appartement spacieux", "l'appartement spacieuse", "la appartement spacieux")
};

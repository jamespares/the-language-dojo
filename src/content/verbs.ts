export type VerbItem = {
  id: string;
  verb: string;
  context: string;
  correct: string;
  options: string[];
  category: string;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeOptions(correct: string, wrong1: string, wrong2: string): string[] {
  return shuffle([correct, wrong1, wrong2]);
}

export const verbItems: VerbItem[] = [
  // PENSER À vs DE
  { id: "v1", verb: "penser", context: "Qu'est-ce que tu ___ ?", correct: "Qu'est-ce que tu penses de ce film ?", options: makeOptions("Qu'est-ce que tu penses de ce film ?", "Qu'est-ce que tu penses à ce film ?", "Qu'est-ce que tu penses ce film ?"), category: "à-de" },
  { id: "v2", verb: "penser", context: "Je ___ mon ami tous les jours.", correct: "Je pense à mon ami tous les jours.", options: makeOptions("Je pense à mon ami tous les jours.", "Je pense de mon ami tous les jours.", "Je pense mon ami tous les jours."), category: "à-de" },
  { id: "v3", verb: "penser", context: "Elle ___ ses vacances.", correct: "Elle pense à ses vacances.", options: makeOptions("Elle pense à ses vacances.", "Elle pense de ses vacances.", "Elle pense ses vacances."), category: "à-de" },
  { id: "v4", verb: "penser", context: "Que penses-tu ___ cette idée ?", correct: "Que penses-tu de cette idée ?", options: makeOptions("Que penses-tu de cette idée ?", "Que penses-tu à cette idée ?", "Que penses-tu cette idée ?"), category: "à-de" },
  
  // RÊVER DE vs À
  { id: "v5", verb: "rêver", context: "Je ___ de voyager.", correct: "Je rêve de voyager.", options: makeOptions("Je rêve de voyager.", "Je rêve à voyager.", "Je rêve voyager."), category: "à-de" },
  { id: "v6", verb: "rêver", context: "Elle ___ son enfance.", correct: "Elle rêve de son enfance.", options: makeOptions("Elle rêve de son enfance.", "Elle rêve à son enfance.", "Elle rêve son enfance."), category: "à-de" },
  
  // PARLER À vs DE
  { id: "v7", verb: "parler", context: "Je ___ mon professeur.", correct: "Je parle à mon professeur.", options: makeOptions("Je parle à mon professeur.", "Je parle de mon professeur.", "Je parle mon professeur."), category: "à-de" },
  { id: "v8", verb: "parler", context: "Il ___ politique.", correct: "Il parle de politique.", options: makeOptions("Il parle de politique.", "Il parle à politique.", "Il parle politique."), category: "à-de" },
  { id: "v9", verb: "parler", context: "Nous ___ nos projets.", correct: "Nous parlons de nos projets.", options: makeOptions("Nous parlons de nos projets.", "Nous parlons à nos projets.", "Nous parlons nos projets."), category: "à-de" },
  
  // TÉLÉPHONER À
  { id: "v10", verb: "téléphoner", context: "Je ___ ma mère ce soir.", correct: "Je téléphone à ma mère ce soir.", options: makeOptions("Je téléphone à ma mère ce soir.", "Je téléphone de ma mère ce soir.", "Je téléphone ma mère ce soir."), category: "à-de" },
  { id: "v11", verb: "téléphoner", context: "Elle ___ son médecin.", correct: "Elle téléphone à son médecin.", options: makeOptions("Elle téléphone à son médecin.", "Elle téléphone de son médecin.", "Elle téléphone son médecin."), category: "à-de" },
  
  // RÉPONDRE À
  { id: "v12", verb: "répondre", context: "Je ___ la question.", correct: "Je réponds à la question.", options: makeOptions("Je réponds à la question.", "Je réponds de la question.", "Je réponds la question."), category: "à-de" },
  { id: "v13", verb: "répondre", context: "Il ___ son ami.", correct: "Il répond à son ami.", options: makeOptions("Il répond à son ami.", "Il répond de son ami.", "Il répond son ami."), category: "à-de" },
  
  // RESSEMBLER À
  { id: "v14", verb: "ressembler", context: "Elle ___ sa mère.", correct: "Elle ressemble à sa mère.", options: makeOptions("Elle ressemble à sa mère.", "Elle ressemble de sa mère.", "Elle ressemble sa mère."), category: "à-de" },
  { id: "v15", verb: "ressembler", context: "Ils ___ leurs parents.", correct: "Ils ressemblent à leurs parents.", options: makeOptions("Ils ressemblent à leurs parents.", "Ils ressemblent de leurs parents.", "Ils ressemblent leurs parents."), category: "à-de" },
  
  // DEMANDER À vs DE
  { id: "v16", verb: "demander", context: "Je ___ mon frère de m'aider.", correct: "Je demande à mon frère de m'aider.", options: makeOptions("Je demande à mon frère de m'aider.", "Je demande de mon frère de m'aider.", "Je demande mon frère de m'aider."), category: "à-de" },
  { id: "v17", verb: "demander", context: "Il ___ du pain.", correct: "Il demande du pain.", options: makeOptions("Il demande du pain.", "Il demande à du pain.", "Il demande de du pain."), category: "à-de" },
  { id: "v18", verb: "demander", context: "Elle ___ son chemin.", correct: "Elle demande son chemin.", options: makeOptions("Elle demande son chemin.", "Elle demande à son chemin.", "Elle demande de son chemin."), category: "à-de" },
  
  // DÉCIDER DE
  { id: "v19", verb: "décider", context: "Nous ___ partir demain.", correct: "Nous décidons de partir demain.", options: makeOptions("Nous décidons de partir demain.", "Nous décidons à partir demain.", "Nous décidons partir demain."), category: "à-de" },
  { id: "v20", verb: "décider", context: "Elle ___ de rester.", correct: "Elle décide de rester.", options: makeOptions("Elle décide de rester.", "Elle décide à rester.", "Elle décide rester."), category: "à-de" },
  
  // ESSAYER DE
  { id: "v21", verb: "essayer", context: "J' ___ comprendre.", correct: "J'essaye de comprendre.", options: makeOptions("J'essaye de comprendre.", "J'essaye à comprendre.", "J'essaye comprendre."), category: "à-de" },
  { id: "v22", verb: "essayer", context: "Il ___ de faire attention.", correct: "Il essaie de faire attention.", options: makeOptions("Il essaie de faire attention.", "Il essaie à faire attention.", "Il essaie faire attention."), category: "à-de" },
  
  // RÉUSSIR À
  { id: "v23", verb: "réussir", context: "Elle ___ son examen.", correct: "Elle réussit à son examen.", options: makeOptions("Elle réussit à son examen.", "Elle réussit de son examen.", "Elle réussit son examen."), category: "à-de" },
  { id: "v24", verb: "réussir", context: "Nous ___ passer.", correct: "Nous réussissons à passer.", options: makeOptions("Nous réussissons à passer.", "Nous réussissons de passer.", "Nous réussissons passer."), category: "à-de" },
  
  // APPRENDRE À
  { id: "v25", verb: "apprendre", context: "Je ___ nager.", correct: "J'apprends à nager.", options: makeOptions("J'apprends à nager.", "J'apprends de nager.", "J'apprends nager."), category: "à-de" },
  { id: "v26", verb: "apprendre", context: "Elle ___ le français.", correct: "Elle apprend le français.", options: makeOptions("Elle apprend le français.", "Elle apprend à le français.", "Elle apprend de le français."), category: "à-de" },
  
  // COMMENCER À
  { id: "v27", verb: "commencer", context: "Il ___ pleuvoir.", correct: "Il commence à pleuvoir.", options: makeOptions("Il commence à pleuvoir.", "Il commence de pleuvoir.", "Il commence pleuvoir."), category: "à-de" },
  { id: "v28", verb: "commencer", context: "Nous ___ le travail.", correct: "Nous commençons le travail.", options: makeOptions("Nous commençons le travail.", "Nous commençons à le travail.", "Nous commençons de le travail."), category: "à-de" },
  
  // FINIR DE
  { id: "v29", verb: "finir", context: "Je ___ manger.", correct: "Je finis de manger.", options: makeOptions("Je finis de manger.", "Je finis à manger.", "Je finis manger."), category: "à-de" },
  { id: "v30", verb: "finir", context: "Elle ___ ses devoirs.", correct: "Elle finit ses devoirs.", options: makeOptions("Elle finit ses devoirs.", "Elle finit à ses devoirs.", "Elle finit de ses devoirs."), category: "à-de" },
  
  // AVOIR PEUR DE
  { id: "v31", verb: "avoir peur", context: "J' ___ du noir.", correct: "J'ai peur du noir.", options: makeOptions("J'ai peur du noir.", "J'ai peur à du noir.", "J'ai peur de du noir."), category: "à-de" },
  { id: "v32", verb: "avoir peur", context: "Elle ___ des araignées.", correct: "Elle a peur des araignées.", options: makeOptions("Elle a peur des araignées.", "Elle a peur à des araignées.", "Elle a peur de des araignées."), category: "à-de" },
  
  // ÊTRE INTÉRESSÉ PAR
  { id: "v33", verb: "être intéressé", context: "Je ___ l'histoire.", correct: "Je suis intéressé par l'histoire.", options: makeOptions("Je suis intéressé par l'histoire.", "Je suis intéressé de l'histoire.", "Je suis intéressé à l'histoire."), category: "à-de" },
  { id: "v34", verb: "être intéressé", context: "Elle ___ la musique.", correct: "Elle est intéressée par la musique.", options: makeOptions("Elle est intéressée par la musique.", "Elle est intéressée de la musique.", "Elle est intéressée à la musique."), category: "à-de" },
  
  // SE SOUVENIR DE
  { id: "v35", verb: "se souvenir", context: "Je ___ mon enfance.", correct: "Je me souviens de mon enfance.", options: makeOptions("Je me souviens de mon enfance.", "Je me souviens à mon enfance.", "Je me souviens mon enfance."), category: "à-de" },
  { id: "v36", verb: "se souvenir", context: "Elle ___ de cette chanson.", correct: "Elle se souvient de cette chanson.", options: makeOptions("Elle se souvient de cette chanson.", "Elle se souvient à cette chanson.", "Elle se souvient cette chanson."), category: "à-de" },
  
  // JOUER À vs DE
  { id: "v37", verb: "jouer", context: "Je ___ au tennis.", correct: "Je joue au tennis.", options: makeOptions("Je joue au tennis.", "Je joue de tennis.", "Je joue à tennis."), category: "à-de" },
  { id: "v38", verb: "jouer", context: "Elle ___ du piano.", correct: "Elle joue du piano.", options: makeOptions("Elle joue du piano.", "Elle joue au piano.", "Elle joue de piano."), category: "à-de" },
  { id: "v39", verb: "jouer", context: "Nous ___ aux cartes.", correct: "Nous jouons aux cartes.", options: makeOptions("Nous jouons aux cartes.", "Nous jouons de cartes.", "Nous jouons à cartes."), category: "à-de" },
  { id: "v40", verb: "jouer", context: "Il ___ de la guitare.", correct: "Il joue de la guitare.", options: makeOptions("Il joue de la guitare.", "Il joue à la guitare.", "Il joue la guitare."), category: "à-de" },
  
  // EN / Y integration
  { id: "v41", verb: "parler", context: "J'___ ai parlé.", correct: "J'y ai parlé.", options: makeOptions("J'y ai parlé.", "J'en ai parlé.", "Je l'ai parlé."), category: "en-y" },
  { id: "v42", verb: "penser", context: "J'___ ai pensé.", correct: "J'y ai pensé.", options: makeOptions("J'y ai pensé.", "J'en ai pensé.", "Je l'ai pensé."), category: "en-y" },
  { id: "v43", verb: "rêver", context: "J'___ ai rêvé.", correct: "J'en ai rêvé.", options: makeOptions("J'en ai rêvé.", "J'y ai rêvé.", "Je l'ai rêvé."), category: "en-y" },
  { id: "v44", verb: "demander", context: "J'___ ai demandé.", correct: "Je le lui ai demandé.", options: makeOptions("Je le lui ai demandé.", "J'en ai demandé.", "J'y ai demandé."), category: "en-y" },
  { id: "v45", verb: "téléphoner", context: "J'___ ai téléphoné.", correct: "Je lui ai téléphoné.", options: makeOptions("Je lui ai téléphoné.", "J'en ai téléphoné.", "J'y ai téléphoné."), category: "en-y" },
  { id: "v46", verb: "répondre", context: "J'___ ai répondu.", correct: "Je lui ai répondu.", options: makeOptions("Je lui ai répondu.", "J'en ai répondu.", "J'y ai répondu."), category: "en-y" },
  { id: "v47", verb: "penser", context: "___ de ce livre ?", correct: "Que penses-tu de ce livre ?", options: makeOptions("Que penses-tu de ce livre ?", "Que penses-tu à ce livre ?", "Que penses-tu en ce livre ?"), category: "en-y" },
  { id: "v48", verb: "parler", context: "___ de tes vacances ?", correct: "Tu as parlé de tes vacances ?", options: makeOptions("Tu as parlé de tes vacances ?", "Tu as parlé à tes vacances ?", "Tu as parlé en tes vacances ?"), category: "en-y" },
  { id: "v49", verb: "rêver", context: "___ de devenir pilote.", correct: "Il rêve de devenir pilote.", options: makeOptions("Il rêve de devenir pilote.", "Il rêve à devenir pilote.", "Il rêve en devenir pilote."), category: "en-y" },
  { id: "v50", verb: "jouer", context: "___ du violon depuis dix ans.", correct: "Elle joue du violon depuis dix ans.", options: makeOptions("Elle joue du violon depuis dix ans.", "Elle joue au violon depuis dix ans.", "Elle joue en violon depuis dix ans."), category: "en-y" },
];

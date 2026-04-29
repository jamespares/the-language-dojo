export type SubjunctiveItem = {
  id: string;
  starter: string;
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

export const subjunctiveItems: SubjunctiveItem[] = [
  // EMOTION
  { id: "s1", starter: "Je suis content que", correct: "Je suis content que tu viennes.", options: makeOptions("Je suis content que tu viennes.", "Je suis content que tu viens.", "Je suis content que tu venais."), category: "emotion" },
  { id: "s2", starter: "Elle est triste que", correct: "Elle est triste que son ami parte.", options: makeOptions("Elle est triste que son ami parte.", "Elle est triste que son ami part.", "Elle est triste que son ami partait."), category: "emotion" },
  { id: "s3", starter: "Nous avons peur que", correct: "Nous avons peur qu'il pleuve.", options: makeOptions("Nous avons peur qu'il pleuve.", "Nous avons peur qu'il pleut.", "Nous avons peur qu'il plu."), category: "emotion" },
  { id: "s4", starter: "Il est étonnant que", correct: "Il est étonnant qu'elle sache tout.", options: makeOptions("Il est étonnant qu'elle sache tout.", "Il est étonnant qu'elle sait tout.", "Il est étonnant qu'elle savait tout."), category: "emotion" },
  { id: "s5", starter: "Je regrette que", correct: "Je regrette que vous ne puissiez pas venir.", options: makeOptions("Je regrette que vous ne puissiez pas venir.", "Je regrette que vous ne pouvez pas venir.", "Je regrette que vous ne pouviez pas venir."), category: "emotion" },
  { id: "s6", starter: "Elle est heureuse que", correct: "Elle est heureuse que son fils réussisse.", options: makeOptions("Elle est heureuse que son fils réussisse.", "Elle est heureuse que son fils réussit.", "Elle est heureuse que son fils a réussi."), category: "emotion" },
  { id: "s7", starter: "C'est dommage que", correct: "C'est dommage qu'il fasse froid.", options: makeOptions("C'est dommage qu'il fasse froid.", "C'est dommage qu'il fait froid.", "C'est dommage qu'il faisait froid."), category: "emotion" },
  { id: "s8", starter: "Je suis surpris que", correct: "Je suis surpris qu'elle comprenne.", options: makeOptions("Je suis surpris qu'elle comprenne.", "Je suis surpris qu'elle comprend.", "Je suis surpris qu'elle comprenait."), category: "emotion" },
  { id: "s9", starter: "Nous sommes fiers que", correct: "Nous sommes fiers que notre équipe gagne.", options: makeOptions("Nous sommes fiers que notre équipe gagne.", "Nous sommes fiers que notre équipe gagne.", "Nous sommes fiers que notre équipe a gagné."), category: "emotion" },
  { id: "s10", starter: "Il est honteux que", correct: "Il est honteux qu'on mente.", options: makeOptions("Il est honteux qu'on mente.", "Il est honteux qu'on ment.", "Il est honteux qu'on a menti."), category: "emotion" },
  
  // DOUBT
  { id: "s11", starter: "Je doute que", correct: "Je doute qu'il vienne.", options: makeOptions("Je doute qu'il vienne.", "Je doute qu'il vient.", "Je doute qu'il est venu."), category: "doubt" },
  { id: "s12", starter: "Elle ne croit pas que", correct: "Elle ne croit pas que ce soit vrai.", options: makeOptions("Elle ne croit pas que ce soit vrai.", "Elle ne croit pas que c'est vrai.", "Elle ne croit pas que c'était vrai."), category: "doubt" },
  { id: "s13", starter: "Nous ne sommes pas sûrs que", correct: "Nous ne sommes pas sûrs qu'elle comprenne.", options: makeOptions("Nous ne sommes pas sûrs qu'elle comprenne.", "Nous ne sommes pas sûrs qu'elle comprend.", "Nous ne sommes pas sûrs qu'elle a compris."), category: "doubt" },
  { id: "s14", starter: "Il est improbable que", correct: "Il est improbable qu'ils arrivent à temps.", options: makeOptions("Il est improbable qu'ils arrivent à temps.", "Il est improbable qu'ils arrivent à temps.", "Il est improbable qu'ils sont arrivés à temps."), category: "doubt" },
  { id: "s15", starter: "Je nie que", correct: "Je nie que tu aies raison.", options: makeOptions("Je nie que tu aies raison.", "Je nie que tu as raison.", "Je nie que tu avais raison."), category: "doubt" },
  { id: "s16", starter: "Elle doute que", correct: "Elle doute que la réponse soit juste.", options: makeOptions("Elle doute que la réponse soit juste.", "Elle doute que la réponse est juste.", "Elle doute que la réponse était juste."), category: "doubt" },
  { id: "s17", starter: "Nous n'imaginons pas que", correct: "Nous n'imaginons pas qu'il fasse ça.", options: makeOptions("Nous n'imaginons pas qu'il fasse ça.", "Nous n'imaginons pas qu'il fait ça.", "Nous n'imaginons pas qu'il a fait ça."), category: "doubt" },
  { id: "s18", starter: "Il est douteux que", correct: "Il est douteux qu'elle vienne.", options: makeOptions("Il est douteux qu'elle vienne.", "Il est douteux qu'elle vient.", "Il est douteux qu'elle est venue."), category: "doubt" },
  
  // NECESSITY
  { id: "s19", starter: "Il faut que", correct: "Il faut que tu fasses tes devoirs.", options: makeOptions("Il faut que tu fasses tes devoirs.", "Il faut que tu fais tes devoirs.", "Il faut que tu as fait tes devoirs."), category: "necessity" },
  { id: "s20", starter: "Il est nécessaire que", correct: "Il est nécessaire qu'on parte tôt.", options: makeOptions("Il est nécessaire qu'on parte tôt.", "Il est nécessaire qu'on part tôt.", "Il est nécessaire qu'on est parti tôt."), category: "necessity" },
  { id: "s21", starter: "Il est important que", correct: "Il est important que vous sachiez cela.", options: makeOptions("Il est important que vous sachiez cela.", "Il est important que vous savez cela.", "Il est important que vous saviez cela."), category: "necessity" },
  { id: "s22", starter: "Il vaut mieux que", correct: "Il vaut mieux qu'elle reste.", options: makeOptions("Il vaut mieux qu'elle reste.", "Il vaut mieux qu'elle reste.", "Il vaut mieux qu'elle est restée."), category: "necessity" },
  { id: "s23", starter: "Il est essentiel que", correct: "Il est essentiel que nous finissions.", options: makeOptions("Il est essentiel que nous finissions.", "Il est essentiel que nous finissons.", "Il est essentiel que nous avons fini."), category: "necessity" },
  { id: "s24", starter: "Il est indispensable que", correct: "Il est indispensable qu'il vienne.", options: makeOptions("Il est indispensable qu'il vienne.", "Il est indispensable qu'il vient.", "Il est indispensable qu'il est venu."), category: "necessity" },
  { id: "s25", starter: "Il est temps que", correct: "Il est temps que tu décides.", options: makeOptions("Il est temps que tu décides.", "Il est temps que tu décides.", "Il est temps que tu as décidé."), category: "necessity" },
  
  // PURPOSE
  { id: "s26", starter: "Je téléphone pour que", correct: "Je téléphone pour que tu saches.", options: makeOptions("Je téléphone pour que tu saches.", "Je téléphone pour que tu sais.", "Je téléphone pour que tu savais."), category: "purpose" },
  { id: "s27", starter: "Elle étudie afin que", correct: "Elle étudie afin qu'elle réussisse.", options: makeOptions("Elle étudie afin qu'elle réussisse.", "Elle étudie afin qu'elle réussit.", "Elle étudie afin qu'elle a réussi."), category: "purpose" },
  { id: "s28", starter: "Nous partons tôt pour que", correct: "Nous partons tôt pour que vous arriviez à l'heure.", options: makeOptions("Nous partons tôt pour que vous arriviez à l'heure.", "Nous partons tôt pour que vous arrivez à l'heure.", "Nous partons tôt pour que vous êtes arrivés à l'heure."), category: "purpose" },
  { id: "s29", starter: "Il parle lentement afin que", correct: "Il parle lentement afin que tout le monde comprenne.", options: makeOptions("Il parle lentement afin que tout le monde comprenne.", "Il parle lentement afin que tout le monde comprend.", "Il parle lentement afin que tout le monde a compris."), category: "purpose" },
  { id: "s30", starter: "Elle écrit pour que", correct: "Elle écrit pour que tu comprennes.", options: makeOptions("Elle écrit pour que tu comprennes.", "Elle écrit pour que tu comprends.", "Elle écrit pour que tu comprenais."), category: "purpose" },
  
  // CONCESSION
  { id: "s31", starter: "Bien qu'il", correct: "Bien qu'il soit fatigué, il travaille.", options: makeOptions("Bien qu'il soit fatigué, il travaille.", "Bien qu'il est fatigué, il travaille.", "Bien qu'il était fatigué, il travaille."), category: "concession" },
  { id: "s32", starter: "Quoiqu'elle", correct: "Quoiqu'elle soit malade, elle vient.", options: makeOptions("Quoiqu'elle soit malade, elle vient.", "Quoiqu'elle est malade, elle vient.", "Quoiqu'elle était malade, elle vient."), category: "concession" },
  { id: "s33", starter: "Bien que nous", correct: "Bien que nous sachions la vérité, nous ne disons rien.", options: makeOptions("Bien que nous sachions la vérité, nous ne disons rien.", "Bien que nous savons la vérité, nous ne disons rien.", "Bien que nous savions la vérité, nous ne disons rien."), category: "concession" },
  { id: "s34", starter: "Bien qu'ils", correct: "Bien qu'ils soient pauvres, ils sont heureux.", options: makeOptions("Bien qu'ils soient pauvres, ils sont heureux.", "Bien qu'ils sont pauvres, ils sont heureux.", "Bien qu'ils étaient pauvres, ils sont heureux."), category: "concession" },
  { id: "s35", starter: "Quoique tu", correct: "Quoique tu fasses de ton mieux, ce n'est pas suffisant.", options: makeOptions("Quoique tu fasses de ton mieux, ce n'est pas suffisant.", "Quoique tu fais de ton mieux, ce n'est pas suffisant.", "Quoique tu faisais de ton mieux, ce n'est pas suffisant."), category: "concession" },
  { id: "s36", starter: "Bien que je", correct: "Bien que je comprenne, je ne suis pas d'accord.", options: makeOptions("Bien que je comprenne, je ne suis pas d'accord.", "Bien que je comprends, je ne suis pas d'accord.", "Bien que je comprenais, je ne suis pas d'accord."), category: "concession" },
  
  // CONDITION
  { id: "s37", starter: "À moins que tu", correct: "À moins que tu étudies, tu ne réussiras pas.", options: makeOptions("À moins que tu étudies, tu ne réussiras pas.", "À moins que tu étudies, tu ne réussiras pas.", "À moins que tu as étudié, tu ne réussiras pas."), category: "condition" },
  { id: "s38", starter: "Pourvu qu'il", correct: "Pourvu qu'il fasse beau, nous irons à la plage.", options: makeOptions("Pourvu qu'il fasse beau, nous irons à la plage.", "Pourvu qu'il fait beau, nous irons à la plage.", "Pourvu qu'il faisait beau, nous irons à la plage."), category: "condition" },
  { id: "s39", starter: "À condition que vous", correct: "À condition que vous soyez ponctuels, vous pouvez entrer.", options: makeOptions("À condition que vous soyez ponctuels, vous pouvez entrer.", "À condition que vous êtes ponctuels, vous pouvez entrer.", "À condition que vous étiez ponctuels, vous pouvez entrer."), category: "condition" },
  { id: "s40", starter: "Pourvu qu'elle", correct: "Pourvu qu'elle comprenne, tout ira bien.", options: makeOptions("Pourvu qu'elle comprenne, tout ira bien.", "Pourvu qu'elle comprend, tout ira bien.", "Pourvu qu'elle comprenait, tout ira bien."), category: "condition" },
  { id: "s41", starter: "À moins que nous", correct: "À moins que nous partions maintenant, nous allons rater le train.", options: makeOptions("À moins que nous partions maintenant, nous allons rater le train.", "À moins que nous partons maintenant, nous allons rater le train.", "À moins que nous sommes partis maintenant, nous allons rater le train."), category: "condition" },
  
  // SUPERLATIVE / RELATIVE
  { id: "s42", starter: "C'est le seul qui", correct: "C'est le seul qui comprenne.", options: makeOptions("C'est le seul qui comprenne.", "C'est le seul qui comprend.", "C'est le seul qui comprenait."), category: "superlative" },
  { id: "s43", starter: "C'est la meilleure décision que", correct: "C'est la meilleure décision que nous puissions prendre.", options: makeOptions("C'est la meilleure décision que nous puissions prendre.", "C'est la meilleure décision que nous pouvons prendre.", "C'est la meilleure décision que nous pouvions prendre."), category: "superlative" },
  { id: "s44", starter: "C'est le premier qui", correct: "C'est le premier qui arrive.", options: makeOptions("C'est le premier qui arrive.", "C'est le premier qui arrive.", "C'est le premier qui est arrivé."), category: "superlative" },
  { id: "s45", starter: "Je cherche quelqu'un qui", correct: "Je cherche quelqu'un qui sache parler japonais.", options: makeOptions("Je cherche quelqu'un qui sache parler japonais.", "Je cherche quelqu'un qui sait parler japonais.", "Je cherche quelqu'un qui savait parler japonais."), category: "superlative" },
  { id: "s46", starter: "Il n'y a rien que", correct: "Il n'y a rien que je puisse faire.", options: makeOptions("Il n'y a rien que je puisse faire.", "Il n'y a rien que je peux faire.", "Il n'y a rien que je pouvais faire."), category: "superlative" },
  { id: "s47", starter: "C'est le meilleur film que", correct: "C'est le meilleur film que j'aie jamais vu.", options: makeOptions("C'est le meilleur film que j'aie jamais vu.", "C'est le meilleur film que j'ai jamais vu.", "C'est le meilleur film que j'avais jamais vu."), category: "superlative" },
  { id: "s48", starter: "Il n'y a personne qui", correct: "Il n'y a personne qui sache cela.", options: makeOptions("Il n'y a personne qui sache cela.", "Il n'y a personne qui sait cela.", "Il n'y a personne qui savait cela."), category: "superlative" },
  
  // INDICATIVE (not subjunctive - for contrast)
  { id: "s49", starter: "Je sais que", correct: "Je sais qu'il est malade.", options: makeOptions("Je sais qu'il est malade.", "Je sais qu'il soit malade.", "Je sais qu'il fût malade."), category: "indicative" },
  { id: "s50", starter: "Elle croit que", correct: "Elle croit que c'est vrai.", options: makeOptions("Elle croit que c'est vrai.", "Elle croit que ce soit vrai.", "Elle croit que ce fût vrai."), category: "indicative" },
  { id: "s51", starter: "Nous voyons que", correct: "Nous voyons qu'il fait beau.", options: makeOptions("Nous voyons qu'il fait beau.", "Nous voyons qu'il fasse beau.", "Nous voyons qu'il fit beau."), category: "indicative" },
  { id: "s52", starter: "Il est certain que", correct: "Il est certain qu'elle viendra.", options: makeOptions("Il est certain qu'elle viendra.", "Il est certain qu'elle vienne.", "Il est certain qu'elle vînt."), category: "indicative" },
  { id: "s53", starter: "Je pense que", correct: "Je pense qu'il a raison.", options: makeOptions("Je pense qu'il a raison.", "Je pense qu'il ait raison.", "Je pense qu'il eût raison."), category: "indicative" },
  { id: "s54", starter: "Elle dit que", correct: "Elle dit qu'elle part demain.", options: makeOptions("Elle dit qu'elle part demain.", "Elle dit qu'elle parte demain.", "Elle dit qu'elle partît demain."), category: "indicative" },
  { id: "s55", starter: "Nous espérons que", correct: "Nous espérons que tout ira bien.", options: makeOptions("Nous espérons que tout ira bien.", "Nous espérons que tout aille bien.", "Nous espérons que tout allât bien."), category: "indicative" },
  { id: "s56", starter: "Il est évident que", correct: "Il est évident qu'ils mentent.", options: makeOptions("Il est évident qu'ils mentent.", "Il est évident qu'ils mentent.", "Il est évident qu'ils mentissent."), category: "indicative" },
];

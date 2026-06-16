import { CardData, Difficulty } from './types';

export const MICRO_PATH_DATA: { concept: string; characteristic: string; topic: string; explanation: string; difficulty: Difficulty }[] = [
  // Easy
  {
    topic: "Normal Human Microflora",
    concept: "Staphylococcus epidermidis",
    characteristic: "Commensal skin bacteria that prevents pathogen colonization.",
    explanation: "Commensals are part of the normal flora that live on the host without causing harm, often providing protection by competing with pathogens for space and nutrients.",
    difficulty: 'Easy'
  },
  {
    topic: "Natural & Artificial Immunity",
    concept: "Vaccination",
    characteristic: "Artificial active immunity induced by antigen exposure.",
    explanation: "Vaccines stimulate the immune system to produce a response (active immunity) without causing the full-blown disease.",
    difficulty: 'Easy'
  },
  {
    topic: "Antigen and Antibody Reactions",
    concept: "Agglutination",
    characteristic: "Clumping of cells when antibodies bind to surface antigens.",
    explanation: "Agglutination is a visible reaction where bivalent or multivalent antibodies cross-link cells or large particles into clusters.",
    difficulty: 'Easy'
  },
  {
    topic: "ELISA & RIA",
    concept: "ELISA (Enzyme-Linked Immunosorbent Assay)",
    characteristic: "Diagnostic assay using enzyme-labeled antibodies for detection.",
    explanation: "ELISA uses enzymes to produce a color change, indicating the presence of a specific antigen or antibody.",
    difficulty: 'Easy'
  },
  {
    topic: "Bacteriology",
    concept: "Gram Stain",
    characteristic: "Method to differentiate bacteria based on cell wall composition.",
    explanation: "Gram staining uses crystal violet and safranin to distinguish between Gram-positive (purple) and Gram-negative (pink) bacteria.",
    difficulty: 'Easy'
  },
  {
    topic: "Immunology",
    concept: "Antigen",
    characteristic: "A substance that triggers an immune response in the body.",
    explanation: "Antigens are typically proteins or polysaccharides found on the surface of pathogens that are recognized by the immune system.",
    difficulty: 'Easy'
  },
  {
    topic: "Host–Parasite Interaction",
    concept: "Bacterial Pili",
    characteristic: "Adhesion mechanism used to attach to host cell receptors.",
    explanation: "Adhesion is a critical first step in infection. Bacteria use specialized structures like pili (fimbriae) to securely attach to host tissues.",
    difficulty: 'Easy'
  },
  {
    topic: "Autoimmune Disorders",
    concept: "Type 1 Diabetes",
    characteristic: "Immune system attacks insulin-producing beta cells in the pancreas.",
    explanation: "Type 1 Diabetes is an autoimmune condition where the body's own T-cells destroy the cells responsible for regulating blood sugar.",
    difficulty: 'Easy'
  },
  {
    topic: "Mycology",
    concept: "Candida albicans",
    characteristic: "Opportunistic yeast that forms germ tubes in serum.",
    explanation: "Candida albicans is a common member of the human gut flora but can cause infections (candidiasis) when the host's immune system or normal flora is disrupted.",
    difficulty: 'Easy'
  },
  
  // Medium
  {
    topic: "Exotoxins & Endotoxins",
    concept: "Lipopolysaccharide (LPS)",
    characteristic: "Endotoxin released from Gram-negative bacterial cell walls.",
    explanation: "Endotoxins are part of the bacterial structure (like LPS in Gram-negatives) and are released upon cell death, whereas exotoxins are actively secreted proteins.",
    difficulty: 'Medium'
  },
  {
    topic: "Autoimmune Disorders",
    concept: "Systemic Lupus Erythematosus",
    characteristic: "Body produces autoantibodies against its own nuclear DNA.",
    explanation: "Autoimmune disorders occur when the immune system fails to distinguish between self and non-self, attacking the body's own tissues.",
    difficulty: 'Medium'
  },
  {
    topic: "Immunodiffusion",
    concept: "Ouchterlony Technique",
    characteristic: "Antigen and antibody diffuse in agar to form a precipitate line.",
    explanation: "Immunodiffusion is a serological technique used to detect and quantify antigens or antibodies based on their diffusion through a gel.",
    difficulty: 'Medium'
  },
  {
    topic: "Monoclonal Antibodies",
    concept: "Hybridoma Technology",
    characteristic: "Fusion of B-cells and myeloma cells for antibody production.",
    explanation: "Hybridomas are immortal cell lines that produce large quantities of identical (monoclonal) antibodies with specific binding properties.",
    difficulty: 'Medium'
  },
  {
    topic: "Host–Parasite Interaction",
    concept: "Invasiveness",
    characteristic: "The ability of a pathogen to spread into host tissues.",
    explanation: "Invasiveness involves the production of enzymes (like hyaluronidase) that break down host barriers, allowing the pathogen to spread.",
    difficulty: 'Medium'
  },
  {
    topic: "Exotoxins & Endotoxins",
    concept: "Tetanospasmin",
    characteristic: "Neurotoxic exotoxin that causes spastic paralysis.",
    explanation: "Tetanospasmin is an exotoxin produced by Clostridium tetani that blocks inhibitory neurotransmitters, leading to muscle spasms.",
    difficulty: 'Medium'
  },
  {
    topic: "Natural & Artificial Immunity",
    concept: "Passive Immunity",
    characteristic: "Transfer of pre-formed antibodies (e.g., breast milk).",
    explanation: "Passive immunity provides immediate but temporary protection by giving the host antibodies produced by another individual.",
    difficulty: 'Medium'
  },
  {
    topic: "Antigen and Antibody Reactions",
    concept: "Precipitation",
    characteristic: "Formation of insoluble complexes from soluble antigens.",
    explanation: "Precipitation occurs when soluble antigens and antibodies combine in optimal proportions to form a visible solid lattice.",
    difficulty: 'Medium'
  },
  {
    topic: "Virology",
    concept: "Influenza Virus",
    characteristic: "Undergoes antigenic drift and shift to evade immunity.",
    explanation: "Antigenic drift involves small mutations in surface proteins, while antigenic shift involves major genetic reassortment, often leading to pandemics.",
    difficulty: 'Medium'
  },
  {
    topic: "Parasitology",
    concept: "Giardia lamblia",
    characteristic: "Flagellated protozoan with a pear-shaped trophozoite.",
    explanation: "Giardia is a common cause of waterborne diarrheal disease. Its trophozoite has two nuclei, giving it a characteristic 'face-like' appearance.",
    difficulty: 'Medium'
  },
  {
    topic: "Bacteriology",
    concept: "Binary Fission",
    characteristic: "Primary method of asexual reproduction in bacteria.",
    explanation: "Binary fission is the process where a single bacterial cell divides into two identical daughter cells.",
    difficulty: 'Medium'
  },
  {
    topic: "Virology",
    concept: "Bacteriophage",
    characteristic: "A virus that specifically infects and replicates within bacteria.",
    explanation: "Bacteriophages (or phages) are viruses that use bacteria as hosts to replicate, often leading to the lysis of the bacterial cell.",
    difficulty: 'Medium'
  },
  
  // Hard
  {
    topic: "ELISA & RIA",
    concept: "RIA (Radioimmunoassay)",
    characteristic: "Uses radiolabeled antigens to compete for antibody binding.",
    explanation: "RIA is a highly sensitive technique that uses radioactive isotopes to measure very small concentrations of antigens or hormones.",
    difficulty: 'Hard'
  },
  {
    topic: "Immunology",
    concept: "MHC Class I",
    characteristic: "Presents endogenous antigens to CD8+ cytotoxic T-cells.",
    explanation: "Major Histocompatibility Complex (MHC) Class I molecules are found on all nucleated cells and are essential for the immune system to recognize infected cells.",
    difficulty: 'Hard'
  },
  {
    topic: "Bacteriology",
    concept: "Conjugation",
    characteristic: "Transfer of genetic material via direct cell-to-cell contact.",
    explanation: "Conjugation involves the transfer of plasmids through a pilus, allowing for the spread of antibiotic resistance genes among bacteria.",
    difficulty: 'Hard'
  },
  {
    topic: "Monoclonal Antibodies",
    concept: "Chimeric Antibodies",
    characteristic: "Antibodies with mouse variable regions and human constant regions.",
    explanation: "Chimeric antibodies are engineered to reduce the human anti-mouse antibody (HAMA) response during clinical therapy.",
    difficulty: 'Hard'
  },
  {
    topic: "Immunodiffusion",
    concept: "Mancini Technique",
    characteristic: "Radial immunodiffusion used for quantitative antigen measurement.",
    explanation: "In the Mancini technique, the diameter of the precipitation ring is proportional to the concentration of the antigen in the well.",
    difficulty: 'Hard'
  },
  {
    topic: "Host–Parasite Interaction",
    concept: "Antigenic Variation",
    characteristic: "Pathogen changes surface proteins to evade immune detection.",
    explanation: "Antigenic variation is a survival strategy used by pathogens like Neisseria gonorrhoeae to stay ahead of the host's adaptive immune response.",
    difficulty: 'Hard'
  },
  {
    topic: "Exotoxins & Endotoxins",
    concept: "A-B Toxins",
    characteristic: "Two-component toxins where 'B' binds and 'A' is active.",
    explanation: "A-B toxins are a common class of exotoxins where the B subunit mediates entry and the A subunit disrupts cellular functions (e.g., Cholera toxin).",
    difficulty: 'Hard'
  },
  {
    topic: "Autoimmune Disorders",
    concept: "Molecular Mimicry",
    characteristic: "Pathogen antigens resemble host antigens, triggering autoimmunity.",
    explanation: "Molecular mimicry occurs when the immune response to a pathogen cross-reacts with similar-looking host proteins (e.g., Rheumatic fever).",
    difficulty: 'Hard'
  },
  {
    topic: "Virology",
    concept: "HIV",
    characteristic: "Retrovirus that uses reverse transcriptase to replicate.",
    explanation: "HIV targets CD4+ T-cells and integrates its genetic material into the host genome, leading to chronic infection and eventually AIDS.",
    difficulty: 'Hard'
  },
  {
    topic: "Mycology",
    concept: "Cryptococcus neoformans",
    characteristic: "Encapsulated yeast identified by India Ink staining.",
    explanation: "The thick polysaccharide capsule of Cryptococcus neoformans is a major virulence factor that protects it from phagocytosis; it is often found in bird droppings.",
    difficulty: 'Hard'
  }
];

export const shuffleCards = (difficulty: Difficulty): CardData[] => {
  let pool = [];
  
  if (difficulty === 'Easy') {
    pool = MICRO_PATH_DATA.filter(d => d.difficulty === 'Easy');
  } else if (difficulty === 'Medium') {
    pool = MICRO_PATH_DATA.filter(d => d.difficulty === 'Easy' || d.difficulty === 'Medium');
  } else {
    pool = [...MICRO_PATH_DATA];
  }

  // Shuffle the pool first to get random selection
  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
  
  let selectedData = [];
  if (difficulty === 'Easy') {
    selectedData = shuffledPool.slice(0, 6);
  } else if (difficulty === 'Medium') {
    selectedData = shuffledPool.slice(0, 10);
  } else {
    selectedData = shuffledPool.slice(0, 15);
  }

  const cards: CardData[] = [];
  selectedData.forEach((item, index) => {
    cards.push({
      id: `concept-${index}`,
      content: item.concept,
      type: 'concept',
      pairId: index,
      topic: item.topic,
      explanation: item.explanation,
      difficulty: item.difficulty
    });
    cards.push({
      id: `char-${index}`,
      content: item.characteristic,
      type: 'characteristic',
      pairId: index,
      topic: item.topic,
      explanation: item.explanation,
      difficulty: item.difficulty
    });
  });

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

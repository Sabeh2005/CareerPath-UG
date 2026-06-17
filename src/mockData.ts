import type {
  Subject,
  ALevelCombination,
  CareerPath,
  Degree,
  SubjectGroupMapping,
  CombinationMapping,
} from './types';

export const OLEVEL_SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', category: 'STEM' },
  { id: 'bio', name: 'Biology', category: 'STEM' },
  { id: 'chem', name: 'Chemistry', category: 'STEM' },
  { id: 'phys', name: 'Physics', category: 'STEM' },
  { id: 'gen_sci', name: 'General Science', category: 'STEM' },
  { id: 'eng', name: 'English Language', category: 'Languages' },
  { id: 'hist', name: 'History and Political Education', category: 'Humanities' },
  { id: 'geo', name: 'Geography', category: 'Humanities' },
  { id: 'cre', name: 'Christian Religious Education', category: 'Humanities' },
  { id: 'ire', name: 'Islamic Religious Education', category: 'Humanities' },
  { id: 'kisw', name: 'Kiswahili', category: 'Languages' },
  { id: 'lit', name: 'Literature in English', category: 'Languages' },
  { id: 'loc_lang', name: 'Local Languages', category: 'Languages' },
  { id: 'for_lang', name: 'Foreign Languages', category: 'Languages' },
  { id: 'agri', name: 'Agriculture', category: 'Vocational' },
  { id: 'ent', name: 'Entrepreneurship Education', category: 'Business' },
  { id: 'ict', name: 'Information and Communication Technology', category: 'STEM' },
  { id: 'nutrition', name: 'Nutrition and Food Technology', category: 'Vocational' },
  { id: 'tech_design', name: 'Technology and Design', category: 'STEM' },
  { id: 'perf_arts', name: 'Performing Arts', category: 'Creative' },
  { id: 'fine_art', name: 'Fine Art', category: 'Creative' },
];

export const ALEVEL_COMBINATIONS: ALevelCombination[] = [
  { code: 'PCM', subjects: ['Physics', 'Chemistry', 'Mathematics'], fullName: 'Physics, Chemistry, Mathematics', category: 'Sciences' },
  { code: 'BCM', subjects: ['Biology', 'Chemistry', 'Mathematics'], fullName: 'Biology, Chemistry, Mathematics', category: 'Sciences' },
  { code: 'PEM', subjects: ['Physics', 'Economics', 'Mathematics'], fullName: 'Physics, Economics, Mathematics', category: 'Mixed' },
  { code: 'PAM', subjects: ['Physics', 'Agriculture', 'Mathematics'], fullName: 'Physics, Agriculture, Mathematics', category: 'Mixed' },
  { code: 'PCB', subjects: ['Physics', 'Chemistry', 'Biology'], fullName: 'Physics, Chemistry, Biology', category: 'Sciences' },
  { code: 'BCG', subjects: ['Biology', 'Chemistry', 'Geography'], fullName: 'Biology, Chemistry, Geography', category: 'Sciences' },
  { code: 'BCA', subjects: ['Biology', 'Chemistry', 'Agriculture'], fullName: 'Biology, Chemistry, Agriculture', category: 'Sciences' },
  { code: 'PCA', subjects: ['Physics', 'Chemistry', 'Agriculture'], fullName: 'Physics, Chemistry, Agriculture', category: 'Sciences' },
  { code: 'BAG', subjects: ['Biology', 'Agriculture', 'Geography'], fullName: 'Biology, Agriculture, Geography', category: 'Mixed' },
  { code: 'PMT', subjects: ['Physics', 'Mathematics', 'Technology & Design'], fullName: 'Physics, Mathematics, Technology & Design', category: 'Sciences' },
  { code: 'CMT', subjects: ['Chemistry', 'Mathematics', 'Technology & Design'], fullName: 'Chemistry, Mathematics, Technology & Design', category: 'Sciences' },
  { code: 'PCO', subjects: ['Physics', 'Chemistry', 'Computer Science'], fullName: 'Physics, Chemistry, Computer Science', category: 'Sciences' },
  { code: 'MCO', subjects: ['Mathematics', 'Chemistry', 'Computer Science'], fullName: 'Mathematics, Chemistry, Computer Science', category: 'Sciences' },
  { code: 'BCO', subjects: ['Biology', 'Chemistry', 'Computer Science'], fullName: 'Biology, Chemistry, Computer Science', category: 'Sciences' },
  { code: 'MEG', subjects: ['Mathematics', 'Economics', 'Geography'], fullName: 'Mathematics, Economics, Geography', category: 'Business' },
  { code: 'MEA', subjects: ['Mathematics', 'Economics', 'Art'], fullName: 'Mathematics, Economics, Art', category: 'Business' },
  { code: 'SEC', subjects: ['Subsidiary Mathematics', 'Economics', 'Chemistry'], fullName: 'Subsidiary Mathematics, Economics, Chemistry', category: 'Mixed' },
  { code: 'HEG', subjects: ['History', 'Economics', 'Geography'], fullName: 'History, Economics, Geography', category: 'Arts' },
  { code: 'DEG', subjects: ['Divinity', 'Economics', 'Geography'], fullName: 'Divinity, Economics, Geography', category: 'Arts' },
  { code: 'LEG', subjects: ['Literature', 'Economics', 'Geography'], fullName: 'Literature, Economics, Geography', category: 'Arts' },
  { code: 'FEG', subjects: ['French', 'Economics', 'Geography'], fullName: 'French, Economics, Geography', category: 'Languages' },
  { code: 'EEA', subjects: ['Economics', 'Entrepreneurship', 'Art'], fullName: 'Economics, Entrepreneurship, Art', category: 'Business' },
  { code: 'MEE', subjects: ['Mathematics', 'Economics', 'Entrepreneurship'], fullName: 'Mathematics, Economics, Entrepreneurship', category: 'Business' },
  { code: 'HEL', subjects: ['History', 'Economics', 'Literature'], fullName: 'History, Economics, Literature', category: 'Arts' },
  { code: 'HEA', subjects: ['History', 'Economics', 'Art'], fullName: 'History, Economics, Art', category: 'Arts' },
  { code: 'HED', subjects: ['History', 'Economics', 'Divinity'], fullName: 'History, Economics, Divinity', category: 'Arts' },
  { code: 'HEI', subjects: ['History', 'Economics', 'Islamic Religious Education'], fullName: 'History, Economics, IRE', category: 'Arts' },
  { code: 'HGL', subjects: ['History', 'Geography', 'Literature'], fullName: 'History, Geography, Literature', category: 'Arts' },
  { code: 'HGD', subjects: ['History', 'Geography', 'Divinity'], fullName: 'History, Geography, Divinity', category: 'Arts' },
  { code: 'HGI', subjects: ['History', 'Geography', 'Islamic Religious Education'], fullName: 'History, Geography, IRE', category: 'Arts' },
  { code: 'HGA', subjects: ['History', 'Geography', 'Art'], fullName: 'History, Geography, Art', category: 'Arts' },
  { code: 'HLD', subjects: ['History', 'Literature', 'Divinity'], fullName: 'History, Literature, Divinity', category: 'Arts' },
  { code: 'HLI', subjects: ['History', 'Literature', 'Islamic Religious Education'], fullName: 'History, Literature, IRE', category: 'Arts' },
  { code: 'HLA', subjects: ['History', 'Literature', 'Art'], fullName: 'History, Literature, Art', category: 'Arts' },
  { code: 'DGA', subjects: ['Divinity', 'Geography', 'Art'], fullName: 'Divinity, Geography, Art', category: 'Arts' },
  { code: 'IGA', subjects: ['Islamic Religious Education', 'Geography', 'Art'], fullName: 'IRE, Geography, Art', category: 'Arts' },
  { code: 'DLA', subjects: ['Divinity', 'Literature', 'Art'], fullName: 'Divinity, Literature, Art', category: 'Arts' },
  { code: 'ILA', subjects: ['Islamic Religious Education', 'Literature', 'Art'], fullName: 'IRE, Literature, Art', category: 'Arts' },
  { code: 'HLL', subjects: ['History', 'Literature', 'Luganda'], fullName: 'History, Literature, Luganda', category: 'Languages' },
  { code: 'GLL', subjects: ['Geography', 'Literature', 'Luganda'], fullName: 'Geography, Literature, Luganda', category: 'Languages' },
  { code: 'DLL', subjects: ['Divinity', 'Literature', 'Luganda'], fullName: 'Divinity, Literature, Luganda', category: 'Languages' },
  { code: 'ILL', subjects: ['Islamic Religious Education', 'Literature', 'Luganda'], fullName: 'IRE, Literature, Luganda', category: 'Languages' },
  { code: 'HFL', subjects: ['History', 'French', 'Literature'], fullName: 'History, French, Literature', category: 'Languages' },
  { code: 'GFL', subjects: ['Geography', 'French', 'Literature'], fullName: 'Geography, French, Literature', category: 'Languages' },
  { code: 'DFL', subjects: ['Divinity', 'French', 'Literature'], fullName: 'Divinity, French, Literature', category: 'Languages' },
  { code: 'IFL', subjects: ['Islamic Religious Education', 'French', 'Literature'], fullName: 'IRE, French, Literature', category: 'Languages' },
  { code: 'HGM', subjects: ['History', 'Geography', 'Mathematics'], fullName: 'History, Geography, Mathematics', category: 'Mixed' },
  { code: 'DLM', subjects: ['Divinity', 'Literature', 'Mathematics'], fullName: 'Divinity, Literature, Mathematics', category: 'Mixed' },
  { code: 'ILM', subjects: ['Islamic Religious Education', 'Literature', 'Mathematics'], fullName: 'IRE, Literature, Mathematics', category: 'Mixed' },
];

function career(title: string, description: string, salary: string, growth: string, icon: string): CareerPath {
  return { title, description, avgSalary: salary, growthPotential: growth, icon };
}

function degree(name: string, university: string, description: string): Degree {
  return { name, university, duration: '4 years', description };
}

export const SUBJECT_GROUP_MAPPINGS: SubjectGroupMapping[] = [
  {
    subjects: ['math', 'phys', 'ict'],
    careers: [
      career('Cloud Solutions Architect', 'Design and manage cloud infrastructure for organizations migrating to AWS, Azure, or Google Cloud.', '$120K-$180K', 'High (22% growth)', 'cloud'),
      career('AI/Machine Learning Engineer', 'Build intelligent systems that learn from data and make autonomous decisions.', '$110K-$170K', 'Very High (40% growth)', 'brain'),
      career('Cybersecurity Analyst', 'Protect organization networks and data from cyber threats and breaches.', '$90K-$140K', 'High (31% growth)', 'shield'),
      career('Data Scientist', 'Analyze large datasets to uncover insights that drive business strategy.', '$95K-$160K', 'Very High (36% growth)', 'chart'),
      career('Robotics Engineer', 'Design and build robotic systems for manufacturing, healthcare, and service industries.', '$85K-$130K', 'High (25% growth)', 'robot'),
    ],
    suggestedALevel: 'PCM',
  },
  {
    subjects: ['bio', 'chem', 'agri'],
    careers: [
      career('Bio-informatics Scientist', 'Use computational tools to analyze biological data for drug discovery and genomics.', '$85K-$130K', 'High (28% growth)', 'dna'),
      career('Precision Agriculture Technologist', 'Use drones, sensors, and AI to optimize crop yields and reduce resource usage.', '$70K-$110K', 'High (26% growth)', 'drone'),
      career('Agritech Founder', 'Build technology startups that solve agricultural challenges in emerging markets.', '$100K-$250K+', 'Very High', 'rocket'),
      career('Pharmacogenomics Specialist', 'Develop personalized medicine based on genetic profiles of patients.', '$90K-$140K', 'High (30% growth)', 'pill'),
      career('Environmental Biotechnologist', 'Use biological systems to solve environmental problems like waste treatment and pollution.', '$65K-$100K', 'Moderate (15% growth)', 'leaf'),
    ],
    suggestedALevel: 'BCM',
  },
  {
    subjects: ['ent', 'math', 'ict'],
    careers: [
      career('FinTech Product Manager', 'Lead development of digital financial products like mobile money and payment apps.', '$100K-$160K', 'High (32% growth)', 'wallet'),
      career('Quantitative Analyst', 'Build mathematical models to inform trading and investment decisions at hedge funds.', '$120K-$200K', 'High (25% growth)', 'calc'),
      career('Blockchain Strategist', 'Design blockchain-based solutions for supply chain, finance, and identity verification.', '$110K-$180K', 'Very High (40% growth)', 'chain'),
      career('Venture Capital Analyst', 'Evaluate and invest in high-growth technology startups across Africa.', '$80K-$150K', 'Moderate (15% growth)', 'cash'),
      career('Digital Payments Specialist', 'Design and implement mobile money and digital payment ecosystems.', '$70K-$120K', 'High (28% growth)', 'phone'),
    ],
    suggestedALevel: 'MEE',
  },
  {
    subjects: ['hist', 'geo', 'cre', 'ire'],
    careers: [
      career('ESG Consultant', 'Help organizations measure and improve environmental, social, and governance impact.', '$80K-$130K', 'Very High (35% growth)', 'globe'),
      career('Geo-Spatial Data Analyst', 'Use GIS technology to analyze geographic data for urban planning and environmental management.', '$70K-$110K', 'High (30% growth)', 'map'),
      career('Public Policy Director', 'Shape government and organizational policy using data-driven research and stakeholder engagement.', '$90K-$150K', 'Moderate (12% growth)', 'building'),
      career('Urban Tech Planner', 'Design smart city solutions integrating IoT, data analytics, and sustainable infrastructure.', '$85K-$140K', 'High (28% growth)', 'city'),
      career('Sustainability Manager', 'Lead corporate sustainability initiatives and net-zero transition strategies.', '$75K-$120K', 'Very High (35% growth)', 'recycle'),
    ],
    suggestedALevel: 'HEG',
  },
  {
    subjects: ['fine_art', 'lit', 'ict'],
    careers: [
      career('UI/UX Product Designer', 'Design intuitive user interfaces and seamless experiences for digital products.', '$90K-$150K', 'Very High (35% growth)', 'palette'),
      career('AR/VR Environment Creator', 'Build immersive virtual and augmented reality experiences for gaming, education, and training.', '$85K-$140K', 'Very High (40% growth)', 'vr'),
      career('Technical Writer', 'Create clear documentation and guides for complex technical products and APIs.', '$65K-$100K', 'Moderate (20% growth)', 'write'),
      career('Digital Marketing Director', 'Lead data-driven marketing campaigns across social media, SEO, and content platforms.', '$100K-$170K', 'High (28% growth)', 'megaphone'),
      career('UX Copywriter', 'Craft compelling microcopy and content that guides users through digital experiences.', '$70K-$110K', 'High (25% growth)', 'message'),
    ],
    suggestedALevel: 'MEA',
  },
  {
    subjects: ['eng', 'lit', 'kisw', 'loc_lang', 'for_lang'],
    careers: [
      career('Localization Engineer', 'Adapt software and content for different languages and cultural markets.', '$75K-$120K', 'High (28% growth)', 'globe'),
      career('Language Data Scientist', 'Build NLP models and language datasets for AI translation and voice assistants.', '$90K-$140K', 'Very High (35% growth)', 'ai'),
      career('Diplomatic Tech Policy Advisor', 'Bridge technology policy between governments, international organizations, and tech companies.', '$80K-$130K', 'Moderate (18% growth)', 'handshake'),
      career('Digital Content Strategist', 'Plan and execute multilingual content strategies for global brands.', '$70K-$115K', 'High (25% growth)', 'layers'),
      career('Computational Linguist', 'Develop algorithms that process and understand human language for AI systems.', '$100K-$160K', 'Very High (35% growth)', 'code'),
    ],
    suggestedALevel: 'HEL',
  },
  {
    subjects: ['perf_arts', 'fine_art', 'ict'],
    careers: [
      career('Motion Graphics Designer', 'Create animated visual content for film, advertising, and digital media.', '$65K-$110K', 'High (25% growth)', 'film'),
      career('Creative Technologist', 'Build interactive installations and experiences blending art with emerging technology.', '$80K-$130K', 'High (28% growth)', 'light'),
      career('Game Designer', 'Design gameplay mechanics, narratives, and worlds for video games.', '$75K-$130K', 'High (30% growth)', 'gamepad'),
      career('Brand Identity Strategist', 'Develop visual brand systems and identity guidelines for organizations.', '$70K-$120K', 'Moderate (20% growth)', 'droplet'),
      career('Product Photographer / 3D Artist', 'Create photorealistic 3D product renders for e-commerce and advertising.', '$55K-$95K', 'Moderate (18% growth)', 'camera'),
    ],
    suggestedALevel: 'HGA',
  },
  {
    subjects: ['tech_design', 'phys', 'math'],
    careers: [
      career('Hardware Design Engineer', 'Design and test electronic components and systems for consumer devices.', '$90K-$140K', 'Moderate (15% growth)', 'chip'),
      career('CAD/BIM Specialist', 'Create detailed 3D building models using BIM software for construction and architecture.', '$65K-$105K', 'High (25% growth)', 'blueprint'),
      career('IoT Solutions Architect', 'Design end-to-end Internet of Things systems for smart homes, factories, and cities.', '$100K-$160K', 'Very High (35% growth)', 'wifi'),
      career('Product Design Engineer', 'Develop physical products from concept to manufacturing using CAD and prototyping.', '$75K-$120K', 'Moderate (20% growth)', 'tool'),
      career('Drone Operations Specialist', 'Design and operate drone systems for surveying, delivery, and inspection.', '$60K-$100K', 'High (30% growth)', 'drone'),
    ],
    suggestedALevel: 'PMT',
  },
  {
    subjects: ['nutrition', 'bio', 'chem'],
    careers: [
      career('Food Technology Innovator', 'Develop plant-based proteins, lab-grown meat, and novel food products.', '$70K-$120K', 'Very High (35% growth)', 'flask'),
      career('Nutrigenomics Consultant', 'Provide personalized nutrition advice based on genetic testing and analysis.', '$65K-$100K', 'High (28% growth)', 'dna'),
      career('Quality Assurance Technologist', 'Ensure food safety and quality using modern testing and traceability systems.', '$55K-$85K', 'Moderate (15% growth)', 'check'),
      career('Food Supply Chain Analyst', 'Optimize food distribution networks using data analytics and blockchain tracking.', '$70K-$110K', 'High (25% growth)', 'truck'),
      career('Clinical Dietitian (Digital Health)', 'Provide remote nutritional counseling through telehealth platforms.', '$60K-$90K', 'High (27% growth)', 'heart'),
    ],
    suggestedALevel: 'BCM',
  },
  {
    subjects: ['gen_sci', 'geo', 'agri'],
    careers: [
      career('Climate Data Analyst', 'Model and analyze climate patterns to inform adaptation and mitigation strategies.', '$75K-$120K', 'Very High (35% growth)', 'thermometer'),
      career('Remote Sensing Specialist', 'Analyze satellite imagery for agriculture, forestry, and urban planning.', '$80K-$125K', 'High (30% growth)', 'satellite'),
      career('Conservation Technology Manager', 'Deploy tech solutions like camera traps and acoustic sensors for wildlife protection.', '$65K-$100K', 'Moderate (22% growth)', 'tree'),
      career('Water Resource Engineer', 'Design smart water management systems using IoT and predictive analytics.', '$75K-$115K', 'High (25% growth)', 'water'),
      career('Renewable Energy Project Developer', 'Lead solar, wind, and hydroelectric energy projects in rural and urban areas.', '$80K-$140K', 'Very High (40% growth)', 'sun'),
    ],
    suggestedALevel: 'BCG',
  },
];

export const COMBINATION_MAPPINGS: CombinationMapping[] = [
  {
    code: 'PCM',
    degrees: [
      degree('BSc. Software Engineering', 'Makerere University', 'Comprehensive software development, algorithms, and system design.'),
      degree('BSc. Computer Science', 'Kyambogo University', 'Theoretical foundations of computing and practical programming skills.'),
      degree('BSc. Electrical Engineering', 'Makerere University', 'Power systems, electronics, and telecommunications engineering.'),
    ],
    careers: [
      career('Cloud Solutions Architect', 'Design cloud infrastructure on AWS/Azure/Google Cloud.', '$120K-$180K', 'High', 'cloud'),
      career('AI/ML Engineer', 'Build intelligent systems and neural networks.', '$110K-$170K', 'Very High', 'brain'),
      career('Data Scientist', 'Extract insights from complex datasets.', '$95K-$160K', 'Very High', 'chart'),
      career('Cybersecurity Analyst', 'Protect enterprise networks from cyber threats.', '$90K-$140K', 'High', 'shield'),
      career('Robotics Software Engineer', 'Program autonomous robotic systems.', '$100K-$150K', 'High', 'robot'),
    ],
  },
  {
    code: 'BCM',
    degrees: [
      degree('BSc. Biomedical Engineering', 'Makerere University', 'Apply engineering principles to medicine and healthcare.'),
      degree('BSc. Biotechnology', 'Kyambogo University', 'Use biological systems to develop products and technologies.'),
      degree('BSc. Medicine and Surgery', 'Makerere University', 'Comprehensive medical training and clinical practice.'),
    ],
    careers: [
      career('Bio-informatics Scientist', 'Analyze genomic data for drug discovery.', '$85K-$130K', 'High', 'dna'),
      career('Pharmacogenomics Specialist', 'Personalize medicine based on genetics.', '$90K-$140K', 'High', 'pill'),
      career('Precision Medicine Data Analyst', 'Analyze patient data for tailored treatments.', '$80K-$130K', 'Very High', 'heart'),
      career('Neural Interface Engineer', 'Develop brain-computer interface technologies.', '$110K-$170K', 'Very High', 'brain'),
      career('Clinical Data Manager', 'Oversee clinical trial data using advanced analytics.', '$70K-$110K', 'Moderate', 'clipboard'),
    ],
  },
  {
    code: 'PEM',
    degrees: [
      degree('BSc. Quantitative Economics', 'Makerere University', 'Mathematical and statistical modeling for economic analysis.'),
      degree('BSc. Actuarial Science', 'Kyambogo University', 'Risk assessment and mathematical modeling for insurance and finance.'),
      degree('BSc. Engineering Physics', 'Makerere University', 'Physics principles applied to engineering and technology.'),
    ],
    careers: [
      career('Quantitative Analyst', 'Build financial models for investment decisions.', '$120K-$200K', 'High', 'calc'),
      career('Energy Market Analyst', 'Model and predict energy commodity markets.', '$85K-$135K', 'High', 'bolt'),
      career('FinTech Product Manager', 'Lead digital financial product development.', '$100K-$160K', 'High', 'wallet'),
      career('Risk Modeling Specialist', 'Develop models to assess financial and operational risk.', '$90K-$145K', 'High', 'chart'),
      career('Data Engineer', 'Build data pipelines and infrastructure for analytics.', '$95K-$150K', 'Very High', 'database'),
    ],
  },
  {
    code: 'PCB',
    degrees: [
      degree('BSc. Medicine and Surgery', 'Makerere University', 'Comprehensive medical training and clinical practice.'),
      degree('BSc. Pharmacy', 'Kyambogo University', 'Drug development, pharmacology, and patient care.'),
      degree('BSc. Biomedical Sciences', 'Makerere University', 'Foundational biomedical research and laboratory sciences.'),
    ],
    careers: [
      career('Medical Technology Innovator', 'Develop medical devices and diagnostic tools.', '$90K-$150K', 'High', 'plus'),
      career('Radiology AI Specialist', 'Apply AI to medical imaging diagnostics.', '$110K-$170K', 'Very High', 'scan'),
      career('Telemedicine Platform Architect', 'Build digital health platforms for remote care.', '$100K-$160K', 'Very High', 'video'),
      career('Clinical Data Scientist', 'Analyze clinical trial and patient data.', '$85K-$135K', 'High', 'chart'),
      career('Digital Health Product Manager', 'Lead health tech product development.', '$95K-$155K', 'High', 'phone'),
    ],
  },
  {
    code: 'MEG',
    degrees: [
      degree('BSc. Quantitative Economics', 'Makerere University', 'Mathematical and statistical economics.'),
      degree('BSc. Land Economics', 'Kyambogo University', 'Real estate, valuation, and property management.'),
      degree('BSc. Urban Planning', 'Makerere University', 'City and regional planning with GIS integration.'),
    ],
    careers: [
      career('Geo-Spatial Data Analyst', 'Analyze geographic data for urban planning.', '$70K-$110K', 'High', 'map'),
      career('Urban Tech Planner', 'Design smart city solutions and infrastructure.', '$85K-$140K', 'High', 'city'),
      career('Real Estate Technology Strategist', 'Build proptech solutions for property markets.', '$80K-$130K', 'High', 'building'),
      career('Transportation Data Analyst', 'Optimize transit systems using data analytics.', '$70K-$110K', 'Moderate', 'truck'),
      career('Environmental Economist', 'Model economic impacts of environmental policies.', '$75K-$120K', 'Moderate', 'leaf'),
    ],
  },
  {
    code: 'MEA',
    degrees: [
      degree('BA. Industrial and Fine Art', 'Makerere University', 'Applied art, design thinking, and digital media.'),
      degree('BSc. Information Technology', 'Kyambogo University', 'Software development, web technologies, and IT management.'),
      degree('BA. Economics', 'Makerere University', 'Micro and macroeconomic theory with quantitative methods.'),
    ],
    careers: [
      career('UI/UX Product Designer', 'Design intuitive digital product interfaces.', '$90K-$150K', 'Very High', 'palette'),
      career('Creative Technologist', 'Blend art and technology for interactive experiences.', '$80K-$130K', 'High', 'light'),
      career('Digital Marketing Director', 'Lead data-driven marketing campaigns.', '$100K-$170K', 'High', 'megaphone'),
      career('Product Design Lead', 'Oversee design strategy for digital products.', '$95K-$155K', 'High', 'tool'),
      career('AR/VR Content Creator', 'Build immersive experiences for education and entertainment.', '$85K-$140K', 'Very High', 'vr'),
    ],
  },
  {
    code: 'HEG',
    degrees: [
      degree('BA. Social Sciences', 'Makerere University', 'Sociology, political science, and public administration.'),
      degree('BA. Development Studies', 'Kyambogo University', 'Community development, NGOs, and policy analysis.'),
      degree('BA. Economics', 'Makerere University', 'Economic theory, policy, and quantitative analysis.'),
    ],
    careers: [
      career('ESG Consultant', 'Guide organizations on sustainability and governance.', '$80K-$130K', 'Very High', 'globe'),
      career('Public Policy Director', 'Shape policy using data and stakeholder engagement.', '$90K-$150K', 'Moderate', 'building'),
      career('Market Research Director', 'Lead research on consumer and market trends.', '$85K-$140K', 'Moderate', 'search'),
      career('International Development Analyst', 'Analyze and design development programs.', '$70K-$115K', 'Moderate', 'handshake'),
      career('Sustainability Manager', 'Lead corporate net-zero transition strategies.', '$75K-$120K', 'Very High', 'recycle'),
    ],
  },
  {
    code: 'HEL',
    degrees: [
      degree('BA. Journalism and Communication', 'Makerere University', 'Digital media, journalism, and strategic communication.'),
      degree('BA. Literature', 'Kyambogo University', 'English literature, creative writing, and literary analysis.'),
      degree('BA. Law', 'Makerere University', 'Legal studies, advocacy, and jurisprudence.'),
    ],
    careers: [
      career('Technical Writer', 'Create documentation for complex technical products.', '$65K-$100K', 'Moderate', 'write'),
      career('Digital Content Strategist', 'Plan content strategies for global brands.', '$70K-$115K', 'High', 'layers'),
      career('UX Copywriter', 'Write compelling microcopy for digital experiences.', '$70K-$110K', 'High', 'message'),
      career('Legal Technology Consultant', 'Apply tech solutions to legal document management.', '$80K-$130K', 'High', 'gavel'),
      career('Podcast Producer / Digital Storyteller', 'Create narrative content for digital audio platforms.', '$55K-$90K', 'High', 'mic'),
    ],
  },
  {
    code: 'BCG',
    degrees: [
      degree('BSc. Environmental Science', 'Makerere University', 'Environmental monitoring, conservation, and sustainability.'),
      degree('BSc. Geography', 'Kyambogo University', 'Physical and human geography with GIS specialization.'),
      degree('BSc. Forestry', 'Makerere University', 'Forest management, conservation, and agroforestry.'),
    ],
    careers: [
      career('Climate Data Analyst', 'Model climate patterns and environmental change.', '$75K-$120K', 'Very High', 'thermometer'),
      career('Remote Sensing Specialist', 'Analyze satellite data for environmental monitoring.', '$80K-$125K', 'High', 'satellite'),
      career('Conservation Technology Manager', 'Deploy tech for wildlife and habitat protection.', '$65K-$100K', 'Moderate', 'tree'),
      career('Agritech Solutions Architect', 'Design technology solutions for sustainable farming.', '$85K-$135K', 'High', 'drone'),
      career('Environmental Data Scientist', 'Apply machine learning to environmental datasets.', '$90K-$145K', 'High', 'chart'),
    ],
  },
  {
    code: 'MEE',
    degrees: [
      degree('BSc. Business Statistics', 'Makerere University', 'Statistical methods for business decision-making.'),
      degree('BSc. Entrepreneurship', 'Kyambogo University', 'Business creation, innovation, and venture management.'),
      degree('BBA. Finance', 'Makerere University', 'Financial management, investment analysis, and banking.'),
    ],
    careers: [
      career('FinTech Product Manager', 'Lead digital financial product innovation.', '$100K-$160K', 'High', 'wallet'),
      career('Venture Capital Analyst', 'Evaluate and invest in high-growth startups.', '$80K-$150K', 'Moderate', 'cash'),
      career('Blockchain Strategist', 'Design blockchain solutions for business problems.', '$110K-$180K', 'Very High', 'chain'),
      career('Digital Payments Architect', 'Design mobile money and payment ecosystems.', '$90K-$145K', 'High', 'phone'),
      career('Business Intelligence Director', 'Lead data-driven business strategy and analytics.', '$110K-$170K', 'High', 'chart'),
    ],
  },
  {
    code: 'HGA',
    degrees: [
      degree('BA. Industrial and Fine Art', 'Makerere University', 'Applied arts, design, and digital media.'),
      degree('BA. Tourism Management', 'Kyambogo University', 'Tourism planning, hospitality, and eco-tourism.'),
      degree('BA. Geography and Social Studies', 'Makerere University', 'Human geography, social studies, and community engagement.'),
    ],
    careers: [
      career('Creative Technologist', 'Build interactive art-tech installations.', '$80K-$130K', 'High', 'light'),
      career('Cultural Heritage Digital Manager', 'Digitize and preserve cultural heritage using technology.', '$60K-$95K', 'Moderate', 'museum'),
      career('Eco-Tourism Platform Founder', 'Build digital platforms for sustainable tourism.', '$70K-$120K', 'High', 'globe'),
      career('Urban Experience Designer', 'Design public spaces and urban experiences.', '$75K-$115K', 'High', 'city'),
      career('Museum Technology Specialist', 'Integrate AR/VR into museum exhibits.', '$65K-$105K', 'Moderate', 'vr'),
    ],
  },
  {
    code: 'PMT',
    degrees: [
      degree('BSc. Mechanical Engineering', 'Makerere University', 'Machine design, manufacturing, and energy systems.'),
      degree('BSc. Civil Engineering', 'Kyambogo University', 'Infrastructure, structural, and construction engineering.'),
      degree('BSc. Industrial Design', 'Makerere University', 'Product design, ergonomics, and manufacturing processes.'),
    ],
    careers: [
      career('Product Design Engineer', 'Develop physical products from concept to production.', '$75K-$120K', 'Moderate', 'tool'),
      career('CAD/BIM Specialist', 'Create 3D building and product models.', '$65K-$105K', 'High', 'blueprint'),
      career('Hardware Design Engineer', 'Design electronic systems and components.', '$90K-$140K', 'Moderate', 'chip'),
      career('IoT Hardware Architect', 'Design connected device hardware and sensors.', '$100K-$155K', 'Very High', 'wifi'),
      career('Manufacturing Automation Engineer', 'Implement robotics and automation in manufacturing.', '$80K-$130K', 'High', 'robot'),
    ],
  },
  {
    code: 'HGL',
    degrees: [
      degree('BA. Journalism and Communication', 'Makerere University', 'Media, communication, and digital journalism.'),
      degree('BA. Literature', 'Kyambogo University', 'English literature, criticism, and writing.'),
      degree('BA. Library and Information Science', 'Makerere University', 'Information management, archives, and digital libraries.'),
    ],
    careers: [
      career('Digital Archivist', 'Manage and digitize historical records and archives.', '$55K-$90K', 'Moderate', 'folder'),
      career('Content Strategy Director', 'Lead content strategy for media organizations.', '$90K-$145K', 'High', 'layers'),
      career('UX Writer', 'Write user-centered content for digital products.', '$70K-$110K', 'High', 'message'),
      career('Editorial Technologist', 'Build tools for digital publishing and content management.', '$80K-$130K', 'High', 'code'),
      career('Knowledge Management Specialist', 'Design systems for organizational knowledge sharing.', '$75K-$115K', 'Moderate', 'database'),
    ],
  },
  // ── Science Combinations ──
  {
    code: 'BCA',
    degrees: [
      degree('BSc. Agriculture', 'Makerere University', 'Crop production, animal husbandry, and agricultural economics.'),
      degree('BSc. Biotechnology', 'Kyambogo University', 'Genetic engineering, microbiology, and bio-industrial applications.'),
      degree('BSc. Veterinary Medicine', 'Makerere University', 'Animal health, disease prevention, and livestock management.'),
    ],
    careers: [
      career('Agricultural Biotechnologist', 'Develop drought-resistant and high-yield crop varieties using biotech.', '$70K-$120K', 'High', 'dna'),
      career('Precision Agriculture Technologist', 'Use drones and sensors to optimize farm productivity.', '$65K-$105K', 'High', 'drone'),
      career('Veterinary Data Analyst', 'Apply analytics to livestock health monitoring and disease tracking.', '$60K-$95K', 'Moderate', 'chart'),
      career('Agri-Food Supply Chain Manager', 'Optimize farm-to-table logistics using technology.', '$75K-$125K', 'High', 'truck'),
      career('Soil Health Scientist', 'Analyze soil microbiomes to improve crop yields sustainably.', '$65K-$100K', 'Moderate', 'leaf'),
    ],
  },
  {
    code: 'PCA',
    degrees: [
      degree('BSc. Agricultural Engineering', 'Makerere University', 'Farm machinery, irrigation systems, and post-harvest technology.'),
      degree('BSc. Food Science and Technology', 'Kyambogo University', 'Food processing, safety, and product development.'),
      degree('BSc. Agricultural Chemistry', 'Makerere University', 'Agrochemicals, soil chemistry, and pesticide science.'),
    ],
    careers: [
      career('Agrochemical Research Scientist', 'Develop eco-friendly pesticides and fertilizers.', '$70K-$115K', 'Moderate', 'flask'),
      career('Farm Automation Engineer', 'Design automated irrigation and harvesting systems.', '$75K-$120K', 'High', 'robot'),
      career('Food Safety Technologist', 'Ensure food quality using advanced testing and traceability.', '$60K-$95K', 'Moderate', 'check'),
      career('Agricultural IoT Specialist', 'Deploy smart sensor networks for precision farming.', '$80K-$130K', 'High', 'wifi'),
      career('Post-Harvest Technology Consultant', 'Design storage and processing solutions to reduce food waste.', '$65K-$105K', 'High', 'tool'),
    ],
  },
  {
    code: 'CMT',
    degrees: [
      degree('BSc. Chemical Engineering', 'Makerere University', 'Process engineering, petrochemicals, and materials science.'),
      degree('BSc. Telecommunications Engineering', 'Kyambogo University', 'Network systems, signal processing, and communications.'),
      degree('BSc. Software Engineering', 'Makerere University', 'Software development, system architecture, and programming.'),
    ],
    careers: [
      career('Process Control Engineer', 'Optimize chemical manufacturing using automation and AI.', '$85K-$135K', 'Moderate', 'chip'),
      career('Materials Science Researcher', 'Develop advanced materials for electronics and construction.', '$75K-$120K', 'Moderate', 'flask'),
      career('DevOps Engineer', 'Manage cloud infrastructure and CI/CD pipelines.', '$95K-$150K', 'Very High', 'cloud'),
      career('Embedded Systems Developer', 'Program microcontrollers for industrial and consumer devices.', '$80K-$130K', 'High', 'chip'),
      career('Telecommunications Network Architect', 'Design 5G and fiber-optic communication systems.', '$90K-$145K', 'High', 'wifi'),
    ],
  },
  {
    code: 'PCO',
    degrees: [
      degree('BSc. Computer Science', 'Makerere University', 'Algorithms, software development, and computing theory.'),
      degree('BSc. Information Technology', 'Kyambogo University', 'Applied IT, network administration, and systems management.'),
      degree('BSc. Computer Engineering', 'Makerere University', 'Hardware-software integration and embedded systems.'),
    ],
    careers: [
      career('Full-Stack Software Engineer', 'Build end-to-end web and mobile applications.', '$90K-$150K', 'Very High', 'code'),
      career('Cloud Platform Engineer', 'Design scalable cloud-native infrastructure.', '$100K-$160K', 'High', 'cloud'),
      career('AI Research Scientist', 'Advance machine learning and neural network architectures.', '$110K-$175K', 'Very High', 'brain'),
      career('Penetration Testing Specialist', 'Identify and fix security vulnerabilities in systems.', '$85K-$140K', 'High', 'shield'),
      career('Quantum Computing Researcher', 'Explore quantum algorithms for complex problem solving.', '$95K-$155K', 'Very High', 'atom'),
    ],
  },
  {
    code: 'MCO',
    degrees: [
      degree('BSc. Data Science', 'Makerere University', 'Statistical modeling, machine learning, and big data analytics.'),
      degree('BSc. Information Systems', 'Kyambogo University', 'Business information systems and database management.'),
      degree('BSc. Applied Mathematics and Computer Science', 'Makerere University', 'Computational mathematics and algorithm design.'),
    ],
    careers: [
      career('Machine Learning Engineer', 'Build and deploy production ML models and pipelines.', '$100K-$165K', 'Very High', 'brain'),
      career('Data Platform Architect', 'Design enterprise data warehousing and lakehouse solutions.', '$110K-$170K', 'Very High', 'database'),
      career('Computational Chemist', 'Model molecular interactions using computational methods.', '$75K-$125K', 'Moderate', 'flask'),
      career('Algorithmic Trading Developer', 'Build automated trading systems for financial markets.', '$120K-$200K', 'High', 'calc'),
      career('NLP Engineer', 'Develop natural language processing systems for AI applications.', '$95K-$155K', 'Very High', 'ai'),
    ],
  },
  {
    code: 'BCO',
    degrees: [
      degree('BSc. Bioinformatics', 'Makerere University', 'Computational analysis of biological and genomic data.'),
      degree('BSc. Health Informatics', 'Kyambogo University', 'Digital health systems and medical data management.'),
      degree('BSc. Computational Biology', 'Makerere University', 'Mathematical modeling of biological systems.'),
    ],
    careers: [
      career('Bioinformatics Analyst', 'Analyze genomic data for drug discovery and personalized medicine.', '$80K-$135K', 'High', 'dna'),
      career('Health Data Scientist', 'Apply machine learning to patient outcomes and epidemiology.', '$90K-$145K', 'Very High', 'heart'),
      career('Pharmaceutical Data Analyst', 'Use data analytics to optimize drug development pipelines.', '$85K-$140K', 'High', 'pill'),
      career('Genomic Research Scientist', 'Sequence and interpret genomes for medical and agricultural research.', '$75K-$125K', 'High', 'dna'),
      career('Digital Epidemiologist', 'Track and model disease outbreaks using computational tools.', '$80K-$130K', 'Very High', 'globe'),
    ],
  },
  // ── Mixed Combinations ──
  {
    code: 'PAM',
    degrees: [
      degree('BSc. Agricultural Engineering', 'Makerere University', 'Farm machinery design, irrigation, and agro-processing.'),
      degree('BSc. Renewable Energy Engineering', 'Kyambogo University', 'Solar, wind, and biomass energy systems design.'),
      degree('BSc. Agribusiness Management', 'Makerere University', 'Agricultural business, marketing, and value chain management.'),
    ],
    careers: [
      career('Agricultural Drone Pilot', 'Operate and maintain UAVs for crop mapping and spraying.', '$60K-$100K', 'High', 'drone'),
      career('Solar Energy Systems Engineer', 'Design solar installations for rural and urban applications.', '$75K-$125K', 'Very High', 'sun'),
      career('Farm Mechanization Consultant', 'Advise on modern machinery adoption for large-scale farms.', '$65K-$105K', 'Moderate', 'tool'),
      career('AgriTech Startup Founder', 'Build technology ventures solving African agricultural challenges.', '$80K-$200K+', 'Very High', 'rocket'),
      career('Irrigation Systems Designer', 'Plan efficient water delivery systems for diverse crops.', '$60K-$95K', 'High', 'water'),
    ],
  },
  {
    code: 'BAG',
    degrees: [
      degree('BSc. Agriculture', 'Makerere University', 'Crop science, animal production, and soil management.'),
      degree('BSc. Environmental Management', 'Kyambogo University', 'Conservation, environmental planning, and natural resource management.'),
      degree('BSc. Wildlife and Range Management', 'Makerere University', 'Wildlife conservation, rangeland ecology, and eco-tourism.'),
    ],
    careers: [
      career('Conservation Agronomist', 'Develop sustainable farming practices that protect ecosystems.', '$60K-$100K', 'High', 'leaf'),
      career('Eco-Tourism Consultant', 'Design nature-based tourism experiences and conservation programs.', '$55K-$95K', 'Moderate', 'globe'),
      career('GIS Agricultural Analyst', 'Map and analyze farmland using geospatial technology.', '$65K-$105K', 'High', 'map'),
      career('Climate Adaptation Specialist', 'Help farming communities adapt to changing climate patterns.', '$70K-$115K', 'Very High', 'thermometer'),
      career('Natural Resource Economist', 'Value and manage natural assets for sustainable development.', '$65K-$110K', 'Moderate', 'tree'),
    ],
  },
  {
    code: 'SEC',
    degrees: [
      degree('BSc. Actuarial Science', 'Makerere University', 'Risk modeling, insurance mathematics, and financial analytics.'),
      degree('BSc. Business Statistics', 'Kyambogo University', 'Statistical methods applied to business decision-making.'),
      degree('BSc. Industrial Chemistry', 'Makerere University', 'Chemical processes in manufacturing and quality control.'),
    ],
    careers: [
      career('Actuarial Analyst', 'Model insurance and pension risks for financial institutions.', '$80K-$140K', 'High', 'calc'),
      career('Business Intelligence Analyst', 'Transform data into actionable business strategy.', '$75K-$125K', 'High', 'chart'),
      career('Pharmaceutical Sales Analyst', 'Analyze market data to drive pharmaceutical product strategy.', '$70K-$115K', 'Moderate', 'pill'),
      career('Insurance Data Modeler', 'Build predictive models for insurance pricing and claims.', '$85K-$140K', 'High', 'shield'),
      career('Quality Control Chemist', 'Ensure product quality in manufacturing using analytical chemistry.', '$60K-$95K', 'Moderate', 'flask'),
    ],
  },
  {
    code: 'HGM',
    degrees: [
      degree('BA. Economics', 'Makerere University', 'Economic theory with quantitative and statistical methods.'),
      degree('BSc. Geography', 'Kyambogo University', 'Physical and human geography with GIS and spatial analysis.'),
      degree('BA. Demography and Statistics', 'Makerere University', 'Population studies and statistical analysis.'),
    ],
    careers: [
      career('Economic History Researcher', 'Study historical economic patterns to inform modern policy.', '$60K-$100K', 'Moderate', 'search'),
      career('GIS Data Analyst', 'Map and analyze spatial data for planning and development.', '$70K-$110K', 'High', 'map'),
      career('Public Policy Statistician', 'Use statistical methods to evaluate government programs.', '$75K-$120K', 'Moderate', 'building'),
      career('Heritage Tourism Developer', 'Create data-driven cultural and heritage tourism products.', '$55K-$90K', 'Moderate', 'museum'),
      career('Urban Development Analyst', 'Analyze urban growth patterns for city planning.', '$70K-$115K', 'High', 'city'),
    ],
  },
  {
    code: 'DLM',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'Literary analysis, creative writing, and critical theory.'),
      degree('BA. Theology', 'Kyambogo University', 'Biblical studies, ethics, and pastoral theology.'),
      degree('BSc. Statistics', 'Makerere University', 'Mathematical statistics and data analysis.'),
    ],
    careers: [
      career('Digital Publishing Analyst', 'Analyze reader data to optimize digital content distribution.', '$60K-$100K', 'High', 'layers'),
      career('Faith-Based Tech Entrepreneur', 'Build technology solutions for religious communities.', '$70K-$130K', 'High', 'rocket'),
      career('Content Data Scientist', 'Apply analytics to content strategy and audience engagement.', '$80K-$130K', 'Very High', 'chart'),
      career('Religious Education Curriculum Developer', 'Design modern faith education using digital tools.', '$55K-$90K', 'Moderate', 'write'),
      career('Ethics and AI Policy Advisor', 'Guide organizations on ethical AI development and deployment.', '$85K-$140K', 'Very High', 'shield'),
    ],
  },
  {
    code: 'ILM',
    degrees: [
      degree('BA. Islamic Studies', 'Makerere University', 'Islamic theology, jurisprudence, and civilization.'),
      degree('BA. Literature', 'Kyambogo University', 'Literary criticism, comparative literature, and writing.'),
      degree('BSc. Statistics', 'Makerere University', 'Applied statistics and quantitative research methods.'),
    ],
    careers: [
      career('Islamic Finance Analyst', 'Structure Sharia-compliant financial products and investments.', '$75K-$130K', 'High', 'calc'),
      career('Cross-Cultural Data Analyst', 'Analyze cultural data for international organizations.', '$70K-$115K', 'High', 'globe'),
      career('Faith-Based Policy Researcher', 'Research the intersection of religion and public policy.', '$60K-$100K', 'Moderate', 'search'),
      career('Digital Islamic Education Developer', 'Create online Islamic education platforms and content.', '$55K-$95K', 'High', 'code'),
      career('Multilingual Content Analyst', 'Analyze and optimize multilingual content using data.', '$65K-$105K', 'High', 'ai'),
    ],
  },
  // ── Business Combinations ──
  {
    code: 'EEA',
    degrees: [
      degree('BBA. Entrepreneurship and Innovation', 'Makerere University', 'Venture creation, business modeling, and innovation management.'),
      degree('BA. Industrial and Fine Art', 'Kyambogo University', 'Applied art, design thinking, and visual communication.'),
      degree('BBA. Marketing', 'Makerere University', 'Consumer behavior, digital marketing, and brand management.'),
    ],
    careers: [
      career('Startup Ecosystem Builder', 'Create and nurture startup communities and incubators.', '$80K-$150K', 'Very High', 'rocket'),
      career('Brand Strategy Director', 'Lead brand positioning and creative strategy for companies.', '$90K-$155K', 'High', 'palette'),
      career('Social Impact Entrepreneur', 'Build businesses that solve social and environmental problems.', '$70K-$140K', 'Very High', 'globe'),
      career('Growth Marketing Lead', 'Drive user acquisition through data-driven marketing experiments.', '$85K-$140K', 'High', 'megaphone'),
      career('Product Innovation Manager', 'Lead new product development from ideation to launch.', '$90K-$150K', 'High', 'light'),
    ],
  },
  // ── Arts Combinations ──
  {
    code: 'DEG',
    degrees: [
      degree('BA. Development Studies', 'Makerere University', 'Community development, NGO management, and policy analysis.'),
      degree('BA. Social Sciences', 'Kyambogo University', 'Sociology, public administration, and community engagement.'),
      degree('BA. Theology and Development', 'Makerere University', 'Faith-based development and ethical leadership.'),
    ],
    careers: [
      career('Community Development Director', 'Lead grassroots development programs and initiatives.', '$65K-$110K', 'Moderate', 'building'),
      career('Ethical Finance Advisor', 'Advise on morally responsible investment and business practices.', '$70K-$120K', 'High', 'shield'),
      career('NGO Program Manager', 'Manage international development and humanitarian programs.', '$75K-$130K', 'Moderate', 'globe'),
      career('Social Entrepreneur', 'Build ventures addressing social challenges in communities.', '$60K-$120K', 'High', 'rocket'),
      career('Policy and Governance Analyst', 'Analyze governance structures for institutional reform.', '$65K-$105K', 'Moderate', 'search'),
    ],
  },
  {
    code: 'LEG',
    degrees: [
      degree('BA. Journalism and Communication', 'Makerere University', 'Media, digital journalism, and strategic communication.'),
      degree('BA. Economics', 'Kyambogo University', 'Economic theory, policy analysis, and quantitative methods.'),
      degree('BA. Development Studies', 'Makerere University', 'Sustainable development, policy, and community engagement.'),
    ],
    careers: [
      career('Investigative Journalist', 'Uncover and report on economic and social issues.', '$55K-$95K', 'Moderate', 'search'),
      career('Economic Policy Writer', 'Write analysis and briefs on economic policy for media and NGOs.', '$65K-$110K', 'Moderate', 'write'),
      career('Market Research Analyst', 'Study consumer behavior and market trends for businesses.', '$70K-$115K', 'High', 'chart'),
      career('Environmental Policy Advocate', 'Champion environmental legislation and sustainability policies.', '$60K-$100K', 'High', 'leaf'),
      career('International Trade Analyst', 'Analyze cross-border trade patterns and opportunities.', '$75K-$125K', 'High', 'globe'),
    ],
  },
  {
    code: 'HEA',
    degrees: [
      degree('BA. Industrial and Fine Art', 'Makerere University', 'Applied arts, digital media, and design thinking.'),
      degree('BA. Museum and Heritage Studies', 'Kyambogo University', 'Cultural heritage preservation and museum management.'),
      degree('BA. History', 'Makerere University', 'African and world history with research methodology.'),
    ],
    careers: [
      career('Museum Digital Curator', 'Digitize and curate museum collections for online access.', '$55K-$95K', 'Moderate', 'museum'),
      career('Cultural Heritage Manager', 'Preserve and promote cultural heritage sites and artifacts.', '$60K-$100K', 'Moderate', 'globe'),
      career('Visual Brand Strategist', 'Develop visual identity systems for organizations.', '$70K-$120K', 'High', 'palette'),
      career('Historical Documentary Producer', 'Create documentary content on historical events and cultures.', '$60K-$105K', 'Moderate', 'film'),
      career('Art Market Analyst', 'Analyze art market trends and investment opportunities.', '$65K-$110K', 'Moderate', 'chart'),
    ],
  },
  {
    code: 'HED',
    degrees: [
      degree('BA. Philosophy and Ethics', 'Makerere University', 'Ethical theory, political philosophy, and critical thinking.'),
      degree('BA. Social Sciences', 'Kyambogo University', 'Sociology, political science, and public administration.'),
      degree('BA. Public Administration', 'Makerere University', 'Government management, policy, and institutional governance.'),
    ],
    careers: [
      career('Policy Ethics Advisor', 'Guide government and organizations on ethical policy-making.', '$70K-$120K', 'Moderate', 'building'),
      career('Faith-Based Organization Director', 'Lead faith-based NGOs and community organizations.', '$60K-$100K', 'Moderate', 'globe'),
      career('Diplomatic Affairs Analyst', 'Analyze international relations and diplomatic engagements.', '$75K-$125K', 'Moderate', 'handshake'),
      career('Human Rights Policy Researcher', 'Research and advocate for human rights protections.', '$60K-$100K', 'Moderate', 'shield'),
      career('Corporate Social Responsibility Manager', 'Lead corporate ethics and community engagement programs.', '$70K-$115K', 'High', 'recycle'),
    ],
  },
  {
    code: 'HEI',
    degrees: [
      degree('BA. International Relations', 'Makerere University', 'Global politics, diplomacy, and international organizations.'),
      degree('BA. Islamic Studies', 'Kyambogo University', 'Islamic theology, civilization, and contemporary issues.'),
      degree('BA. Development Studies', 'Makerere University', 'International development and humanitarian assistance.'),
    ],
    careers: [
      career('Islamic Finance Consultant', 'Advise on Sharia-compliant banking and investment products.', '$75K-$130K', 'High', 'calc'),
      career('International NGO Coordinator', 'Manage humanitarian and development programs globally.', '$70K-$120K', 'Moderate', 'globe'),
      career('Diplomatic Cultural Attaché', 'Facilitate cultural diplomacy between nations.', '$65K-$110K', 'Moderate', 'handshake'),
      career('Middle East Affairs Analyst', 'Analyze political and economic developments in the Middle East.', '$75K-$125K', 'Moderate', 'search'),
      career('Interfaith Dialogue Facilitator', 'Build bridges between diverse religious communities.', '$55K-$90K', 'Moderate', 'building'),
    ],
  },
  {
    code: 'HGD',
    degrees: [
      degree('BA. Community Development', 'Makerere University', 'Grassroots development, social work, and capacity building.'),
      degree('BA. Geography', 'Kyambogo University', 'Physical and human geography with field research methods.'),
      degree('BA. Theology and Social Transformation', 'Makerere University', 'Faith-based approaches to social change and ethics.'),
    ],
    careers: [
      career('Community Resilience Planner', 'Help communities prepare for environmental and economic shocks.', '$60K-$100K', 'High', 'building'),
      career('Faith-Based NGO Director', 'Lead faith-based development and humanitarian organizations.', '$65K-$110K', 'Moderate', 'globe'),
      career('Environmental Stewardship Manager', 'Lead conservation initiatives grounded in ethical values.', '$60K-$95K', 'High', 'leaf'),
      career('Humanitarian Logistics Coordinator', 'Coordinate aid delivery in crisis and conflict zones.', '$70K-$120K', 'High', 'truck'),
      career('Geosocial Research Analyst', 'Study the intersection of geography and social behavior.', '$55K-$90K', 'Moderate', 'map'),
    ],
  },
  {
    code: 'HGI',
    degrees: [
      degree('BA. International Relations', 'Makerere University', 'Diplomacy, global governance, and international cooperation.'),
      degree('BA. Geography', 'Kyambogo University', 'Human geography, GIS, and environmental planning.'),
      degree('BA. Islamic Studies and Arabic', 'Makerere University', 'Islamic civilization, Arabic language, and Middle East studies.'),
    ],
    careers: [
      career('Humanitarian Aid Coordinator', 'Manage relief operations in conflict and disaster zones.', '$70K-$120K', 'High', 'globe'),
      career('Islamic Development Specialist', 'Design development programs aligned with Islamic principles.', '$60K-$100K', 'Moderate', 'building'),
      career('Cross-Border Trade Analyst', 'Analyze trade flows and opportunities across regions.', '$65K-$110K', 'High', 'truck'),
      career('Migration and Refugee Specialist', 'Support refugee resettlement and migration policy.', '$60K-$100K', 'Moderate', 'handshake'),
      career('Regional Security Analyst', 'Assess security dynamics in specific geographic regions.', '$75K-$125K', 'Moderate', 'shield'),
    ],
  },
  {
    code: 'HLD',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'Literary criticism, creative writing, and cultural narratives.'),
      degree('BA. Theology', 'Kyambogo University', 'Biblical studies, pastoral ministry, and Christian ethics.'),
      degree('BA. History', 'Makerere University', 'Historiography, African history, and global civilizations.'),
    ],
    careers: [
      career('Faith-Based Content Creator', 'Produce digital content for religious and spiritual audiences.', '$50K-$85K', 'High', 'message'),
      career('Academic Researcher', 'Conduct interdisciplinary research in humanities and theology.', '$60K-$100K', 'Moderate', 'search'),
      career('Editorial Director', 'Lead editorial strategy for publishing houses and media.', '$75K-$125K', 'Moderate', 'write'),
      career('Interfaith Dialogue Coordinator', 'Facilitate understanding between diverse faith communities.', '$55K-$90K', 'Moderate', 'handshake'),
      career('Heritage Storyteller', 'Preserve and share cultural narratives through modern media.', '$50K-$85K', 'Moderate', 'mic'),
    ],
  },
  {
    code: 'HLI',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'Comparative literature, literary theory, and creative writing.'),
      degree('BA. Islamic Studies', 'Kyambogo University', 'Islamic theology, jurisprudence, and Arabic civilization.'),
      degree('BA. Arabic and Islamic Studies', 'Makerere University', 'Arabic language proficiency and Islamic scholarship.'),
    ],
    careers: [
      career('Islamic Literature Scholar', 'Research and publish on Islamic literary traditions.', '$55K-$90K', 'Moderate', 'search'),
      career('Arabic Language Translator', 'Translate documents and content between Arabic and English.', '$60K-$100K', 'High', 'globe'),
      career('Interfaith Content Strategist', 'Create content bridging Islamic and Western perspectives.', '$55K-$95K', 'High', 'layers'),
      career('Cultural Heritage Researcher', 'Document and analyze Islamic cultural heritage.', '$50K-$85K', 'Moderate', 'museum'),
      career('Religious Media Analyst', 'Analyze media representation of religion and faith.', '$60K-$100K', 'Moderate', 'megaphone'),
    ],
  },
  {
    code: 'HLA',
    degrees: [
      degree('BA. Literature and Creative Writing', 'Makerere University', 'Fiction, poetry, screenwriting, and literary criticism.'),
      degree('BA. Art History', 'Kyambogo University', 'Visual arts history, criticism, and curation.'),
      degree('BA. History', 'Makerere University', 'Cultural history, historiography, and research methods.'),
    ],
    careers: [
      career('Creative Writing Instructor', 'Teach creative writing and literary arts at institutions.', '$50K-$85K', 'Moderate', 'write'),
      career('Art Gallery Curator', 'Curate exhibitions and manage art collections.', '$55K-$95K', 'Moderate', 'palette'),
      career('Cultural Documentary Filmmaker', 'Produce documentaries on cultural and historical topics.', '$60K-$105K', 'Moderate', 'film'),
      career('Literary Festival Organizer', 'Plan and manage literary and cultural festivals.', '$50K-$85K', 'Moderate', 'megaphone'),
      career('Heritage Tourism Content Creator', 'Create engaging content for heritage sites and tourism.', '$50K-$85K', 'High', 'globe'),
    ],
  },
  {
    code: 'DGA',
    degrees: [
      degree('BA. Theology and Art', 'Makerere University', 'Sacred art, liturgical design, and visual theology.'),
      degree('BA. Geography', 'Kyambogo University', 'Human geography, cartography, and environmental studies.'),
      degree('BA. Fine Art', 'Makerere University', 'Painting, sculpture, and contemporary art practice.'),
    ],
    careers: [
      career('Sacred Art Designer', 'Create art for religious spaces and liturgical purposes.', '$45K-$80K', 'Moderate', 'palette'),
      career('Landscape Architect', 'Design outdoor spaces blending aesthetics and ecology.', '$65K-$110K', 'High', 'tree'),
      career('Environmental Art Curator', 'Curate art exhibitions focused on environmental themes.', '$50K-$85K', 'Moderate', 'leaf'),
      career('Faith-Based Tourism Guide', 'Develop and lead spiritual and pilgrimage tourism.', '$45K-$75K', 'Moderate', 'globe'),
      career('Community Art Facilitator', 'Lead art-based community development and healing programs.', '$45K-$80K', 'Moderate', 'light'),
    ],
  },
  {
    code: 'IGA',
    degrees: [
      degree('BA. Islamic Studies and Art', 'Makerere University', 'Islamic art, calligraphy, and visual culture.'),
      degree('BA. Geography', 'Kyambogo University', 'Human geography and environmental planning.'),
      degree('BA. Fine Art and Design', 'Makerere University', 'Visual arts, graphic design, and creative practice.'),
    ],
    careers: [
      career('Islamic Art and Calligraphy Designer', 'Create Islamic geometric patterns and calligraphic art.', '$45K-$80K', 'Moderate', 'palette'),
      career('Cultural Geography Researcher', 'Study the relationship between culture and landscape.', '$55K-$90K', 'Moderate', 'map'),
      career('Halal Tourism Experience Designer', 'Design tourism experiences for Muslim travelers.', '$50K-$90K', 'High', 'globe'),
      career('Interfaith Art Curator', 'Curate exhibitions celebrating diverse faith traditions.', '$50K-$85K', 'Moderate', 'museum'),
      career('Environmental Design Artist', 'Create art installations that raise environmental awareness.', '$50K-$85K', 'Moderate', 'leaf'),
    ],
  },
  {
    code: 'DLA',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'Literary analysis, creative writing, and world literature.'),
      degree('BA. Theology', 'Kyambogo University', 'Systematic theology, ethics, and pastoral studies.'),
      degree('BA. Visual Communication Design', 'Makerere University', 'Graphic design, typography, and visual storytelling.'),
    ],
    careers: [
      career('Faith-Based Graphic Designer', 'Design visual materials for religious organizations.', '$50K-$90K', 'Moderate', 'palette'),
      career('Theological Book Publisher', 'Publish and distribute theological and spiritual literature.', '$55K-$95K', 'Moderate', 'write'),
      career('Digital Ministry Content Creator', 'Produce multimedia content for online faith communities.', '$50K-$85K', 'High', 'message'),
      career('Inspirational Brand Designer', 'Create purpose-driven brand identities for organizations.', '$55K-$95K', 'Moderate', 'light'),
      career('Spiritual Wellness Art Therapist', 'Use art therapy for spiritual and emotional healing.', '$50K-$85K', 'Moderate', 'heart'),
    ],
  },
  {
    code: 'ILA',
    degrees: [
      degree('BA. Islamic Studies', 'Makerere University', 'Islamic theology, law, and contemporary Muslim thought.'),
      degree('BA. Literature', 'Kyambogo University', 'Literary criticism, poetry, and narrative studies.'),
      degree('BA. Art and Design', 'Makerere University', 'Visual arts, design thinking, and creative expression.'),
    ],
    careers: [
      career('Islamic Cultural Center Director', 'Manage cultural and educational programs for Muslim communities.', '$55K-$95K', 'Moderate', 'building'),
      career('Faith-Based Youth Program Designer', 'Create engaging programs for faith-based youth development.', '$45K-$80K', 'Moderate', 'light'),
      career('Islamic Art Educator', 'Teach Islamic art forms including calligraphy and geometry.', '$45K-$80K', 'Moderate', 'palette'),
      career('Multifaith Dialogue Artist', 'Create art that bridges understanding between faiths.', '$50K-$85K', 'Moderate', 'handshake'),
      career('Religious Publication Designer', 'Design publications for Islamic and interfaith audiences.', '$50K-$85K', 'Moderate', 'write'),
    ],
  },
  // ── Language Combinations ──
  {
    code: 'FEG',
    degrees: [
      degree('BA. French', 'Makerere University', 'French language, Francophone literature, and translation.'),
      degree('BA. Economics', 'Kyambogo University', 'Economic analysis, policy, and international trade.'),
      degree('BA. International Business', 'Makerere University', 'Cross-border commerce, trade policy, and global markets.'),
    ],
    careers: [
      career('International Trade Analyst', 'Analyze trade patterns between Francophone and Anglophone markets.', '$70K-$120K', 'High', 'globe'),
      career('Diplomatic Service Officer', 'Serve in embassies and international organizations.', '$65K-$115K', 'Moderate', 'handshake'),
      career('Francophone Market Strategist', 'Develop business strategies for Francophone African markets.', '$75K-$130K', 'High', 'chart'),
      career('Translation and Localization Manager', 'Manage multilingual content for international businesses.', '$65K-$110K', 'High', 'globe'),
      career('International Development Economist', 'Design economic development programs in Francophone regions.', '$70K-$120K', 'Moderate', 'building'),
    ],
  },
  {
    code: 'HLL',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'African and world literature with creative writing.'),
      degree('BA. Luganda', 'Kyambogo University', 'Luganda language, linguistics, and Buganda culture.'),
      degree('BA. History', 'Makerere University', 'African history, oral traditions, and archival studies.'),
    ],
    careers: [
      career('Local Language Linguist', 'Document and develop local language resources and dictionaries.', '$50K-$85K', 'Moderate', 'message'),
      career('Cultural Heritage Researcher', 'Research and preserve indigenous cultural knowledge.', '$55K-$90K', 'Moderate', 'museum'),
      career('Indigenous Literature Translator', 'Translate indigenous literature for wider audiences.', '$50K-$85K', 'Moderate', 'write'),
      career('Oral History Archivist', 'Record and digitize oral histories for preservation.', '$50K-$80K', 'Moderate', 'folder'),
      career('Local Content Creator', 'Produce media content in local languages for digital platforms.', '$45K-$80K', 'High', 'mic'),
    ],
  },
  {
    code: 'GLL',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'Literary studies and creative expression.'),
      degree('BA. Luganda and Local Languages', 'Kyambogo University', 'Linguistics, language teaching, and cultural studies.'),
      degree('BA. Geography', 'Makerere University', 'Human geography and environmental awareness.'),
    ],
    careers: [
      career('Environmental Journalist', 'Report on environmental issues in local and international media.', '$55K-$95K', 'Moderate', 'search'),
      career('Local Language Translator', 'Translate technical and literary content in local languages.', '$50K-$85K', 'High', 'globe'),
      career('Cultural Geography Educator', 'Teach the intersection of culture and environment.', '$50K-$80K', 'Moderate', 'map'),
      career('Eco-Cultural Content Creator', 'Create content blending environmental awareness with local culture.', '$45K-$80K', 'High', 'leaf'),
      career('Regional Literature Critic', 'Review and critique literature from specific cultural regions.', '$50K-$85K', 'Moderate', 'write'),
    ],
  },
  {
    code: 'DLL',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'World literature, poetry, and narrative studies.'),
      degree('BA. Luganda', 'Kyambogo University', 'Luganda linguistics, grammar, and oral traditions.'),
      degree('BA. Theology', 'Makerere University', 'Christian theology, biblical languages, and ethics.'),
    ],
    careers: [
      career('Faith-Based Local Language Translator', 'Translate religious texts into local languages.', '$50K-$85K', 'Moderate', 'globe'),
      career('Indigenous Theology Scholar', 'Research African indigenous theology and spiritual practices.', '$55K-$90K', 'Moderate', 'search'),
      career('Local Language Liturgical Writer', 'Write liturgical content in indigenous languages.', '$45K-$80K', 'Moderate', 'write'),
      career('Cultural Faith Educator', 'Teach faith within cultural context using local languages.', '$45K-$80K', 'Moderate', 'building'),
      career('Oral Tradition Preservationist', 'Document and preserve faith-based oral traditions.', '$50K-$80K', 'Moderate', 'folder'),
    ],
  },
  {
    code: 'ILL',
    degrees: [
      degree('BA. Literature', 'Makerere University', 'Literary theory, African literature, and writing.'),
      degree('BA. Luganda', 'Kyambogo University', 'Luganda language studies and cultural linguistics.'),
      degree('BA. Islamic Studies', 'Makerere University', 'Islamic theology, Arabic studies, and Muslim culture.'),
    ],
    careers: [
      career('Islamic Literature Translator', 'Translate Islamic texts and literature into local languages.', '$50K-$85K', 'Moderate', 'globe'),
      career('Local Language Islamic Educator', 'Teach Islamic studies in local languages.', '$45K-$80K', 'Moderate', 'building'),
      career('Multifaith Dialogue Facilitator', 'Promote understanding between Muslim and other faith communities.', '$50K-$85K', 'Moderate', 'handshake'),
      career('Cultural Heritage Interpreter', 'Interpret cultural heritage for museums and tourism.', '$50K-$85K', 'Moderate', 'museum'),
      career('Indigenous Language Media Producer', 'Produce radio and TV content in local languages.', '$45K-$80K', 'High', 'mic'),
    ],
  },
  {
    code: 'HFL',
    degrees: [
      degree('BA. French', 'Makerere University', 'French language, Francophone studies, and translation.'),
      degree('BA. Literature', 'Kyambogo University', 'Comparative literature and literary translation.'),
      degree('BA. History', 'Makerere University', 'World history with focus on Francophone Africa.'),
    ],
    careers: [
      career('Diplomatic Translator', 'Provide translation services for diplomatic missions.', '$60K-$105K', 'High', 'globe'),
      career('Francophone African Historian', 'Research history of Francophone African nations.', '$55K-$90K', 'Moderate', 'search'),
      career('International Media Correspondent', 'Report on international affairs for global media outlets.', '$65K-$115K', 'Moderate', 'megaphone'),
      career('Cross-Cultural Literature Translator', 'Translate literary works across French and English.', '$55K-$95K', 'Moderate', 'write'),
      career('Francophone Development Worker', 'Work with international NGOs in Francophone countries.', '$60K-$100K', 'Moderate', 'handshake'),
    ],
  },
  {
    code: 'GFL',
    degrees: [
      degree('BA. French', 'Makerere University', 'French language proficiency and Francophone culture.'),
      degree('BA. Literature', 'Kyambogo University', 'World literature and cross-cultural literary studies.'),
      degree('BA. Geography', 'Makerere University', 'Physical and human geography with regional studies.'),
    ],
    careers: [
      career('Francophone Regional Analyst', 'Analyze geographic and social trends in Francophone regions.', '$60K-$105K', 'Moderate', 'map'),
      career('International Tourism Developer', 'Develop tourism products for international markets.', '$55K-$95K', 'High', 'globe'),
      career('Environmental Journalist (Francophone)', 'Report on environmental issues for Francophone audiences.', '$55K-$90K', 'Moderate', 'leaf'),
      career('Cross-Border Cultural Researcher', 'Study cultural dynamics across national borders.', '$50K-$85K', 'Moderate', 'search'),
      career('International Aid Communication Officer', 'Manage communications for international aid organizations.', '$60K-$100K', 'High', 'message'),
    ],
  },
  {
    code: 'DFL',
    degrees: [
      degree('BA. French', 'Makerere University', 'French language, translation, and Francophone studies.'),
      degree('BA. Literature', 'Kyambogo University', 'Literary analysis and comparative literature.'),
      degree('BA. Theology', 'Makerere University', 'Christian theology with interfaith and ecumenical studies.'),
    ],
    careers: [
      career('Faith-Based Diplomatic Translator', 'Translate for faith-based organizations internationally.', '$55K-$95K', 'Moderate', 'globe'),
      career('Interfaith Dialogue Coordinator', 'Facilitate conversations between faith communities.', '$50K-$85K', 'Moderate', 'handshake'),
      career('Theological Literature Translator', 'Translate theological texts between French and English.', '$50K-$85K', 'Moderate', 'write'),
      career('International Faith Community Manager', 'Manage online faith communities across languages.', '$50K-$85K', 'High', 'message'),
      career('Ecumenical Program Officer', 'Coordinate programs between Christian denominations globally.', '$55K-$90K', 'Moderate', 'building'),
    ],
  },
  {
    code: 'IFL',
    degrees: [
      degree('BA. French and Arabic', 'Makerere University', 'French and Arabic languages for diplomacy and translation.'),
      degree('BA. Literature', 'Kyambogo University', 'Literary studies and cross-cultural narratives.'),
      degree('BA. Islamic Studies', 'Makerere University', 'Islamic scholarship with Francophone Muslim world studies.'),
    ],
    careers: [
      career('Multilingual Diplomatic Interpreter', 'Interpret for diplomatic missions in French and Arabic.', '$60K-$105K', 'High', 'globe'),
      career('Islamic Francophone Researcher', 'Research Muslim communities in Francophone Africa.', '$55K-$90K', 'Moderate', 'search'),
      career('Cross-Cultural Translation Specialist', 'Translate between French, Arabic, and English.', '$60K-$100K', 'High', 'message'),
      career('International Faith-Based NGO Officer', 'Work with NGOs serving Muslim and interfaith communities.', '$55K-$95K', 'Moderate', 'handshake'),
      career('Francophone Muslim Community Liaison', 'Bridge Francophone Muslim communities with local institutions.', '$50K-$85K', 'Moderate', 'building'),
    ],
  },
];

export function getMappingForSubjects(subjectIds: string[]): SubjectGroupMapping | undefined {
  return SUBJECT_GROUP_MAPPINGS.find(m =>
    m.subjects.every(s => subjectIds.includes(s))
  );
}

export function getBestMappingForSubjects(subjectIds: string[]): SubjectGroupMapping {
  const exact = getMappingForSubjects(subjectIds);
  if (exact) return exact;

  const scored = SUBJECT_GROUP_MAPPINGS.map(m => ({
    mapping: m,
    score: m.subjects.filter(s => subjectIds.includes(s)).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.mapping ?? SUBJECT_GROUP_MAPPINGS[0];
}

export function getMappingForCombination(code: string): CombinationMapping | undefined {
  return COMBINATION_MAPPINGS.find(m => m.code === code);
}

export function getAllComboCodes(): string[] {
  return ALEVEL_COMBINATIONS.map(c => c.code);
}

export function getCombinationByCode(code: string): ALevelCombination | undefined {
  return ALEVEL_COMBINATIONS.find(c => c.code === code);
}

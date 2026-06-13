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

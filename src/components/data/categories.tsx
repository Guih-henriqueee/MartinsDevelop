export type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  imagemodal: string;
  tags: string[];
  active: boolean;
};

export type Category = {
  name: string;
  projects: Project[];
};

export const categories: Category[] = [
  {
    name: "APIs RESTfuls",
    projects: [
      {
        id: 1,
        title: "API Agendamentos",
        description:
          "Construção de APIs em diferentes linguagens, com controle transacional, administração de recursos e integração entre sistemas.",
        link: "https://github.com/Guih-henriqueee/api-agendamentos",
        image: "/assets/ApiResful.png",
        imagemodal:"",
        tags: ["Python", "JavaScript", "TypeScript"],
        active: false,
      },
    ],
  },
  {
    name: "Dashboards",
    projects: [
      {
        id: 2,
        title: "Dashboard Shadcn",
        description:
          "Dashboard gerencial com indicadores de performance, utilizando Shadcn e TanStack Table para visualização eficiente de dados.",
        link: "https://github.com/Guih-henriqueee/",
        image: "/assets/DashboardShadcn.png",
        imagemodal:"",
        tags: ["React", "Shadcn", "TanStack"],
        active: false,
      },
    ],
  },
  {
    name: "Pipelines DevOps",
    projects: [
      {
        id: 3,
        title: "CI/CD Pipelines",
        description:
          "Criação de pipelines CI/CD para validação automática e deploy seguro, evitando bugs em check-ins de novas versões.",
        link: "https://github.com/Guih-henriqueee/",
        image: "/assets/Pipelines.png",
        imagemodal:"",
        tags: ["CI/CD", "GitHub Actions", "Shell"],
        active: false,
      },
    ],
  },
  {
    name: "Integrações Backend",
    projects: [
      {
        id: 4,
        title: "Integrador Backend",
        description:
          "Sistema em Python para integrar e gerenciar pedidos de múltiplos painéis via API, com armazenamento em PostgreSQL, validação automática de tabelas e rotinas de atualização contínua.",
        link: "https://github.com/Guih-henriqueee/Integrador",
        image: "/assets/Integrador.png",
        imagemodal:"",
        tags: ["Python", "PostgreSQL", "Multithreading"],
        active: false,
      },
    ],
  },
  {
    name: "Landing Pages",
    projects: [
      {
        id: 5,
        title: "Rozz Landing Page",
        description:
          "Desenvolvimento de landing pages responsivas e otimizadas, aplicando melhores práticas de UI/UX com foco em performance.",
        link: "https://rozz-project.vercel.app/",
        image: "/assets/LandingPages.png",
        imagemodal:"",
        tags: ["React", "TailwindCSS", "UX/UI"],
        active: true,
      },
      {
        id: 6,
        title: "Landing Page Alternativa",
        description:
          "Outra landing page desenvolvida para testes de UI/UX.",
        link: "https://github.com/Guih-henriqueee/",
        image: "/assets/LandingPages.png",
        imagemodal:"",
        tags: ["React", "Next.js"],
        active: true,
      },
    ],
  },
  {
    name: "Fullstack Projects",
    projects: [
      {
        id: 7,
        title: "Fullstack App",
        description:
          "Aplicações modernas com front e back integrados, utilizando Node.js, React e boas práticas de arquitetura.",
        link: "https://github.com/Guih-henriqueee/",
        image: "/assets/Fullstack.png",
        imagemodal:"",
        tags: ["Fullstack", "Node.js", "React"],
        active: false,
      },
    ],
  },
];

import React from "react";

const skills = [
  { name: "TypeScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Python", level: 75 },
  { name: "SQL (HANA, PostgreSQL, MySQL)", level: 85 },
  { name: "SAP Business One / HANA", level: 80 },
  { name: "APIs REST / Integrações", level: 95 },
  { name: "TailwindCSS + DaisyUI", level: 90 },
];

const Skills = () => {
  return (
    <section id="skills" className="space-y-8">
      <h2 className="text-3xl flex justify-start  font-bold text-primary text-center">
        Habilidades Técnicas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, idx) => (
          <div key={idx} className="bg-base-200 p-4 rounded-box shadow-md">
            <div className="flex justify-between mb-1">
              <span className="text-base-content font-medium">{skill.name}</span>
              <span className="text-sm text-base-content">{skill.level}%</span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={skill.level}
              max="100"
            ></progress>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

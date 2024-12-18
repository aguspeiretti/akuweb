import AnimatedStats from "./AnimatedStates";

const StatsBanner = () => {
  const stats = [
    { value: 100, label: "Clientes" },
    { value: 150, label: "Diseños realizados" },
    { value: 300, label: "Productos comercializados" },
    { value: 20, label: "Años de Experiencia" },
  ];

  return (
    <div className="bg-zinc-800 rounded-[40px] w-[90vw] py-4 shadow-xl shadow-indigo-500/10">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <AnimatedStats key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;

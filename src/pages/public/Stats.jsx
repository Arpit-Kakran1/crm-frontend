import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Properties Listed" },
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Cities Covered" },
  { value: 24, suffix: "/7", label: "Support Available" },
];

const AnimatedNumber = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const increment = Math.ceil(value / 60);

          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 25);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <h3
      ref={ref}
      className="text-4xl md:text-5xl font-semibold text-blue-600"
    >
      {count}
      {suffix}
    </h3>
  );
};

const Stats = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-8 text-center
                         border border-gray-100
                         shadow-sm
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-md"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-3 text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

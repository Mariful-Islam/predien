import React from 'react';

const FallingCodeAnimation = () => {
  // Define some code snippets
  const snippets = [
    'const app = express();',
    'import React from "react";',
    'git commit -m "feat: login"',
    'npm install lodash',
    'while (true) { }',
    'if (user.isAdmin) {',
    'console.log("Debug")',
    'function buildQuery(x) {',
    'deploy --env production',
    'const data = await fetch()',
  ];

  // Helper to generate random properties
  const randomRange = (min:any, max:any) => Math.random() * (max - min) + min;

  // Generate 20 falling lines
  const lines = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    text: snippets[Math.floor(Math.random() * snippets.length)],
    x: randomRange(5, 95), // horizontal position as %
    delay: randomRange(0, 5), // random start delay
    duration: randomRange(8, 15), // speed variability
    opacity: randomRange(0.2, 0.7), // different opacities
    fontSize: randomRange(12, 18), // subtle size variation
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="w-full h-full">
        <defs>
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        {lines.map((line) => (
          <text
            key={line.id}
            x={`${line.x}%`}
            y="-10%" // start above view
            fill="url(#codeGradient)"
            opacity={line.opacity}
            fontSize={`${line.fontSize}px`}
            fontFamily="monospace"
            className="animate-fall"
            style={{
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`,
            }}
          >
            {line.text}
          </text>
        ))}
      </svg>

      {/* Tailwind config needs this custom keyframe/animation:
          extend: {
            keyframes: {
              fall: {
                '0%': { transform: 'translateY(0%)' },
                '100%': { transform: 'translateY(120vh)' },
              }
            },
            animation: {
              fall: 'fall linear infinite',
            }
          }
      */}
      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(0%); }
          100% { transform: translateY(120vh); }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FallingCodeAnimation;
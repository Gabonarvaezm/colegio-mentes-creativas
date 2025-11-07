// src/components/GraficosMatematicas.tsx
import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function GraficosMatematicas() {
  const [chartType, setChartType] = useState<"barras" | "líneas" | "circular">("barras");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const data = [
    { name: "Lunes", ventas: 45 },
    { name: "Martes", ventas: 52 },
    { name: "Miércoles", ventas: 38 },
    { name: "Jueves", ventas: 65 },
    { name: "Viernes", ventas: 73 },
  ];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  const questions: Question[] = [
    {
      id: 1,
      question: "¿Qué día se registraron más ventas?",
      options: ["Lunes", "Martes", "Jueves", "Viernes"],
      correct: 3,
    },
    {
      id: 2,
      question: "¿Cuántas ventas se registraron el miércoles?",
      options: ["38", "45", "52", "65"],
      correct: 0,
    },
  ];

  const handleAnswerSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-8">
        <h2 className="text-3xl font-bold text-green-800 mb-4">¡Actividad Completada!</h2>
        <p className="text-lg text-gray-700 mb-4">Puntaje final: {score} de {questions.length}</p>
        <button
          onClick={handleReset}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">Interpretación de Gráficos</h1>
        <p className="text-gray-700 mb-6">Observa los gráficos y responde las preguntas</p>

        {/* Botones para cambiar el tipo de gráfico */}
        <div className="flex justify-center gap-4 mb-8">
          <button onClick={() => setChartType("barras")} className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500">Barras</button>
          <button onClick={() => setChartType("líneas")} className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500">Líneas</button>
          <button onClick={() => setChartType("circular")} className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-500">Circular</button>
        </div>

        {/* Contenedor del gráfico */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <ResponsiveContainer width="100%" height={300}>
            {chartType === "barras" && (
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ventas">
                  {data.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            )}
            {chartType === "líneas" && (
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
              </LineChart>
            )}
            {chartType === "circular" && (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="ventas"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Pregunta actual */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {questions[currentQuestion].question}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={answered}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                answered
                  ? index === questions[currentQuestion].correct
                    ? "bg-green-400 text-white"
                    : index === selectedAnswer
                    ? "bg-red-400 text-white"
                    : "bg-gray-200"
                  : "bg-blue-200 hover:bg-blue-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <p className="text-gray-600" data-testid="progreso">
          Pregunta {currentQuestion + 1} de {questions.length}
        </p>
        <p className="text-gray-600" data-testid="score">Puntaje actual: {score}</p>
      </div>
    </div>
  );
}

import { useState } from "react";

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
      <div>
        <h2>¡Actividad Completada!</h2>
        <p data-testid="puntaje">
          Puntaje final: {score} de {questions.length}
        </p>
        <button onClick={handleReset}>Reintentar</button>
      </div>
    );
  }

  return (
    <div>
      <h1>📊 Interpretación de Gráficos</h1>
      <p>Tipo de gráfico seleccionado: {chartType}</p>

      <div>
        <button onClick={() => setChartType("barras")}>Barras</button>
        <button onClick={() => setChartType("líneas")}>Líneas</button>
        <button onClick={() => setChartType("circular")}>Circular</button>
      </div>

      {/* Mostrar los datos para evitar warning */}
      <div>
        <h3>Datos de ventas:</h3>
        <ul>
          {data.map((item) => (
            <li key={item.name}>
              {item.name}: {item.ventas} ventas
            </li>
          ))}
        </ul>
      </div>

      <h2>{questions[currentQuestion].question}</h2>

      <div>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={answered}
            className={
              answered
                ? index === questions[currentQuestion].correct
                  ? "bg-green"
                  : index === selectedAnswer
                  ? "bg-red"
                  : ""
                : ""
            }
          >
            {option}
          </button>
        ))}
      </div>

      <p data-testid="progreso">
        Pregunta {currentQuestion + 1} de {questions.length}
      </p>
      <p data-testid="score">Puntaje actual: {score}</p>
    </div>
  );
}

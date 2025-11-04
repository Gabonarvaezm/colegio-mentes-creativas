import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const GraficosMatematicas = () => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const data = [
    { name: 'Lunes', ventas: 45 },
    { name: 'Martes', ventas: 52 },
    { name: 'Miércoles', ventas: 38 },
    { name: 'Jueves', ventas: 65 },
    { name: 'Viernes', ventas: 73 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const questions: Question[] = [
    {
      id: 1,
      question: '¿Qué día se registraron más ventas?',
      options: ['Lunes', 'Martes', 'Jueves', 'Viernes'],
      correct: 3,
    },
    {
      id: 2,
      question: '¿Cuántas ventas se registraron el miércoles?',
      options: ['38', '45', '52', '65'],
      correct: 0,
    },
    {
      id: 3,
      question: '¿Cuál es la diferencia entre las ventas del viernes y el lunes?',
      options: ['20', '25', '28', '30'],
      correct: 2,
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
    }, 1500);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setChartType('bar');
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ventas" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, ventas }) => `${name}: ${ventas}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="ventas"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-12 max-w-2xl text-center">
          <div className="text-6xl mb-6">
            {score === questions.length ? '🏆' : score >= questions.length / 2 ? '🎉' : '📚'}
          </div>
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            ¡Actividad Completada!
          </h2>
          <p className="text-2xl text-gray-700 mb-8">
            Tu puntaje: <span className="font-bold text-purple-600">{score}</span> de{' '}
            {questions.length}
          </p>
          <p className="text-lg text-gray-600 mb-8">
            {score === questions.length
              ? '¡Perfecto! Dominas la interpretación de gráficos.'
              : score >= questions.length / 2
              ? '¡Muy bien! Sigue practicando.'
              : '¡Sigue intentando! La práctica hace al maestro.'}
          </p>
          <button
            onClick={handleReset}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            🔄 Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-2">
          📊 Interpretación de Gráficos de Datos
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Observa los datos y responde las preguntas
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel izquierdo: Tabla de datos */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Datos de Ventas</h2>
            <table className="w-full">
              <thead>
                <tr className="bg-purple-100">
                  <th className="p-3 text-left font-bold text-purple-900">Día</th>
                  <th className="p-3 text-left font-bold text-purple-900">Ventas</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-purple-50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 font-semibold">{item.ventas}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3">Tipo de Gráfico:</h3>
              <div className="space-y-2">
                {[
                  { type: 'bar' as const, label: 'Barras', icon: '📊' },
                  { type: 'line' as const, label: 'Líneas', icon: '📈' },
                  { type: 'pie' as const, label: 'Circular', icon: '🥧' },
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setChartType(option.type)}
                    className={`w-full p-3 rounded-lg font-semibold transition-colors ${
                      chartType === option.type
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {option.icon} {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panel derecho: Gráfico y preguntas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gráfico */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Visualización</h2>
              {renderChart()}
            </div>

            {/* Preguntas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <span className="text-sm font-semibold text-purple-600">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answered}
                    className={`w-full p-4 rounded-lg font-semibold text-left transition-all ${
                      answered
                        ? index === questions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : index === selectedAnswer
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                        : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                    }`}
                  >
                    {option}
                    {answered && index === questions[currentQuestion].correct && ' ✅'}
                    {answered && index === selectedAnswer && index !== questions[currentQuestion].correct && ' ❌'}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Puntaje actual: <span className="font-bold text-purple-600">{score}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosMatematicas;
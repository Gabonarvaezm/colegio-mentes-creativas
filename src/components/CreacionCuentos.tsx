import { useState } from 'react';

interface Character {
  id: string;
  name: string;
  emoji: string;
}

interface Setting {
  id: string;
  name: string;
  emoji: string;
}

interface Action {
  id: string;
  text: string;
}

const CreacionCuentos = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedSetting, setSelectedSetting] = useState<Setting | null>(null);
  const [selectedActions, setSelectedActions] = useState<Action[]>([]);
  const [story, setStory] = useState<string>('');
  const [showStory, setShowStory] = useState(false);
  const [savedStories, setSavedStories] = useState<string[]>([]);

  const characters: Character[] = [
    { id: '1', name: 'un valiente caballero', emoji: '🤺' },
    { id: '2', name: 'una princesa curiosa', emoji: '👸' },
    { id: '3', name: 'un dragón amigable', emoji: '🐉' },
    { id: '4', name: 'un robot inteligente', emoji: '🤖' },
    { id: '5', name: 'una científica brillante', emoji: '👩‍🔬' },
  ];

  const settings: Setting[] = [
    { id: '1', name: 'un castillo mágico', emoji: '🏰' },
    { id: '2', name: 'un bosque encantado', emoji: '🌲' },
    { id: '3', name: 'una ciudad futurista', emoji: '🌆' },
    { id: '4', name: 'una isla misteriosa', emoji: '🏝️' },
  ];

  const actions: Action[] = [
    { id: '1', text: 'encontró un mapa del tesoro' },
    { id: '2', text: 'hizo un nuevo amigo inesperado' },
    { id: '3', text: 'descubrió un poder especial' },
    { id: '4', text: 'resolvió un enigma complicado' },
    { id: '5', text: 'salvó a alguien en peligro' },
    { id: '6', text: 'aprendió una lección importante' },
  ];

  const toggleAction = (action: Action) => {
    if (selectedActions.find((a) => a.id === action.id)) {
      setSelectedActions(selectedActions.filter((a) => a.id !== action.id));
    } else if (selectedActions.length < 3) {
      setSelectedActions([...selectedActions, action]);
    }
  };

  const generateStory = () => {
    if (!selectedCharacter || !selectedSetting || selectedActions.length === 0) {
      alert('Por favor selecciona un personaje, un lugar y al menos una acción');
      return;
    }

    const actionTexts = selectedActions.map((a) => a.text).join(', luego ');
    
    const generatedStory = `Había una vez ${selectedCharacter.name} que vivía en ${selectedSetting.name}. 

Un día, mientras exploraba su mundo, ${actionTexts}. 

Esta aventura cambió su vida para siempre, y ${selectedCharacter.name} aprendió que las mejores historias comienzan cuando nos atrevemos a explorar lo desconocido.

Fin.`;

    setStory(generatedStory);
    setShowStory(true);
  };

  const saveStory = () => {
    setSavedStories([...savedStories, story]);
    alert('¡Cuento guardado exitosamente!');
  };

  const resetStory = () => {
    setSelectedCharacter(null);
    setSelectedSetting(null);
    setSelectedActions([]);
    setStory('');
    setShowStory(false);
  };

  if (showStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-12">
            <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">
              📖 Tu Cuento Creado
            </h1>
            
            <div className="bg-amber-50 rounded-lg p-8 mb-8 border-2 border-amber-200">
              <div className="prose prose-lg max-w-none">
                {story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-800 leading-relaxed mb-4 text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={saveStory}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                💾 Guardar Cuento
              </button>
              <button
                onClick={resetStory}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                ✨ Crear Nuevo Cuento
              </button>
            </div>

            {savedStories.length > 0 && (
              <div className="mt-8 text-center text-gray-600">
                <p>Cuentos guardados: {savedStories.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-2">
          ✍️ Creación de Textos Narrativos
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Selecciona los elementos para crear tu propia historia
        </p>

        <div className="space-y-8">
          {/* Selección de Personaje */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1️⃣ Elige tu personaje principal
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {characters.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedCharacter(char)}
                  className={`p-6 rounded-lg transition-all transform hover:scale-105 ${
                    selectedCharacter?.id === char.id
                      ? 'bg-amber-500 text-white ring-4 ring-amber-300'
                      : 'bg-amber-100 text-gray-800 hover:bg-amber-200'
                  }`}
                >
                  <div className="text-5xl mb-2">{char.emoji}</div>
                  <div className="text-sm font-semibold text-center">{char.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selección de Escenario */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2️⃣ Selecciona el lugar de la historia
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {settings.map((setting) => (
                <button
                  key={setting.id}
                  onClick={() => setSelectedSetting(setting)}
                  className={`p-6 rounded-lg transition-all transform hover:scale-105 ${
                    selectedSetting?.id === setting.id
                      ? 'bg-orange-500 text-white ring-4 ring-orange-300'
                      : 'bg-orange-100 text-gray-800 hover:bg-orange-200'
                  }`}
                >
                  <div className="text-5xl mb-2">{setting.emoji}</div>
                  <div className="text-sm font-semibold text-center">{setting.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selección de Acciones */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              3️⃣ Elige las acciones de la historia (máximo 3)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Seleccionadas: {selectedActions.length}/3
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => toggleAction(action)}
                  disabled={
                    selectedActions.length >= 3 &&
                    !selectedActions.find((a) => a.id === action.id)
                  }
                  className={`p-4 rounded-lg text-left transition-all ${
                    selectedActions.find((a) => a.id === action.id)
                      ? 'bg-green-500 text-white ring-4 ring-green-300'
                      : selectedActions.length >= 3
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-yellow-100 text-gray-800 hover:bg-yellow-200'
                  }`}
                >
                  <div className="font-semibold">
                    {selectedActions.find((a) => a.id === action.id) && '✓ '}
                    {action.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Botón Generar */}
          <div className="text-center">
            <button
              onClick={generateStory}
              disabled={!selectedCharacter || !selectedSetting || selectedActions.length === 0}
              className={`text-2xl font-bold py-6 px-12 rounded-lg transition-all transform ${
                selectedCharacter && selectedSetting && selectedActions.length > 0
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105 shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🎨 Generar Mi Cuento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreacionCuentos;
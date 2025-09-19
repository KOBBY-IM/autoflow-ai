import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/suggest-flow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      
      if (!res.ok) {
        throw new Error('Failed to fetch')
      }
      
      const data = await res.json()
      setResponse(data)
    } catch (error) {
      console.error('Error:', error)
      setResponse({ error: 'Failed to generate workflow' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AutoFlow AI
          </h1>
          <p className="text-lg text-gray-600">
            Describe your workflow and let AI generate the steps for you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your workflow...
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., When I receive a Slack message, I want to save it to Google Sheets and then send a summary to my team via email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Workflow'}
          </button>
        </form>

        {response && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {response.error ? (
              <div className="text-red-600 text-center">
                <p className="font-medium">Error: {response.error}</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Workflow</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Steps:</h3>
                  <div className="space-y-2">
                    {response.steps?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {response.explanation && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Explanation:</h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-md">
                      {response.explanation}
                    </p>
                  </div>
                )}

                {response.analytics && (
                  <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-4">Workflow Analytics (AI Optimization)</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-700 font-medium">Success Rate:</span>
                        <span className="text-green-800 font-bold">{response.analytics.successRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-700 font-medium">Avg Execution Time:</span>
                        <span className="text-green-800 font-bold">{response.analytics.avgExecutionTime}</span>
                      </div>
                      <div className="mt-4">
                        <span className="text-green-700 font-medium block mb-2">Recommendation:</span>
                        <p className="text-green-800 bg-green-100 p-3 rounded-md">
                          {response.analytics.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

'use client'

import { useState, useEffect } from 'react'

interface Chore {
  id: string
  title: string
  description: string
  assignedTo: string
  dueDate: string
  completed: boolean
  completedBy?: string
  completedAt?: string
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: string
}

export default function ChoreDashboard() {
  const [chores, setChores] = useState<Chore[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')

  // Mock data for development
  const mockChores: Chore[] = [
    {
      id: '1',
      title: 'Take out trash',
      description: 'Empty all trash bins and take to curb',
      assignedTo: 'Alex',
      dueDate: '2024-01-15',
      completed: false,
      priority: 'medium',
      category: 'Cleaning',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Dishes',
      description: 'Wash and put away all dishes',
      assignedTo: 'Sarah',
      dueDate: '2024-01-14',
      completed: true,
      completedBy: 'Sarah',
      completedAt: new Date().toISOString(),
      priority: 'high',
      category: 'Kitchen',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Vacuum living room',
      description: 'Vacuum the entire living room area',
      assignedTo: 'Mike',
      dueDate: '2024-01-16',
      completed: false,
      priority: 'low',
      category: 'Cleaning',
      createdAt: new Date().toISOString()
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChores(mockChores)
      setLoading(false)
    }, 1000)
  }, [])

  const toggleChoreComplete = (choreId: string) => {
    setChores(chores.map(chore => {
      if (chore.id === choreId) {
        return {
          ...chore,
          completed: !chore.completed,
          completedBy: !chore.completed ? 'You' : undefined,
          completedAt: !chore.completed ? new Date().toISOString() : undefined
        }
      }
      return chore
    }))
  }

  const filteredChores = chores.filter(chore => {
    if (filter === 'pending') return !chore.completed
    if (filter === 'completed') return chore.completed
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cleaning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'kitchen':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading chores...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Chore Dashboard</h2>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Chores
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {filteredChores.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">
              {filter === 'all' ? 'No chores yet. Add your first chore!' : 
               filter === 'pending' ? 'No pending chores. Great job!' : 
               'No completed chores yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChores.map((chore) => (
              <div key={chore.id} className="bg-gray-700 rounded-xl shadow-lg p-6 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(chore.priority)}`}>
                      {chore.priority}
                    </span>
                    <span className="flex items-center space-x-1 text-gray-400">
                      {getCategoryIcon(chore.category)}
                      <span className="text-sm">{chore.category}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => toggleChoreComplete(chore.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      chore.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-green-500'
                    }`}
                  >
                    {chore.completed && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>

                <h3 className={`text-lg font-semibold mb-2 ${chore.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                  {chore.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm">
                  {chore.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assigned to:</span>
                    <span className="font-medium text-white">{chore.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Due:</span>
                    <span className="font-medium text-white">{new Date(chore.dueDate).toLocaleDateString()}</span>
                  </div>
                  {chore.completed && chore.completedBy && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Completed by:</span>
                      <span className="font-medium text-green-400">{chore.completedBy}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

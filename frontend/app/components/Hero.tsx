'use client'

interface HeroProps {
  onAddChore: () => void
}

export default function Hero({ onAddChore }: HeroProps) {
  return (
    <section className="gradient-bg text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Keep Your Home
            <span className="block text-yellow-300">Clean & Organized</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            RoomiesOp helps roommates stay accountable for household chores. 
            Track tasks, assign responsibilities, and keep your living space spotless together.
          </p>
          
          {/* Call to Action */}
          <div className="max-w-2xl mx-auto mb-12">
            <button
              onClick={onAddChore}
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Chore
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">0</div>
              <div className="text-blue-100">Chores Completed Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">0</div>
              <div className="text-blue-100">Active Chores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">0</div>
              <div className="text-blue-100">Roommates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

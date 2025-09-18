'use client'

import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ChoreDashboard from './components/ChoreDashboard'
import AddChoreForm from './components/AddChoreForm'
import Footer from './components/Footer'

export default function Home() {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onAddChore={() => setShowAddForm(true)} />
      {showAddForm && (
        <AddChoreForm 
          onClose={() => setShowAddForm(false)}
          onChoreAdded={() => setShowAddForm(false)}
        />
      )}
      <ChoreDashboard />
      <Footer />
    </main>
  )
}

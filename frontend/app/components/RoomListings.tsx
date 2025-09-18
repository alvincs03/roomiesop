'use client'

import { useState, useEffect } from 'react'

interface RoomListing {
  id: string
  title: string
  location: string
  price: number
  image: string
  description: string
  available: boolean
  roommate: {
    name: string
    age: number
    interests: string[]
  }
}

interface RoomListingsProps {
  searchQuery: string
}

export default function RoomListings({ searchQuery }: RoomListingsProps) {
  const [listings, setListings] = useState<RoomListing[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - in a real app, this would come from your backend
  const mockListings: RoomListing[] = [
    {
      id: '1',
      title: 'Cozy 2BR Apartment in Downtown',
      location: 'San Francisco, CA',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop',
      description: 'Beautiful 2-bedroom apartment with modern amenities. Looking for a clean, responsible roommate.',
      available: true,
      roommate: {
        name: 'Alex Johnson',
        age: 25,
        interests: ['Cooking', 'Hiking', 'Photography']
      }
    },
    {
      id: '2',
      title: 'Spacious Room in Shared House',
      location: 'Austin, TX',
      price: 800,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=300&fit=crop',
      description: 'Large bedroom in a friendly shared house. Great location near university and downtown.',
      available: true,
      roommate: {
        name: 'Sarah Chen',
        age: 23,
        interests: ['Yoga', 'Reading', 'Travel']
      }
    },
    {
      id: '3',
      title: 'Modern Studio Apartment',
      location: 'Seattle, WA',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
      description: 'Furnished studio apartment in a new building. Perfect for professionals.',
      available: false,
      roommate: {
        name: 'Mike Rodriguez',
        age: 28,
        interests: ['Gaming', 'Tech', 'Fitness']
      }
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setListings(mockListings)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading room listings...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="listings" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Rooms
          </h2>
          <p className="text-xl text-gray-600">
            Find your perfect living space and roommate
          </p>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No listings found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      listing.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {listing.available ? 'Available' : 'Rented'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {listing.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{listing.location}</p>
                  <p className="text-2xl font-bold text-primary-600 mb-4">
                    ${listing.price}/month
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-600 font-semibold">
                          {listing.roommate.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{listing.roommate.name}</p>
                        <p className="text-sm text-gray-600">Age {listing.roommate.age}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {listing.roommate.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${
                      listing.available
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!listing.available}
                  >
                    {listing.available ? 'Contact Roommate' : 'No Longer Available'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

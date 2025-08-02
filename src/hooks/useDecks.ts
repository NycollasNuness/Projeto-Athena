import { useState, useEffect } from 'react'

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface Deck {
  id: string
  name: string
  flashcards: Flashcard[]
  color: string
  colorForeground: string
  createdAt: Date
}

const STORAGE_KEY = 'athena-decks'

const defaultDecks: Deck[] = [
  {
    id: '1',
    name: 'English deck',
    flashcards: [],
    color: 'bg-study-cyan',
    colorForeground: 'text-study-cyan-foreground',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Revolução deck',
    flashcards: [],
    color: 'bg-study-peach',
    colorForeground: 'text-study-peach-foreground',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Células deck',
    flashcards: [],
    color: 'bg-study-green',
    colorForeground: 'text-study-green-foreground',
    createdAt: new Date('2024-01-03')
  }
]

const colors = [
  { color: 'bg-study-cyan', colorForeground: 'text-study-cyan-foreground' },
  { color: 'bg-study-peach', colorForeground: 'text-study-peach-foreground' },
  { color: 'bg-study-green', colorForeground: 'text-study-green-foreground' }
]

export const useDecks = () => {
  const [decks, setDecks] = useState<Deck[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsedDecks = JSON.parse(stored).map((deck: any) => ({
        ...deck,
        createdAt: new Date(deck.createdAt)
      }))
      setDecks(parsedDecks)
    } else {
      setDecks(defaultDecks)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDecks))
    }
  }, [])

  const addDeck = (name: string, flashcards: Flashcard[]) => {
    const colorIndex = decks.length % colors.length
    const selectedColor = colors[colorIndex]
    
    const newDeck: Deck = {
      id: Date.now().toString(),
      name,
      flashcards,
      color: selectedColor.color,
      colorForeground: selectedColor.colorForeground,
      createdAt: new Date()
    }

    const updatedDecks = [...decks, newDeck]
    setDecks(updatedDecks)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks))
    
    return newDeck
  }

  const removeDeck = (id: string) => {
    const updatedDecks = decks.filter(deck => deck.id !== id)
    setDecks(updatedDecks)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks))
  }

  const updateDeck = (id: string, name: string, flashcards: Flashcard[]) => {
    const updatedDecks = decks.map(deck => 
      deck.id === id ? { ...deck, name, flashcards } : deck
    )
    setDecks(updatedDecks)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecks))
  }

  const getDeckById = (id: string) => {
    return decks.find(deck => deck.id === id)
  }

  return {
    decks,
    addDeck,
    removeDeck,
    updateDeck,
    getDeckById
  }
}
import React, { useReducer, useState } from 'react'
import { Plus, Trash2, CheckCircle2, RotateCcw, ShoppingBag, ArrowRight } from 'lucide-react'

// Reducer function for managing a shopping cart state
const initialState = [
  { id: 1, name: 'React Design Patterns Guide', price: 29, quantity: 1, completed: false },
  { id: 2, name: 'TypeScript Masterclass', price: 49, quantity: 2, completed: true },
]

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        {
          id: Date.now(),
          name: action.payload.name || 'New React Resource',
          price: action.payload.price || 19,
          quantity: 1,
          completed: false,
        },
      ]
    case 'TOGGLE_ITEM':
      return state.map((item) =>
        item.id === action.payload ? { ...item, completed: !item.completed } : item
      )
    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload)
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function UseReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, initialState)
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('25')

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return
    dispatch({
      type: 'ADD_ITEM',
      payload: { name: newItemName, price: parseFloat(newItemPrice) || 20 },
    })
    setNewItemName('')
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">Interactive Cart Reducer</h3>
            <p className="text-xs text-slate-400">State managed via dispatch(action)</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">
            Items: <strong className="text-indigo-400">{totalCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Total: <strong>${totalAmount.toFixed(2)}</strong>
          </span>
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Add item form */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          placeholder="Resource title..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          className="w-24 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </form>

      {/* Cart list */}
      <div className="space-y-2">
        {cart.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
              item.completed
                ? 'bg-slate-900/30 border-slate-800/60 opacity-60'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch({ type: 'TOGGLE_ITEM', payload: item.id })}
                className={`p-1 rounded-md transition-colors ${
                  item.completed ? 'text-emerald-400' : 'text-slate-600 hover:text-slate-400'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>
              <div>
                <span
                  className={`text-sm font-medium ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-200'
                  }`}
                >
                  {item.name}
                </span>
                <div className="text-xs text-slate-400 font-mono">${item.price} each</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-800/80 rounded-lg p-1">
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: item.id, quantity: item.quantity - 1 },
                    })
                  }
                  className="w-6 h-6 flex items-center justify-center rounded text-slate-300 hover:bg-slate-700 text-xs font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-semibold text-indigo-300">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_QUANTITY',
                      payload: { id: item.id, quantity: item.quantity + 1 },
                    })
                  }
                  className="w-6 h-6 flex items-center justify-center rounded text-slate-300 hover:bg-slate-700 text-xs font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

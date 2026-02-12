import { CheckCircle, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface PopupProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export function Popup({ message, type, onClose }: PopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (type === 'success') {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [onClose, type])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className={`bg-white rounded-lg shadow-xl border-2 min-w-[400px] max-w-[500px] mx-4 transform transition-all duration-300 ${
        isVisible ? 'scale-100' : 'scale-95'
      } ${
        type === 'success' ? 'border-green-300' : 'border-red-300'
      }`}>
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {type === 'success' ? (
              <CheckCircle className="w-12 h-12 text-green-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          <p className="text-lg font-medium text-gray-800 mb-6">{message}</p>
          {type === 'error' && (
            <button
              onClick={handleClose}
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded border border-blue-700 shadow-sm transition-colors"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
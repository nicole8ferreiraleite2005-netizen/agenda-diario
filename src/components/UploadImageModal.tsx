"use client"

import { useState } from "react"

interface UploadImageModalProps {
  taskId: string
  taskTitle: string
  onClose: () => void
  onUpload: (imageUrl: string, notes: string) => Promise<void>
}

export function UploadImageModal({
  taskId,
  taskTitle,
  onClose,
  onUpload,
}: UploadImageModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!imageFile) return
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", imageFile)
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      if (!uploadRes.ok) throw new Error("Upload failed")
      const { url } = await uploadRes.json()
      await onUpload(url, notes)
      onClose()
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">📸 Upload</h2>
        <p className="text-gray-600 mb-4">{taskTitle}</p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center cursor-pointer"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded" />
          ) : (
            <p className="text-4xl">📷</p>
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
          rows={3}
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!imageFile || loading}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {loading ? "Sending..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )
}

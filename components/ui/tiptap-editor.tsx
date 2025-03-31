"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface TiptapEditorProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
  placeholder?: string
}

export default function TiptapEditor({
  value,
  onChange,
  className,
  placeholder = "Écrire une description...",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert min-h-[150px] focus:outline-none p-2",
          className
        ),
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "")
    }
  }, [value])

  return (
    <div className="border rounded-md border-input bg-background">
      <EditorContent editor={editor} />
    </div>
  )
}

'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

interface TipTapEditorProps {
  value: string
  onChange: (value: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  return (
    <div style={{ display: 'flex', gap: '8px', padding: '8px', borderBottom: '1px solid #ddd', background: '#f5f5f5', flexWrap: 'wrap' }}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{ padding: '6px', background: editor.isActive('bold') ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{ padding: '6px', background: editor.isActive('italic') ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <Italic size={16} />
      </button>
      
      <div style={{ width: '1px', background: '#ccc', margin: '0 4px' }} />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        style={{ padding: '6px 10px', background: editor.isActive('heading', { level: 2 }) ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        style={{ padding: '6px 10px', background: editor.isActive('heading', { level: 3 }) ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        H3
      </button>

      <div style={{ width: '1px', background: '#ccc', margin: '0 4px' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={{ padding: '6px', background: editor.isActive('bulletList') ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        style={{ padding: '6px', background: editor.isActive('orderedList') ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <ListOrdered size={16} />
      </button>

      <div style={{ width: '1px', background: '#ccc', margin: '0 4px' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        style={{ padding: '6px', background: editor.isActive({ textAlign: 'left' }) ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <AlignLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        style={{ padding: '6px', background: editor.isActive({ textAlign: 'center' }) ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <AlignCenter size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        style={{ padding: '6px', background: editor.isActive({ textAlign: 'right' }) ? '#e0e0e0' : 'transparent', border: '1px solid transparent', borderRadius: '4px', cursor: 'pointer' }}
      >
        <AlignRight size={16} />
      </button>
    </div>
  )
}

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Set default styles for the editor content area
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
      <MenuBar editor={editor} />
      <div style={{ padding: '16px', minHeight: '200px', backgroundColor: '#fff' }}>
        <EditorContent editor={editor} className="tiptap-content" />
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .tiptap-content .ProseMirror { outline: none; min-height: 200px; }
        .tiptap-content p { margin-bottom: 0.5em; }
        .tiptap-content ul, .tiptap-content ol { padding-left: 1.5em; margin-bottom: 0.5em; }
        .tiptap-content h2, .tiptap-content h3 { margin-top: 1em; margin-bottom: 0.5em; }
      `}} />
    </div>
  )
}
